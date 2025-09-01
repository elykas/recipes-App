import 'package:dio/dio.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:path_provider/path_provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:io';

class DioClient {
  static DioClient? _instance;
  late final Dio dio;
  late final PersistCookieJar cookieJar;

  DioClient._internal(this.dio, this.cookieJar);

  /// אתחול אסינכרוני (כי צריך לחכות ל־path_provider)
  static Future<DioClient> getInstance() async {
    if (_instance != null) return _instance!;

    // תיקייה לשמירת הקוקיז
    final dir = await getApplicationDocumentsDirectory();
    final cookieJar = PersistCookieJar(
      storage: FileStorage('${dir.path}/.cookies/'),
    );

    final dio = Dio(
      BaseOptions(
        baseUrl: dotenv.env['BASE_URL'] ?? 'http://localhost:8888/api',
        connectTimeout: const Duration(seconds: 500),
        receiveTimeout: const Duration(seconds: 500),
      ),
    );

    // הוספת אינטרספטורים
    dio.interceptors.add(CookieManager(cookieJar));
    dio.interceptors.add(LogInterceptor(responseBody: true, requestBody: true));
    dio.interceptors.add(
      InterceptorsWrapper(
        onError: (e, handler) async {
          if (e.response?.statusCode == 401 &&
              !e.requestOptions.path.contains('refresh')) {
            try {
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
}
