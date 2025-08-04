import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/material.dart';
import '../application/auth_controller.dart';
import '../../../../../routes/app_router.dart';
import '../../../l10n/app_localizations.dart';

class EmailLoginForm extends ConsumerStatefulWidget {
  const EmailLoginForm({super.key});

  @override
  EmailLoginFormState createState() => EmailLoginFormState();
}

class EmailLoginFormState extends ConsumerState<EmailLoginForm> {
  final _emailController = TextEditingController();
  String? _errorKey;
  final bool _isLoading = false;

  bool _isValidEmail(String email) {
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    return emailRegex.hasMatch(email);
  }

  Future<void> _submit() async {
    final email = _emailController.text.trim();

    if (!_isValidEmail(email)) {
      setState(() => _errorKey = "invalidEmailInput");
      return;
    }

    final authController = ref.read(authControllerProvider.notifier);

    try {
      await authController.signInWithEmail(email: _emailController.text);
      final session = ref.read(authControllerProvider);
      final token = session?.accessToken;
      if (session != null && token != null && mounted) {
        Navigator.pushReplacementNamed(
          context,
          AppRoutes.verifyToken,
          arguments: token,
        );
      } else {
        setState(() => _errorKey = "loginFailed");
      }
    } catch (e) {
      setState(() => _errorKey = "loginFailed");
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
        if (_errorKey != null && _errorKey != "invalidEmail")
          Padding(
            padding: const EdgeInsets.only(top: 8.0),
            child: Text(
              _errorKey == 'loginFailed' ? loc.loginFailed : '',
              style: TextStyle(color: Colors.red),
            ),
          ),
        SizedBox(height: 16),
        ElevatedButton(onPressed: _submit, child: Text(loc.loginButton)),
      ],
    );
  }
}
