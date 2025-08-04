import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/material.dart';
import '../application/auth_controller.dart';
import '../../../l10n/app_localizations.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class GoogleSignInButton extends ConsumerWidget {
  const GoogleSignInButton({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
     final loc = AppLocalizations.of(context)!;
    return ElevatedButton.icon(
      onPressed: () {
        ref.read(authControllerProvider.notifier).signInWithGoogle();
      },
      icon: Icon(FontAwesomeIcons.google, size: 20),
      label: Text(loc.loginWithGoogleButton),
    );
  }
}
