import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:foodvibe_mobile/services/supabase_service.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../../../routes/app_router.dart';
import '../application/auth_controller.dart';
import 'package:flutter/foundation.dart';

class VerifyTokenPage extends ConsumerStatefulWidget {
  const VerifyTokenPage({super.key});

  @override
  ConsumerState<VerifyTokenPage> createState() => _VerifyTokenPageState();
}

class _VerifyTokenPageState extends ConsumerState<VerifyTokenPage> {
  @override
  void initState() {
    super.initState();
    _verifyUser();
  }

  Future<void> _verifyUser() async {
    Session? session;

    if (kIsWeb) {
      // Web: קח session מ-localStorage
      session = SupabaseManager.client.auth.currentSession;
    } else {
      // Mobile: קח session מה-auth state שלך
      final authState = ref.read(authControllerProvider);
      session = authState.session;
    }

    final token = session?.accessToken;

    if (token == null) {
      context.go(AppRoutes.login, extra: 'loginFailed');
      return;
    }

    try {
      final response = await ref
          .read(authControllerProvider.notifier)
          .verifyToken(token);

      if (response.exist) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Login successful!'),
              duration: Duration(seconds: 1),
            ),
          );

          await Future.delayed(const Duration(seconds: 1));
          context.go(AppRoutes.transiction);
        }
      } else {
        context.go(AppRoutes.completeRegister, extra: response);
      }
    } catch (e) {
      print('Error verifying token: $e');
      context.go(AppRoutes.login, extra: 'loginFailed');
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(body: Center(child: CircularProgressIndicator()));
  }
}
