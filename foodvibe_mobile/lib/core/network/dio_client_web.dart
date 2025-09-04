import 'package:dio/dio.dart';
import 'package:dio/browser.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class DioClient {
  static DioClient? _instance;
  late final Dio dio;

  DioClient._internal(this.dio);

  static DioClient? get instance => _instance;

  static Future<DioClient> getInstance() async {
    if (_instance != null) return _instance!;

    final dio = Dio(
      BaseOptions(
        baseUrl: dotenv.env['BASE_URL'] ?? 'http://localhost:8888/api',
        connectTimeout: const Duration(seconds: 500),
        receiveTimeout: const Duration(seconds: 500),
      ),
    );

    dio.httpClientAdapter = BrowserHttpClientAdapter(withCredentials: true);

    dio.interceptors.add(
      LogInterceptor(
        requestBody: true,
        responseBody: true,
        requestHeader: true,
        responseHeader: true,
      ),
    );

    _instance = DioClient._internal(dio);
    return _instance!;
  }

  /// Web does not support file-based cookies
  Future<void> clearCookies() async {}
  Future<List<dynamic>> getCookies(String url) async => [];
}
