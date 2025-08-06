import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/auth/application/auth_controller.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class LoginCallbackPage extends ConsumerStatefulWidget {
  const LoginCallbackPage({super.key});

  @override
  ConsumerState<LoginCallbackPage> createState() => _LoginCallbackPageState();
}

class _LoginCallbackPageState extends ConsumerState<LoginCallbackPage> {
  @override
  void initState() {
    super.initState();

    final uri = Uri.base;
    final errorCode = uri.queryParameters['error_code'];
    final errorMessage = uri.queryParameters['error_description'];

    if (errorCode != null) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        context.go(AppRoutes.login, extra: 'loginFailed');
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    ref.listen<Session?>(
      authControllerProvider,
      (previous, next) {
        if (next != null) {
          context.go(AppRoutes.verifyToken);
        }
      },
    );
    return const Scaffold(
      body: Center(child: CircularProgressIndicator()),
    );
  }
}
