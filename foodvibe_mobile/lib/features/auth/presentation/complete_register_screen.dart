import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/auth/data/auth_model.dart';
import 'package:foodvibe_mobile/features/auth/widgets/username_field.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../utils/validators.dart';
import '../application/auth_controller.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  final VerifyTokenResponse response;

  const RegisterScreen({super.key, required this.response});

  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _fullNameController = TextEditingController();
  final _headlineController = TextEditingController();

  DateTime? _birthdate;
  bool _isLoading = false;
  bool _agreed = false;
  bool _usernameAvailable = false;

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    if (!_usernameAvailable) return;

    setState(() => _isLoading = true);

    final email = widget.response.email;
    final username = _usernameController.text.trim();
    final locale = WidgetsBinding.instance.platformDispatcher.locale
        .toLanguageTag();

    try {
      final userDetails = UserRegisterDetails(
        email: email,
        username: username,
        fullName: _fullNameController.text.trim(),
        headLine: _headlineController.text.trim(),
        birthDate: _birthdate,
        locale: locale,
        agreedToPolicy: _agreed,
        agreedToPolicyVersion: "v1.0",
      );

      await ref
          .read(authControllerProvider.notifier)
          .completeRegister(userDetails);

      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Registration complete')));
      context.go(AppRoutes.feed);
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Failed to register')));
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _pickBirthdate() async {
    final now = DateTime.now();
    final initial = _birthdate ?? DateTime(now.year - 18);
    final date = await showDatePicker(
      context: context,
      initialDate: initial,
      firstDate: DateTime(1900),
      lastDate: now,
    );
    if (date != null) setState(() => _birthdate = date);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Register')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              UsernameField(
                controller: _usernameController,
                onStatusChanged: (username, available) {
                  setState(() => _usernameAvailable = available);
                },
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _fullNameController,
                decoration: const InputDecoration(labelText: 'Full name'),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Full name required';
                  }
                  if (!Validators.validateFullName(value)) {
                    return 'Full name must be 2–50 letters only';
                  }
                  return null; // תקין
                },
              ),

              const SizedBox(height: 12),
              Row(
                children: [
                  Text(
                    _birthdate != null
                        ? 'Birthdate: ${DateFormat.yMd().format(_birthdate!)}'
                        : 'No birthdate selected',
                  ),
                  TextButton(
                    onPressed: _pickBirthdate,
                    child: const Text('Pick date'),
                  ),
                ],
              ),
              TextFormField(
                controller: _headlineController,
                decoration: const InputDecoration(
                  labelText: 'Headline (optional)',
                ),
                validator: (value) {
                  if (value != null && value.isNotEmpty) {
                    if (!Validators.validateHeadline(value)) {
                      return 'Headline must be up to 150 chars';
                    }
                  }
                  return null; // תקין
                },
              ),

              const SizedBox(height: 12),
              Row(
                children: [
                  Checkbox(
                    value: _agreed,
                    onChanged: (v) => setState(() => _agreed = v!),
                  ),
                  const Expanded(
                    child: Text('I agree to the Terms & Conditions'),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _isLoading || !_agreed || !_usernameAvailable
                    ? null
                    : _submit,
                child: _isLoading
                    ? const SizedBox(
                        width: 24,
                        height: 24,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Text('Register'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
