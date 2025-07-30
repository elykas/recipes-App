import 'package:supabase_flutter/supabase_flutter.dart';
import '../../../services/supabase_service.dart';

class AuthRepository {
  final SupabaseClient _client;

   AuthRepository({SupabaseClient? client})
      : _client = client ?? SupabaseManager.client;

  Future<String?> signInWithEmail({required String email})async{
     await _client.auth.signInWithOtp(email: email);
     final session = _client.auth.currentSession;
     return session?.accessToken;
  }

  Future<String?> signInWithGoogle() async {
    await _client.auth.signInWithOAuth(
      OAuthProvider.google
    );
    final session = _client.auth.currentSession;
    return session?.accessToken;
  }

  Future<void> signOut() async {
    await _client.auth.signOut();
  }

  User? get currentUser => _client.auth.currentUser;

  Session? get currentSession => _client.auth.currentSession;

  SupabaseClient get client => _client;
}
