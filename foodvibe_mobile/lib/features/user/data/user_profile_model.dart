import 'package:foodvibe_mobile/features/user/data/user_model.dart';

class UserProfileState {
  final AppUser? user;
  final bool isLoading;
  final bool isLoadingMore;
  final String? error;
  final String? nextCursor;

  UserProfileState({
    this.user,
    this.isLoading = false,
    this.isLoadingMore = false,
    this.error,
    this.nextCursor,
  });

  UserProfileState copyWith({
    AppUser? user,
    bool? isLoading,
    String? error,
    String? nextCursor,
    bool? isLoadingMore,
  }) {
    return UserProfileState(
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      isLoadingMore: isLoadingMore ?? this.isLoadingMore,
      error: error ?? this.error,
      nextCursor: nextCursor ?? this.nextCursor,
    );
  }
}
