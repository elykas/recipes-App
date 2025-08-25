import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/auth/application/auth_state.dart';
import 'package:go_router/go_router.dart';
import '../../../routes/app_router.dart';
import '../application/auth_controller.dart';

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
    final authState = ref.read(authControllerProvider);
    final token = authState.session?.accessToken;

    if (token == null) {
      context.go(AppRoutes.login, extra: 'loginFailed');
      return;
    }

    try {
      final response = await ref.read(authControllerProvider.notifier).verifyToken(token);

      if (response.exist) {
        context.go(AppRoutes.feed);
      } else {
        context.go(AppRoutes.completeRegister, extra: response);
      }
    } catch (e) {
      context.go(AppRoutes.login, extra: 'loginFailed');
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: CircularProgressIndicator()),
    );
  }
}
