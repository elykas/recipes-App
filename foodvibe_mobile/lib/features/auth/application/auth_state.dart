import 'package:foodvibe_mobile/features/user/data/user_model.dart';
import 'package:supabase_flutter/supabase_flutter.dart' hide User;

class AuthState {
  final Session? session;
  final AppUser? user;

  AuthState({this.session, this.user});

  AuthState copyWith({Session? session, AppUser? user}) {
    return AuthState(session: session ?? this.session, user: user ?? this.user);
  }

  bool get isSessionAvailable => session != null;
  bool get isAuthenticated => user != null;
}
