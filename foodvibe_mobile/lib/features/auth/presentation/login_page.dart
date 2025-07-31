import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../widgets/google_sign_in_button.dart';
import '../widgets/email_login_form.dart';

class LoginPage extends ConsumerStatefulWidget {
  const LoginPage({super.key});

  @override
  ConsumerState<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends ConsumerState<LoginPage> {

   @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          EmailLoginForm(),
          SizedBox(height: 20),
          GoogleSignInButton(),
        ],
      ),
    );
  }
}