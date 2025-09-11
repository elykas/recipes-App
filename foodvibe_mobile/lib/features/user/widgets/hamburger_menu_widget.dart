import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/user/data/user_model.dart';
import 'package:foodvibe_mobile/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

import '../../auth/application/auth_controller.dart';
import '../application/user_controller.dart';

class HamburgerMenu extends ConsumerWidget {
  final AppUser user;

  const HamburgerMenu({super.key, required this.user});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final loc = AppLocalizations.of(context)!;
    return PopupMenuButton<String>(
      icon: const Icon(Icons.menu),
      onSelected: (value) async {
        switch (value) {
          case 'language':
            _showLanguageDialog(context, ref, user);
            break;
          case 'contact':
            break;
          case 'privacy':
            break;
          case 'accessibility':
            break;
          case 'logout':
            ref.read(authControllerProvider.notifier).logOut();
            context.go('/login');
            break;
        }
      },
      itemBuilder: (context) => [
        PopupMenuItem(value: 'language', child: Text(loc.languageLabel)),
        PopupMenuItem(value: 'contact', child: Text(loc.contactLabel)),
        PopupMenuItem(value: 'about', child: Text(loc.aboutLabel)),
        PopupMenuItem(value: 'terms', child: Text(loc.termsLabel)),
        PopupMenuItem(value: 'privacy', child: Text(loc.privacyLabel)),
        PopupMenuItem(
          value: 'accessibility',
          child: Text(loc.accessibilityLabel),
        ),
        PopupMenuItem(value: 'logout', child: Text(loc.logoutLabel)),
      ],
    );
  }

  void _showLanguageDialog(BuildContext context, WidgetRef ref, AppUser user) {
    final loc = AppLocalizations.of(context)!;
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(loc.selectLanguageLabel),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                title: const Text('English'),
                onTap: () async {
                  context.pop();
                  await ref
                      .read(userProfileControllerProvider.notifier)
                      .updateUserLocale('en');
                },
              ),
              ListTile(
                title: const Text('Español'),
                onTap: () async {
                  context.pop();
                  await ref
                      .read(userProfileControllerProvider.notifier)
                      .updateUserLocale('es');
                },
              ),
              ListTile(
                title: const Text('Português'),
                onTap: () async {
                  context.pop();
                  await ref
                      .read(userProfileControllerProvider.notifier)
                      .updateUserLocale('pt');
                },
              ),
            ],
          ),
        );
      },
    );
  }
}
