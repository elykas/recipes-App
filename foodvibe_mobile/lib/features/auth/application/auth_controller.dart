import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../data/auth_repository.dart';

// PROVIDERS
final authControllerProvider =
    StateNotifierProvider<AuthController, Session?>((ref) {
  final repo = ref.read(authRepositoryProvider);
  return AuthController(repo);
});

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository();
});

// AUTH CONTROLLER
class AuthController extends StateNotifier<Session?> {
  final AuthRepository _authRepository;

  AuthController(this._authRepository) : super(null) {
    _authRepository.client.auth.onAuthStateChange.listen((AuthState onAuthStateChange) {
      final event = onAuthStateChange.event;
      final session = onAuthStateChange.session;

      if (event == AuthChangeEvent.signedIn) {
        state = session;
        final token = session?.accessToken;
      } else if (event == AuthChangeEvent.signedOut) {
        state = null;
        print("User signed out.");
      }
    });

    state = _authRepository.client.auth.currentSession;
  }

  Future<void> signInWithEmail({required String email}) async {
    await _authRepository.signInWithEmail(email: email);
  }

  Future<void> signInWithGoogle() async {
    await _authRepository.signInWithGoogle();
  }

  Future<void> signOut() async {
    await _authRepository.signOut();
  }

  Future<bool> verifyToken(String token) async {
    return await _authRepository.verifyToken(token);
  }
}
