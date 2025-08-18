import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/auth/application/auth_controller.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../../../l10n/app_localizations.dart';

class EmailSentPage extends ConsumerStatefulWidget {
  const EmailSentPage({super.key});

  @override
  ConsumerState<EmailSentPage> createState() => _EmailSentPageState();
}

class _EmailSentPageState extends ConsumerState<EmailSentPage> {
  bool _isResendEnabled = false;
  int _secondsRemaining = 20;
  Timer? _timer;
  late String _email = '';
  bool _hasSetupListener = false;

  @override
  void initState() {
    super.initState();
    _startCountdown();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    final extra = GoRouterState.of(context).extra;

    if (extra is! String) return;

    WidgetsBinding.instance.addPostFrameCallback((_) {
      final loc = AppLocalizations.of(context)!;

      switch (extra) {
        case 'expiredLink':
          _showSnackBar(loc.expiredLink);
          break;
        case 'loginFailed':
          _showSnackBar(loc.loginFailed);
          break;
        default:
          if (extra.contains('@')) {
            _email = extra;
          }
          break;
      }
    });
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  void _startCountdown() {
    _isResendEnabled = false;
    _secondsRemaining = 20;
    _timer?.cancel();

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining == 0) {
        setState(() {
          _isResendEnabled = true;
        });
        timer.cancel();
      } else {
        setState(() {
          _secondsRemaining--;
        });
      }
    });
  }

  void _resendEmail() async {
    _startCountdown();

    final authController = ref.read(authControllerProvider.notifier);

    if (_email.isNotEmpty) {
      try {
        await authController.signInWithEmail(email: _email);
        if (mounted) {
          final loc = AppLocalizations.of(context)!;
          _showSnackBar(loc.newEmailSent);
        }
      } catch (e) {
        if (mounted) {
          final loc = AppLocalizations.of(context)!;
          _showSnackBar(loc.loginFailed);
        }
      }
    }
  }

  void _goBackToLogin() {
    context.go(AppRoutes.login);
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    if (!_hasSetupListener) {
      _hasSetupListener = true;
      ref.listen<Session?>(authControllerProvider, (previous, next) {
        if (next != null) {
          context.go(AppRoutes.verifyToken);
        }
      });
    }

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.email_outlined, size: 80),
            const SizedBox(height: 20),
            Text(
              loc.emailSent,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: _isResendEnabled ? _resendEmail : null,
              child: Text(
                _isResendEnabled
                    ? loc.resendEmailButton
                    : loc.resendInSeconds(_secondsRemaining),
              ),
            ),
            const SizedBox(height: 10),
            TextButton(
              onPressed: _goBackToLogin,
              child: Text(loc.backToLogin),
            ),
          ],
        ),
      ),
    );
  }
}
