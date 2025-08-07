import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:go_router/go_router.dart';

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

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (errorCode != null) {
        if (errorCode == 'invalid_token') {
          // טוקן פג תוקף
          context.go(AppRoutes.emailSent, extra: 'expiredLink');
        } else {
          // שגיאה כללית
          context.go(AppRoutes.emailSent, extra: 'loginFailed');
        }
      } else {
        // אין שגיאה – פשוט נשארים פה עד ש־ref.listen יזהה סשן ב־EmailSentPage
        // (שום הפניה כאן)
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: CircularProgressIndicator()),
    );
  }
}
