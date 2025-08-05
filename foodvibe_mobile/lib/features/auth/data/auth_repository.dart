import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../../../services/supabase_service.dart';

class AuthRepository {
  final SupabaseClient _client;
  final Dio _dio;

  AuthRepository({
    SupabaseClient? client,
    Dio? dio,
  })  : _client = client ?? SupabaseManager.client,
        _dio = dio ?? Dio();

  Future<void> signInWithEmail({required String email}) async {
    final callBackUrl = dotenv.env['CALLBACK_URL'];

    if (callBackUrl == null) {
      throw Exception('CALLBACK_URL is not set');
    }

    await _client.auth.signInWithOtp(email: email, emailRedirectTo: callBackUrl);
  }

  Future<void> signInWithGoogle() async {
    final callBackUrl = dotenv.env['CALLBACK_URL'];

    if (callBackUrl == null) {
      throw Exception('CALLBACK_URL is not set');
    }

    await _client.auth.signInWithOAuth(
      OAuthProvider.google,
      redirectTo: callBackUrl,
    );
  }

  Future<bool> verifyToken(String token) async {
    final baseUrl = dotenv.env['BASE_URL'];
    final path = '$baseUrl/auth/verify-token';

    final response = await _dio.post(path, data: {
      "token": token
    });
      return response.data['exist'];
    }
  

  Future<void> signOut() async {
    await _client.auth.signOut();
  }

  User? get currentUser => _client.auth.currentUser;

  Session? get currentSession => _client.auth.currentSession;

  SupabaseClient get client => _client;
}
