import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/auth/data/auth_model.dart';
import 'package:foodvibe_mobile/features/auth/widgets/username_field.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:foodvibe_mobile/providers/locale_provider.dart';
import '../../../l10n/app_localizations.dart';
import '../../../core/utils/validators.dart';
import '../application/auth_controller.dart';
import '../widgets/policy_modal.dart';

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
    final loc = AppLocalizations.of(context)!;

    if (!_formKey.currentState!.validate()) return;
    if (!_usernameAvailable) return;

    setState(() => _isLoading = true);

    final email = widget.response.email;
    final username = _usernameController.text.trim();
    final locale = ref.watch(localeProvider).toLanguageTag();
    ;

    try {
      final userDetails = UserRegisterDetails(
        email: email,
        username: username,
        fullName: _fullNameController.text.trim(),
        headLine: _headlineController.text.trim(),
        birthDate: _birthdate,
        locale: locale,
        agreedToPolicy: _agreed,
        agreedToPolicyDate: DateTime.now(),
        agreedToPolicyVersion: "v1.0",
      );

      await ref
          .read(authControllerProvider.notifier)
          .completeRegister(userDetails);

      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(loc.registerSuccess)));
      context.go(AppRoutes.transiction);
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(loc.registerFailed)));
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
    final loc = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(title: Text(loc.registerLabel)),
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
                decoration: InputDecoration(labelText: loc.fullNameLabel),
                autovalidateMode: AutovalidateMode.disabled,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return AppLocalizations.of(context)!.usernameIsRequired;
                  }
                  return null;
                },
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Text(
                    _birthdate != null
                        ? "${loc.birthDateLabel}: ${DateFormat.yMd().format(_birthdate!)}"
                        : loc.birthDateLabel,
                  ),
                  TextButton(
                    onPressed: _pickBirthdate,
                    child: Text(loc.pickDateLabel),
                  ),
                  if (_birthdate != null)
                    IconButton(
                      icon: const Icon(Icons.clear, color: Colors.red),
                      onPressed: () {
                        setState(() => _birthdate = null);
                      },
                    ),
                ],
              ),
              TextFormField(
                controller: _headlineController,
                decoration: InputDecoration(labelText: loc.headLineLabel),
                validator: (value) {
                  if (value != null && value.isNotEmpty) {
                    if (!Validators.validateHeadline(value)) {
                      return loc.invalidHeadLine;
                    }
                  }
                  return null;
                },
              ),
              const SizedBox(height: 12),
              TermsCheckbox(
                initialValue: _agreed,
                onChanged: (v) => setState(() => _agreed = v),
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
                    : Text(loc.registerButton),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
