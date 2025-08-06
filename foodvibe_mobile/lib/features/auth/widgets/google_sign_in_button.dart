import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:go_router/go_router.dart';

import '../../../l10n/app_localizations.dart';
import '../application/auth_controller.dart';

class GoogleSignInButton extends ConsumerWidget {
   final void Function(String?) setError;
  const GoogleSignInButton({super.key, required this.setError});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final loc = AppLocalizations.of(context)!;
    
    return ElevatedButton.icon(
      onPressed: () async {
        try{
          final success = await ref.read(authControllerProvider.notifier).signInWithGoogle();
          if (success) {
            context.go(AppRoutes.loginCallback);
          } else {
            setError("loginFailed");
          }
        } catch (e) {
          setError("loginFailed");
        }
      },
      icon: Icon(FontAwesomeIcons.google, size: 20),
      label: Text(loc.loginWithGoogleButton),
    );
  }
}
