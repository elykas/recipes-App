import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/auth/data/auth_model.dart';
import 'package:foodvibe_mobile/features/user/application/user_controller.dart';
import 'package:foodvibe_mobile/providers/dio_provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../data/auth_repository.dart';
import './auth_state.dart' as local;

// PROVIDERS
final authRepositoryProvider = Provider<AuthRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return AuthRepository(dio: dio);
});

final authControllerProvider =
    StateNotifierProvider<AuthController, local.AuthState>((ref) {
      final repo = ref.watch(authRepositoryProvider);
      return AuthController(repo, ref);
    });

// AUTH CONTROLLER
class AuthController extends StateNotifier<local.AuthState> {
  final AuthRepository _authRepository;
  final Ref _ref;

  AuthController(this._authRepository, this._ref) : super(local.AuthState()) {
    _authRepository.client.auth.onAuthStateChange.listen((
      AuthState onAuthStateChange,
    ) {
      final event = onAuthStateChange.event;
      final session = onAuthStateChange.session;

      if (event == AuthChangeEvent.signedIn) {
        state = local.AuthState(session: session);
        final token = session?.accessToken;
      } else if (event == AuthChangeEvent.signedOut) {
        state = local.AuthState(session: null);
        print("User signed out.");
      }
    });
  }

  Future<void> signInWithEmail({required String email}) async {
    await _authRepository.signInWithEmail(email: email);
  }

  Future<void> recoverSessionFromLink(Uri uri) async {
    try {
      if (uri.fragment.isNotEmpty) {
        final response = _authRepository.client.auth.getSessionFromUrl(uri);
      }
    } catch (e) {
      print("Failed to recover session: $e");
    }
  }

  Future<bool> signInWithGoogle() async {
    await _authRepository.signInWithGoogle();
    final session = _authRepository.client.auth.currentSession;
    if (session != null) {
      state = local.AuthState(session: session);
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

  Future<dynamic> getPolicy({
    required String language,
    required String version,
  }) async {
    return await _authRepository.getPolicy(
      language: language,
      version: version,
    );
  }

  Future<void> loadUser() async {
    final user = await _authRepository.getCurrentUser();
    state = local.AuthState(user: user);
    _ref
        .read(userProfileControllerProvider.notifier)
        .updateUserProfileState(user);
  }
}
