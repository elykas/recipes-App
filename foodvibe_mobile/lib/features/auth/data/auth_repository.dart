import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:foodvibe_mobile/features/auth/data/auth_model.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../../../services/supabase_service.dart';

class AuthRepository {
  final SupabaseClient _client;
  final Dio _dio;

  AuthRepository({SupabaseClient? client, Dio? dio})
    : _client = client ?? SupabaseManager.client,
      _dio = dio ?? Dio();

  Future<void> signInWithEmail({required String email}) async {
    final callBackUrl = dotenv.env['CALLBACK_URL'];

    print(callBackUrl);

    if (callBackUrl == null) {
      throw Exception('CALLBACK_URL is not set');
    }

    await _client.auth.signInWithOtp(
      email: email,
      emailRedirectTo: callBackUrl,
    );
  }

  Future<void> signInWithGoogle() async {
    // Start Google sign-in flow
    await GoogleSignIn.instance.initialize(
      serverClientId: '${dotenv.env['GOOGLE_CLIENT_ID_WEB']}',
    );
    final googleUser = await GoogleSignIn.instance.authenticate();

    if (googleUser == null) {
      throw Exception('Google Sign-In aborted by user');
    }

    // Get authentication tokens
    final googleAuth = googleUser.authentication;
    final String? idToken = googleAuth.idToken;

    if (idToken == null) {
      throw Exception('Missing Google authentication tokens');
    }

    // Authenticate with Supabase (or your backend)
    await _client.auth.signInWithIdToken(
      provider: OAuthProvider.google,
      idToken: idToken,
    );
  } 

  Future<VerifyTokenResponse> verifyToken(String token) async {
    final baseUrl = dotenv.env['BASE_URL'];
    final path = '$baseUrl/auth/verify-token';

    final response = await _dio.post(
      path,
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    return VerifyTokenResponse.fromJson(response.data);
  }

  Future<void> signOut() async {
    await _client.auth.signOut();
  }

  User? get currentUser => _client.auth.currentUser;

  Session? get currentSession => _client.auth.currentSession;

  SupabaseClient get client => _client;
}
