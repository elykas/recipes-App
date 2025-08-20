import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/providers/locale_provider.dart';
import 'package:go_router/go_router.dart';

import '../../../l10n/app_localizations.dart';
import '../widgets/email_login_form.dart';
import '../widgets/google_sign_in_button.dart';

class LoginPage extends ConsumerStatefulWidget {
  const LoginPage({super.key});

  @override
  ConsumerState<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends ConsumerState<LoginPage>
    with SingleTickerProviderStateMixin {
  String? _errorKey;

  late AnimationController _controller;
  late Animation<double> _fade;

  @override
  void initState() {
    super.initState();

     _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );
    _fade = CurvedAnimation(parent: _controller, curve: Curves.easeIn);
    _controller.forward();

    final deviceLocale = WidgetsBinding.instance.platformDispatcher.locale;
    final supported = AppLocalizations.supportedLocales
        .map((l) => l.languageCode)
        .toList();

    final initialLocale = supported.contains(deviceLocale.languageCode)
        ? deviceLocale
        : const Locale('en');

    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(localeProvider.notifier).setLocale(initialLocale);
    });

    WidgetsBinding.instance.addPostFrameCallback((_) {
      final state = GoRouterState.of(context);
      final extra = state.extra;

      if (extra != null && extra is String) {
        setError(extra);
      }
    });
  }

  void setError(String? error) {
    setState(() => _errorKey = error);
  }

   @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Widget _socialButton(String text, IconData icon, Color color) {
    return OutlinedButton.icon(
      style: OutlinedButton.styleFrom(
        side: BorderSide(color: color, width: 1.2),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
      ),
      onPressed: () {},
      icon: Icon(icon, color: color),
      label: Text(text, style: TextStyle(color: color)),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

     return Scaffold(
      body: FadeTransition(
        opacity: _fade,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 80),
          child: Center(
            child: Container(
              width: 350,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: const [
                  BoxShadow(
                    color: Colors.black12,
                    blurRadius: 12,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(loc.loginWelcome,
                      style:
                          TextStyle(fontSize: 26, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Text(
                    loc.loginDescription,
                    style: TextStyle(color: Colors.black54, fontSize: 15),
                  ),
                  const SizedBox(height: 30),
                  EmailLoginForm(setError: setError),
                  const SizedBox(height: 16),
                  Text(loc.loginOr, textAlign: TextAlign.center),
                  const SizedBox(height: 20),
                  GoogleSignInButton(setError: setError),
                  if (_errorKey != null)
                    Padding(
                      padding: const EdgeInsets.only(top: 12.0),
                      child: Text(
                        loc.loginFailed,
                        style: const TextStyle(color: Colors.red),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}