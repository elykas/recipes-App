import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/auth/application/auth_controller.dart';
import 'package:foodvibe_mobile/features/user/data/user_model.dart';
import 'package:foodvibe_mobile/features/user/data/user_profile_model.dart';
import 'package:foodvibe_mobile/features/user/data/user_repository.dart';
import 'package:foodvibe_mobile/providers/dio_provider.dart';
import 'package:foodvibe_mobile/providers/locale_provider.dart';

final userProfileControllerProvider =
    StateNotifierProvider<UserProfileController, UserProfileState>((ref) {
      final repo = ref.watch(userRepositoryProvider);
      return UserProfileController(repo, ref);
    });

final userRepositoryProvider = Provider<UserRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return UserRepository(dio: dio);
});

class UserProfileController extends StateNotifier<UserProfileState> {
  final UserRepository _repository;
  final Ref _ref;

  UserProfileController(this._repository, this._ref)
    : super(UserProfileState());

  Future<void> loadUserProfile({String? Id, bool isRefresh = false}) async {
    if (Id == null) {
      return;
    }

    final cursor = isRefresh ? null : state.nextCursor;
    final limit = 9;

    if (isRefresh) {
      state = state.copyWith(isLoading: true, error: null);
    } else {
      state = state.copyWith(isLoadingMore: true, error: null);
    }

    try {
      final AppUserWithCursor? userWithCursor = await _repository
          .getUserProfile(Id, limit: limit, cursor: cursor);
      if (userWithCursor == null) {
        state = state.copyWith(isLoading: false, isLoadingMore: false);
        return;
      }

      final currentPosts = state.user?.posts ?? [];
      final newPosts = userWithCursor.user.posts ?? [];
      final mergedUser = userWithCursor.user.copyWith(
        posts: [...currentPosts, ...newPosts],
      );

      state = state.copyWith(
        user: mergedUser,
        isLoading: false,
        isLoadingMore: false,
        nextCursor: userWithCursor.nextCursor,
      );

      _ref
          .read(userProfileControllerProvider.notifier)
          .updateUserProfileState(
            mergedUser,
            nextCursor: userWithCursor.nextCursor,
          );

      final currentUserId = _ref.read(authControllerProvider).user?.Id;

      if (currentUserId != null && currentUserId == Id) {
        _ref.read(authControllerProvider.notifier).updateUserState(mergedUser);
      }
    } catch (e) {
      state = state.copyWith(
        error: e.toString(),
        isLoading: false,
        isLoadingMore: false,
      );
    }
  }

  void updateUserProfileState(AppUser? user, {String? nextCursor}) {
    state = state.copyWith(user: user, nextCursor: nextCursor);
  }

  Future<void> updateProfile(AppUser updatedUser) async {
    state = state.copyWith(isLoading: true);

    try {
      final updated = await _repository.updateUser(updatedUser);
      final current = state.user;
      if (current != null) {
        final merged = current.copyWith(
          fullName: updated.fullName,
          bio: updated.bio,
          headLine: updated.headLine,
        );

        state = state.copyWith(user: merged, isLoading: false);
      }
    } catch (e) {
      print(e);
      state = state.copyWith(error: e.toString(), isLoading: false);
    }
  }

  Future<void> updateImage(File image) async {
    state = state.copyWith(isLoading: true);
    try {
      final response = await _repository.updateUserImage(image);

      final current = state.user;
      if (current != null) {
        final merged = current.copyWith(imagePath: response.imageUrl);
        state = state.copyWith(user: merged, isLoading: false);
      }
    } catch (e) {
      state = state.copyWith(error: e.toString(), isLoading: false);
    }
  }

  Future<void> deleteImage() async {
    state = state.copyWith(isLoading: true);

    try {
      await _repository.deleteImage();
      final current = state.user;
      if (current != null) {
        final merged = current.copyWith(imagePath: null);
        state = state.copyWith(user: merged, isLoading: false);
      }
    } catch (e) {
      state = state.copyWith(error: e.toString(), isLoading: false);
    }
  }

  Future<void> updateUserLocale(String locale) async {
    state = state.copyWith(isLoading: true);
    try {
      final response = await _repository.updateUserLocale(locale);
      final current = state.user;
      if (current != null) {
        final merged = current.copyWith(locale: response.locale);
        state = state.copyWith(user: merged, isLoading: false);

        _ref.read(authControllerProvider.notifier).updateUserState(merged);

        _ref.read(localeProvider.notifier).setLocale(Locale(response.locale));
      }
    } catch (e) {
      state = state.copyWith(error: e.toString(), isLoading: false);
    }
  }
}
