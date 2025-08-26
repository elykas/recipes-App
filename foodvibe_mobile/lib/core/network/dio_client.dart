import 'package:dio/dio.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class DioClient {
  static final DioClient _instance = DioClient._internal();

  late final Dio dio;
  late final CookieJar cookieJar;

   factory DioClient() => _instance;

  DioClient._internal() {
    dio = Dio(
      BaseOptions(
        baseUrl: dotenv.env['BASE_URL'] ?? 'http://localhost:8888/api',
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
        headers: {
          'Content-Type': 'application/json',
        },
      ),
    );
    cookieJar = CookieJar();
    dio.interceptors.add(CookieManager(cookieJar));
    dio.interceptors.add(LogInterceptor(responseBody: true, requestBody: true));

      dio.interceptors.add(
      InterceptorsWrapper(
        onError: (e, handler) async {
          if (e.response?.statusCode == 401 && !e.requestOptions.path.contains('refresh')) {
            try {
              final refreshResponse = await dio.post('/auth/refresh-token');

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
  }
}