// lib/services/deeplink_service.dart
import 'package:app_links/app_links.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/auth/application/auth_controller.dart';
import 'package:go_router/go_router.dart';
import '../routes/app_router.dart';

final deepLinkServiceProvider = Provider<DeepLinkService>((ref) {
  return DeepLinkService(ref);
});

class DeepLinkService {
  final Ref ref;
  final AppLinks _appLinks = AppLinks();

  DeepLinkService(this.ref);

  void init() {
    // For app already opened
    _appLinks.getInitialLink().then((uri) {
      if (uri != null) _handleLink(uri);
    });

    // For app in background/foreground
    _appLinks.uriLinkStream.listen((uri) {
      if (uri != null) _handleLink(uri);
    });
  }

  Future<void> _handleLink(Uri uri) async {
  final errorCode = uri.queryParameters['error_code'];
  final errorMessage = uri.queryParameters['error_description'];

  // Use the context from GoRouter's navigator key
  final context = appRouter.routerDelegate.navigatorKey.currentContext;
  if (context == null) return;

  if (errorCode != null) {
    if (errorCode == 'invalid_token') {
      context.go(AppRoutes.emailSent, extra: 'expiredLink');
    } else {
      context.go(AppRoutes.emailSent, extra: 'loginFailed');
    }
    return;
  }

  // This will make Supabase complete the magic link flow
  await ref.read(authControllerProvider.notifier).recoverSessionFromLink(uri);

  // The listener in EmailSentPage or AuthController will handle navigation next
}

}
