import 'package:foodvibe_mobile/features/auth/data/auth_model.dart';
import 'package:foodvibe_mobile/features/auth/presentation/complete_register_screen.dart';
import 'package:foodvibe_mobile/features/auth/presentation/login_callback_screen.dart';
import 'package:foodvibe_mobile/features/auth/presentation/verify_token_screen_.dart';
import 'package:go_router/go_router.dart';
import '../features/auth/presentation/email_sent_screen.dart';
import '../features/auth/presentation/login_page.dart';
// שים לב להוספה של שאר הדפים גם...

class AppRoutes {
  static const String login = '/login';
  static const String emailSent = '/email-sent';
  static const String completeRegister = '/complete-register';
  static const String verifyToken = '/verify-token';
  static const String feed = '/feed';
  static const String loginCallback = '/login-callback';
}

final appRouter = GoRouter(
  initialLocation: AppRoutes.login,
  routes: [
    GoRoute(
      path: AppRoutes.login,
      builder: (context, state) => const LoginPage(),
    ),
    GoRoute(
      path: AppRoutes.emailSent,
      builder: (context, state) => const EmailSentPage(),
    ),
    GoRoute(
      path: AppRoutes.verifyToken,
      builder: (context, state) => const VerifyTokenPage(),
    ),
    GoRoute(
      path: AppRoutes.completeRegister,
      builder: (context, state) {
        final data = state.extra as VerifyTokenResponse;
        return RegisterScreen(response: data);
      },
    ),

  ],
);
