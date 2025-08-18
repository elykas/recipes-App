import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../application/auth_controller.dart';
import '../../../../../routes/app_router.dart';
import '../../../l10n/app_localizations.dart';
import 'package:foodvibe_mobile/utils/validators.dart';

class EmailLoginForm extends ConsumerStatefulWidget {
  final void Function(String?) setError;

  const EmailLoginForm({super.key, required this.setError});

  @override
  EmailLoginFormState createState() => EmailLoginFormState();
}

class EmailLoginFormState extends ConsumerState<EmailLoginForm> {
  final _emailController = TextEditingController();
  String? _errorKey;
  bool _isLoading = false;

  Future<void> _submit() async {
    final email = _emailController.text.trim();

    if (!Validators.validateEmail(email)) {
      setState(() => _errorKey = "invalidEmailInput");
      return;
    }

    final authController = ref.read(authControllerProvider.notifier);

    try {
      setState(() {
        _errorKey = null;
        _isLoading = true;
      });
      await authController.signInWithEmail(email: _emailController.text);
      context.go(AppRoutes.emailSent, extra: email);
    } catch (e) {
      widget.setError("loginFailed");
    } finally {
      setState(() {
        _emailController.clear();
        _isLoading = false;
      });
    }
  }


  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextField(
          controller: _emailController,
          decoration: InputDecoration(
            labelText: loc.emailLabel,
            errorText: _errorKey == "invalidEmailInput"
                ? loc.invalidEmailInput
                : null,
          ),
        ),
        SizedBox(height: 16),
        ElevatedButton(
          onPressed: _isLoading ? null : _submit,
          child: _isLoading
              ? SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                  ),
                )
              : Text(loc.loginButton),
        ),
      ],
    );
  }
}
