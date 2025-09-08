import 'package:foodvibe_mobile/features/user/data/user_model.dart';

class UserProfileState {
  final AppUser? user;
  final bool isLoading;
  final String? error;

  UserProfileState({this.user, this.isLoading = false, this.error});

  UserProfileState copyWith({AppUser? user, bool? isLoading, String? error}) {
    return UserProfileState(
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }
}
