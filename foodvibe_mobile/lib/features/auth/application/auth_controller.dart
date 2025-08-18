import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/auth/data/auth_model.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../data/auth_repository.dart';

// PROVIDERS
final authControllerProvider = StateNotifierProvider<AuthController, Session?>((
  ref,
) {
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
    _authRepository.client.auth.onAuthStateChange.listen((
      AuthState onAuthStateChange,
    ) {
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

  Future<void> recoverSessionFromLink(Uri uri) async {
    try {
      if (uri.fragment.isNotEmpty) {
        final response = await _authRepository.client.auth.getSessionFromUrl(
          uri,
        );
        state = response.session;
      }
    } catch (e) {
      print("Failed to recover session: $e");
    }
  }

  Future<bool> signInWithGoogle() async {
    await _authRepository.signInWithGoogle();
    final session = _authRepository.client.auth.currentSession;
    if (session != null) {
      state = session;
      return true;
    }
    return false;
  }

  Future<bool> checkUsernameAvailability(String username) async {
    return await _authRepository.isUsernameAvailable(username);
  }

  Future<void> signOut() async {
    await _authRepository.signOut();
  }

  Future<VerifyTokenResponse> verifyToken(String token) async {
    return await _authRepository.verifyToken(token);
  }

  Future<void> completeRegister(UserRegisterDetails userRegisterDetails) async {
    await _authRepository.completeRegister(userRegisterDetails);
  }
}
