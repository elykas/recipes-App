import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../application/auth_controller.dart';
import '../../../../../routes/app_router.dart';
import '../../../l10n/app_localizations.dart';
import 'package:foodvibe_mobile/core/utils/validators.dart';
import 'package:foodvibe_mobile/core/widgets/custom_button.dart';
import 'package:foodvibe_mobile/core/widgets/custom_text_field.dart';
import 'package:foodvibe_mobile/core/theme/app_colors.dart';
import 'package:foodvibe_mobile/core/theme/app_spacing.dart';
import 'package:foodvibe_mobile/core/theme/app_shapes.dart';

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
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        CustomTextField(
          controller: _emailController,
          labelText: loc.emailLabel,
          errorText: _errorKey == "invalidEmailInput"
              ? loc.invalidEmailInput
              : null,
          enabled: !_isLoading,
        ),
        SizedBox(height: AppSpacing.medium),
        SizedBox(
          width: double.infinity,
          child: CustomButton(
            onPressed: _submit,
            label: loc.loginButton,
            isLoading: _isLoading,
            padding: EdgeInsets.all(16),
            backgroundColor: AppColors.darkText,
            shape: AppShapes.roundedRectangleShapeMedium,
          ),
        ),
      ],
    );
  }
}
