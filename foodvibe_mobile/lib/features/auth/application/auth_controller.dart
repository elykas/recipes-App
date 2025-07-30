import 'dart:math';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../data/auth_repository.dart';

final authControllerProvider = Provider<AuthController>((ref) {
  final repo = ref.read(authRepositoryProvider);
  return AuthController(repo);
});

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository();
});

class AuthController {
  final AuthRepository _authRepository;

  AuthController(this._authRepository) {
    _authRepository.client.auth.onAuthStateChange.listen((AuthState state) {
      final event = state.event;
      final session = state.session;
      if (event == AuthChangeEvent.signedIn) {
        session?.accessToken;
      } else if (event == AuthChangeEvent.signedOut) {
        session?.accessToken;
      }
    });
  }

  Future<String?> signInWithEmail({required String email}) async {
    final accessToken = await _authRepository.signInWithEmail(email: email);
    return accessToken;
  }

  Future<String?> signInWithGoogle() async {
    final accessToken = await _authRepository.signInWithGoogle();
    return accessToken;
  }

  Future<void> signOut() async {
    await _authRepository.signOut();
  }
}
