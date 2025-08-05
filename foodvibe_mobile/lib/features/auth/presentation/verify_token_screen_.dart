import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
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
    final session = ref.read(authControllerProvider);
    final token = session?.accessToken;

    if (token == null) {
      context.go(AppRoutes.login);
      return;
    }

    try {
      final isRegistered = await ref.read(authControllerProvider.notifier).verifyToken(token);

      if (isRegistered) {
        context.go(AppRoutes.feed);
      } else {
        context.go(AppRoutes.completeRegister);
      }
    } catch (e) {
      context.go(AppRoutes.login);
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: CircularProgressIndicator()),
    );
  }
}
