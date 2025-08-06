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

  @override
  void initState() {
    super.initState();
    
    _startCountdown();
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

  void _resendEmail() {
    _startCountdown();
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
    
    ref.listen<Session?>(
      authControllerProvider,
      (previous, next) {
        if (next != null) {
          context.go(AppRoutes.verifyToken);
        }
      },
    );
    
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
              style: TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: _isResendEnabled ? _resendEmail : null,
              child: Text(
                _isResendEnabled
                    ? "Resend Email"
                    : "Resend in $_secondsRemaining sec",
              ),
            ),
            const SizedBox(height: 10),
            TextButton(
              onPressed: _goBackToLogin,
              child: const Text("Back to Login"),
            ),
          ],
        ),
      ),
    );
  }
}
