import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../application/auth_controller.dart';
import '../../../../../routes/app_router.dart';

class LoginPage extends ConsumerStatefulWidget {
  const LoginPage({super.key});

  @override
  ConsumerState<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends ConsumerState<LoginPage> {
  final _emailController = TextEditingController();
  String? _error;

  Future<void> _login() async {
    final authController = ref.read(authControllerProvider);

    try {
      final response = await authController.signInWithEmail(
        email:_emailController.text,
      );

      if (response != null) {
        if (mounted) {
          Navigator.pushReplacementNamed(context, AppRoutes.feed);
        }
      } else {
        setState(() => _error = "Login failed. Check credentials.");
      }
    } catch (e) {
      setState(() => _error = e.toString());
    }
  }

   @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Login")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            if (_error != null)
              Text(_error!, style: const TextStyle(color: Colors.red)),
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: "Email"),
            ),
            const SizedBox(height: 12),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: _login,
              child: const Text("Login"),
            ),
          ],
        ),
      ),
    );
  }
}

