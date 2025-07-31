import 'package:go_router/go_router.dart';
import '../features/auth/presentation/login_page.dart';
// שים לב להוספה של שאר הדפים גם...

class AppRoutes {
  static const String login = '/login';
  static const String emailSent = '/email-sent';
  static const String completeRegister = '/complete-register';
  static const String verifyToken = '/verify-token';
  static const String feed = '/feed';
}

final appRouter = GoRouter(
  initialLocation: AppRoutes.login,
  routes: [
    GoRoute(
      path: AppRoutes.login,
      builder: (context, state) => const LoginPage(),
    ),
    // דף הבית או feed או מה שתבחר
  ],
);
