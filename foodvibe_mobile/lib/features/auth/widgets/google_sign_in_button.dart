import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/material.dart';
import '../application/auth_controller.dart';


class GoogleSignInButton extends ConsumerWidget {
  const GoogleSignInButton({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ElevatedButton.icon(
      onPressed: () {
        ref.read(authControllerProvider.notifier).signInWithGoogle();
      },
      icon: Icon(Icons.login),
      label: Text("התחבר עם Google"),
    );
  }
}
