import 'dart:io';
import 'package:dio/dio.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:path_provider/path_provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class DioClient {
  static DioClient? _instance;
  late final Dio dio;
  late final PersistCookieJar cookieJar;

  DioClient._internal(this.dio, this.cookieJar);

  /// אתחול אסינכרוני
  static Future<DioClient> getInstance() async {
    if (_instance != null) return _instance!;

    // קביעת מיקום הקוקיז לפי פלטפורמה
    String cookiePath;
    if (Platform.isWindows || Platform.isLinux || Platform.isMacOS) {
      // מחשב: שמירה בתיקייה קבועה בפרויקט או ליד ה־exe
      cookiePath = '${Directory.current.path}/.cookies_pc/';
    } else {
      // מובייל: תיקייה פרטית לאפליקציה
      final dir = await getApplicationDocumentsDirectory();
      cookiePath = '${dir.path}/.cookies_mobile/';
    }

    final cookieJar = PersistCookieJar(storage: FileStorage(cookiePath));

    // יצירת Dio עם אפשרויות ברירת מחדל
    final dio = Dio(
      BaseOptions(
        baseUrl: dotenv.env['BASE_URL'] ?? 'http://localhost:8888/api',
        connectTimeout: const Duration(seconds: 500),
        receiveTimeout: const Duration(seconds: 500),
      ),
    );

    // הוספת אינטרספטורים
    dio.interceptors.add(CookieManager(cookieJar));
    dio.interceptors.add(
      LogInterceptor(
        requestBody: true,
        responseBody: true,
        requestHeader: true,
        responseHeader: true,
      ),
    );

    dio.interceptors.add(
      InterceptorsWrapper(
        onError: (e, handler) async {
          // טיפול ב־401
          if (e.response?.statusCode == 401 &&
              !e.requestOptions.path.contains('refresh')) {
            try {
              // מנסה לרענן טוקן
              await dio.post('/auth/refresh-token');
              final opts = e.requestOptions;
              final cloneReq = await dio.fetch(opts);
              return handler.resolve(cloneReq);
            } catch (refreshError) {
              return handler.reject(e);
            }
          }
          return handler.next(e);
        },
      ),
    );

    _instance = DioClient._internal(dio, cookieJar);
    return _instance!;
  }

  /// פונקציה לניקוי כל הקוקיז
  Future<void> clearCookies() async {
    await cookieJar.deleteAll();
  }

  /// אפשרות לקבל את הקוקיז הנוכחיים
  Future<List<Cookie>> getCookies(String url) =>
    cookieJar.loadForRequest(Uri.parse(url));
}
