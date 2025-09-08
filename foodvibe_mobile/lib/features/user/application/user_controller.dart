import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/user/data/user_model.dart';
import 'package:foodvibe_mobile/features/user/data/user_profile_model.dart';
import 'package:foodvibe_mobile/features/user/data/user_repository.dart';
import 'package:foodvibe_mobile/providers/dio_provider.dart';

final userProfileControllerProvider =
    StateNotifierProvider<UserProfileController, UserProfileState>((ref) {
  final repo = ref.watch(userRepositoryProvider); 
  return UserProfileController(repo);
});

final userRepositoryProvider = Provider<UserRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return UserRepository(dio: dio);
});

class UserProfileController extends StateNotifier<UserProfileState> {
  final UserRepository _repository;

  UserProfileController(this._repository) : super(UserProfileState());

  Future<void> loadUserProfile(String? publicId) async {
    state = state.copyWith(isLoading: true, error: null);

    if (publicId == null) {
      state = state.copyWith(user: null, isLoading: false);
      return;
    }

    try {
      final AppUser? user  = await _repository.getUserProfile(publicId);
      state = state.copyWith(user: user, isLoading: false);
    } catch (e) {
      state = state.copyWith(error: e.toString(), isLoading: false);
    }
  }

  void updateUserProfileState(AppUser? user) {
    state = state.copyWith(user: user);
  }

  Future<void> updateProfile(AppUser updatedUser) async {
    await _repository.updateUser(updatedUser);
    state = state.copyWith(user: updatedUser);
  }
}