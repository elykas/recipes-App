import 'package:foodvibe_mobile/features/auth/data/auth_model.dart';
import 'package:foodvibe_mobile/features/auth/presentation/complete_register_screen.dart';
import 'package:foodvibe_mobile/features/auth/presentation/verify_token_screen.dart';
import 'package:foodvibe_mobile/features/auth/presentation/onboarding_screen.dart';
import 'package:go_router/go_router.dart';
import '../features/auth/presentation/email_sent_screen.dart';
import '../features/auth/presentation/login_page.dart';
import 'package:foodvibe_mobile/core/screens/splash_screen.dart';
import 'package:flutter/material.dart';
// שים לב להוספה של שאר הדפים גם...

class AppRoutes {
  static const String splash = '/splash';
  static const String onboarding = '/onboarding';
  static const String login = '/login';
  static const String emailSent = '/email-sent';
  static const String completeRegister = '/complete-register';
  static const String verifyToken = '/verify-token';
  static const String feed = '/feed';
  static const String loginCallback = '/login-callback';

}

final appRouter = GoRouter(
  initialLocation: AppRoutes.splash,
  routes: [
    GoRoute(path: AppRoutes.splash, 
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(path: AppRoutes.onboarding, 
    builder: (context, state) => const OnboardingScreen(),
    ),
    GoRoute(
      path: AppRoutes.login,
      pageBuilder: (context, state) {
        final errorMessage = state.extra as String?;
        return CustomTransitionPage(
          key: state.pageKey,
          child: LoginPage(errorMessage: errorMessage),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            final offsetAnimation = Tween<Offset>(
              begin: const Offset(0, 1),
              end: Offset.zero,
            ).animate(
              CurvedAnimation(
                parent: animation,
                curve: Curves.easeOutCubic,
              ),
            );
            return SlideTransition(
              position: offsetAnimation,
              child: child,
            );
          },
        );
      },
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
