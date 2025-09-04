import 'dart:io';
import 'package:dio/dio.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:path_provider/path_provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class DioClient {
  static DioClient? _instance;
  late final Dio dio;
  late final PersistCookieJar? cookieJar;

  DioClient._internal(this.dio, this.cookieJar);

  static DioClient? get instance => _instance;

  static Future<DioClient> getInstance() async {
    if (_instance != null) return _instance!;

    // Create cookie jar
    final dir = await getApplicationDocumentsDirectory();
    final cookiePath = '${dir.path}/.cookies_mobile/';
    final jar = PersistCookieJar(storage: FileStorage(cookiePath));

    final dio = Dio(
      BaseOptions(
        baseUrl: dotenv.env['BASE_URL'] ?? 'http://localhost:8888/api',
        connectTimeout: const Duration(seconds: 500),
        receiveTimeout: const Duration(seconds: 500),
      ),
    );

    dio.interceptors.add(CookieManager(jar));
    dio.interceptors.add(
      LogInterceptor(
        requestBody: true,
        responseBody: true,
        requestHeader: true,
        responseHeader: true,
      ),
    );

    _instance = DioClient._internal(dio, jar);
    return _instance!;
  }

  Future<void> clearCookies() async {
    if (cookieJar != null) await cookieJar!.deleteAll();
  }

  Future<List<Cookie>> getCookies(String url) async {
    return cookieJar?.loadForRequest(Uri.parse(url)) ?? [];
  }
}
