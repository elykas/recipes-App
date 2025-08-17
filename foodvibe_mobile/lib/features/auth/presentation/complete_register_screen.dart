import 'package:flutter/material.dart';
import 'package:foodvibe_mobile/features/auth/data/auth_model.dart';
import 'package:foodvibe_mobile/services/supabase_service.dart';
import 'package:intl/intl.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class RegisterScreen extends StatefulWidget {
  final VerifyTokenResponse response;

  const RegisterScreen({super.key, required this.response});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _fullNameController = TextEditingController();
  final _headlineController = TextEditingController();

  DateTime? _birthdate;
  bool _isLoading = false;
  bool _agreed = false;

  String? _usernameError;

  Future<bool> _checkUsernameAvailability(String username) async {
    final isExistingUsername = await Supabase.instance.client
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle();

    return isExistingUsername == null;
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    final user = SupabaseManager.client.auth.currentUser;
    final email = user?.email;
    final userId = user?.id;

    if (user == null || email == null) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('User not logged in')));
      setState(() => _isLoading = false);
      return;
    }

    final username = _usernameController.text.trim();
    final isAvailable = await _checkUsernameAvailability(username);
    if (!isAvailable) {
      setState(() {
        _usernameError = 'Username already taken';
        _isLoading = false;
      });
      return;
    }

    final locale = WidgetsBinding.instance.platformDispatcher.locale
        .toLanguageTag();

    try {
      await SupabaseManager.client.from('profiles').upsert({
        'id': userId,
        "email": email,
        'username': username,
        'fullName': _fullNameController.text.trim(),
        'headLine': _headlineController.text.trim(),
        'birthDate': _birthdate?.toIso8601String(),
        'locale': locale,
        'agreedToPolicy': _agreed, // checkbox שלך
        'agreedToPolicyDate': DateTime.now().toIso8601String(),
        'agreedToPolicyVersion': "v1.0", // כאן אתה קובע גרסה
      });

      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Registration complete')));
      // Navigate to app
    } catch (e) {
      debugPrint('Error: $e');
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

    if (date != null) {
      setState(() => _birthdate = date);
    }
  }

  @override
  Widget build(BuildContext context) {
    final locale = WidgetsBinding.instance.platformDispatcher.locale;

    return Scaffold(
      appBar: AppBar(title: const Text('Register')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _usernameController,
                decoration: InputDecoration(
                  labelText: 'Username *',
                  errorText: _usernameError,
                ),
                validator: (value) => value == null || value.trim().isEmpty
                    ? 'Username required'
                    : null,
              ),
              TextFormField(
                controller: _fullNameController,
                decoration: const InputDecoration(labelText: 'Full name'),
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
                onPressed: _isLoading || !_agreed ? null : _submit,
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
