import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:foodvibe_mobile/core/constants/app_constans.dart';
import 'package:foodvibe_mobile/features/auth/data/auth_model.dart';
import 'package:foodvibe_mobile/features/user/data/user_model.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:supabase_flutter/supabase_flutter.dart' hide User;

import '../../../services/supabase_service.dart';

class AuthRepository {
  final SupabaseClient _client;
  final Dio _dio;

  AuthRepository({SupabaseClient? client, required Dio dio})
      : _client = client ?? SupabaseManager.client,
        _dio = dio;

  Future<void> signInWithEmail({required String email}) async {
    final callBackUrl = dotenv.env['CALLBACK_URL'];

    if (callBackUrl == null) {
      throw Exception('CALLBACK_URL is not set');
    }

    await _client.auth.signInWithOtp(
      email: email,
      emailRedirectTo: callBackUrl,
    );
  }

  Future<void> signInWithGoogle() async {
     if (kIsWeb) {
    // Web: Supabase handles the redirect and token for you
    await _client.auth.signInWithOAuth(
      OAuthProvider.google
    );
  } else {
    await GoogleSignIn.instance.initialize(
      serverClientId: dotenv.env['GOOGLE_CLIENT_ID_WEB'],
    );
    final googleUser = await GoogleSignIn.instance.authenticate();

    final googleAuth = googleUser.authentication;
    final String? idToken = googleAuth.idToken;

    if (idToken == null) {
      throw Exception('Missing Google authentication tokens');
    }

    await _client.auth.signInWithIdToken(
      provider: OAuthProvider.google,
      idToken: idToken,
    );
  }
  }

  Future<VerifyTokenResponse> verifyToken(String token) async {
    final path = '/auth/verify-token';

    final response = await _dio.post(
      path,
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    final data = VerifyTokenResponse.fromJson(response.data);
    return data;
  }

  Future<bool> isUsernameAvailable(String username) async {
    final path = '/user/username-available/$username';
    final response = await _dio.get(path);
    return response.data['isAvailable'] ?? false;
  }

  Future<void> completeRegister(UserRegisterDetails userRegisterDetails) async {
    final path = '/auth/complete-register';

    await _dio.post(path, data: userRegisterDetails.toJson());
  }

  Future<void> signOut() async {
    await _client.auth.signOut();
  }

  Future<dynamic> getPolicy({
    required String language,
    required String version,
  }) async {
    final path = '/policy/query';
    final url = Uri.parse(path)
        .replace(queryParameters: {'version': version, 'language': language})
        .toString();

    final response = await _dio.get(url);
    return response.data;
  }

  Future<User?> getCurrentUser() async {
    final uri = dotenv.env['GRAPHQL_URI'] ?? '';
    final limit = 5;

    final query = '''
      query GetUser(\$limit: Int) {
      getUserProfileByPublicId(limit: \$limit) {
      publicId
      username
      fullName
      imageUrl
      email
      bio
      headLine
      locale
      isAdmin
      posts {
        publicId
        likes
        recipePublicId
        imageUrl
      }
    }
  }
''';

    final response = await _dio.post(
      uri,
      data: {
        'query': query,
        'variables': {'limit': limit},
      },
    );

    final data = response.data['data']['getUserProfileByPublicId'];

    if (data == null) return null;

    return User.fromJson(data);
  }

  Session? get currentSession => _client.auth.currentSession;

  SupabaseClient get client => _client;
}
