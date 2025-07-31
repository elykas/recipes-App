import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/material.dart';
import '../application/auth_controller.dart';
import '../../../../../routes/app_router.dart';


class EmailLoginForm extends ConsumerStatefulWidget {
  const EmailLoginForm({super.key});

  @override
  EmailLoginFormState createState() => EmailLoginFormState();
}

class EmailLoginFormState extends ConsumerState<EmailLoginForm> {
  final _emailController = TextEditingController();
  String? _error;
  final bool _isLoading = false;

  bool _isValidEmail(String email) {
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    return emailRegex.hasMatch(email);
  }

  Future<void> _submit() async {
    final email = _emailController.text.trim();

    if (!_isValidEmail(email)) {
      setState(() => _error = "Invalid email format");
      return;
    }

    final authController = ref.read(authControllerProvider.notifier);
    
    try {
      await authController.signInWithEmail(email: _emailController.text);
      final session = ref.read(authControllerProvider);
      final token = session?.accessToken;
      if (session != null && token != null && mounted) {
        Navigator.pushReplacementNamed(context, AppRoutes.verifyToken, arguments: token);
      } else {
        setState(() => _error = "Login failed");
      }
    } catch (e) {
      setState(() => _error = "Login failed. Please try again.");
    }
  }

  @override
  Widget build(BuildContext context) {
     return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextField(
          controller: _emailController,
          decoration: InputDecoration(
            labelText: 'email',
            errorText: _error != null && _error == "Invalid email format"
                ? _error
                : null,
          ),
        ),
        if (_error != null && _error != "Invalid email format")
          Padding(
            padding: const EdgeInsets.only(top: 8.0),
            child: Text(
              _error!,
              style: TextStyle(color: Colors.red),
            ),
          ),
        SizedBox(height: 16),
        ElevatedButton(onPressed: _submit, child: Text('התחבר')),
      ],
    );
  }
}
