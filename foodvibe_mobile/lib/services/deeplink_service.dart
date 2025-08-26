// lib/services/deeplink_service.dart
import 'package:app_links/app_links.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/auth/application/auth_controller.dart';
import 'package:go_router/go_router.dart';
import '../routes/app_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
final deepLinkServiceProvider = Provider<DeepLinkService>((ref) {
  return DeepLinkService(ref);
});

class DeepLinkService {
  final Ref ref;
  final AppLinks _appLinks = AppLinks();

  DeepLinkService(this.ref);

  void init() {
    _appLinks.getInitialLink().then(_handleLink);
    _appLinks.uriLinkStream.listen(_handleLink);
  }

  Future<void> _handleLink(Uri? uri) async {
   if (uri == null) return;

  final code = uri.queryParameters['code'];
  final context = appRouter.routerDelegate.navigatorKey.currentContext;
  final errorCode = uri.queryParameters['error_code'];
  if (context == null) return;

   if (errorCode != null) {
      if (errorCode == 'invalid_token') {
        context.go(AppRoutes.emailSent, extra: 'expiredLink');
      } else {
        context.go(AppRoutes.emailSent, extra: 'loginFailed');
      }
      return;
    }

  if (code != null) {
    try {
      final authResponse = await Supabase.instance.client.auth.verifyOTP(
        token: code,
        type: OtpType.magiclink,
      );

      // if (authResponse.session != null) {
      //   ref.read(authControllerProvider.notifier).state = authResponse.session;
      //   // מכאן, הסשן זמין וניתן לגשת לטוקן שלו
      //   // final token = authResponse.session!.accessToken;
      // }
    } catch (e) {
      print("Failed to verify OTP: $e");
    }
   
  }




    await ref.read(authControllerProvider.notifier).recoverSessionFromLink(uri);
  }
}
