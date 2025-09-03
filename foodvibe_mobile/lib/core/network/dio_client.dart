import 'dart:io';
import 'package:dio/browser.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio/dio.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:path_provider/path_provider.dart';

class DioClient {
  static DioClient? _instance;
  late final Dio dio;
  late final PersistCookieJar? cookieJar;

  DioClient._internal(this.dio, this.cookieJar);



  static DioClient? get instance => _instance;

  /// אתחול אסינכרוני – קוראים פעם אחת ב־main()
  static Future<DioClient> getInstance() async {
    if (_instance != null) return _instance!;

    PersistCookieJar? jar;

    if (!kIsWeb) {
      String cookiePath;
      if (Platform.isWindows || Platform.isLinux || Platform.isMacOS) {
        cookiePath = '${Directory.current.path}/.cookies_pc/';
      } else {
        final dir = await getApplicationDocumentsDirectory();
        cookiePath = '${dir.path}/.cookies_mobile/';
      }

      jar = PersistCookieJar(storage: FileStorage(cookiePath));
    }

    final dio = Dio(
      BaseOptions(
        baseUrl: dotenv.env['BASE_URL'] ?? 'http://localhost:8888/api',
        connectTimeout: const Duration(seconds: 500),
        receiveTimeout: const Duration(seconds: 500),
      ),
    );

    if (!kIsWeb && jar != null) {
      dio.interceptors.add(CookieManager(jar));
    }

      if (kIsWeb) {
      dio.httpClientAdapter = BrowserHttpClientAdapter(withCredentials: true);
    }

    dio.interceptors.add(
      LogInterceptor(
        requestBody: true,
        responseBody: true,
        requestHeader: true,
        responseHeader: true,
      ),
    );

    _instance = DioClient._internal(dio, jar);

    // Optional: בדיקה אם כבר יש קוקיז שמורים
    if (jar != null) {
      final cookies = await jar.loadForRequest(
        Uri.parse(dotenv.env['BASE_URL'] ?? ''),
      );
      if (cookies.isNotEmpty) {
        print("Found ${cookies.length} stored cookies");
      }
    }

    return _instance!;
  }

  /// מחיקת כל הקוקיז
  Future<void> clearCookies() async {
    if (!kIsWeb && cookieJar != null) {
      await cookieJar!.deleteAll();
    }
  }

  /// קריאה לקוקיז של URL מסוים
  Future<List<Cookie>> getCookies(String url) async {
    if (!kIsWeb && cookieJar != null) {
      return cookieJar!.loadForRequest(Uri.parse(url));
    }
    return []; 
  }
}
