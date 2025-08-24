import 'package:flutter/material.dart';
import '../theme/app_colors.dart';
import '../theme/app_input_fields.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final String labelText;
  final String? errorText;
  final bool enabled;
  final String? hintText;

  const CustomTextField({
    required this.controller,
    required this.labelText,
    this.errorText,
    this.enabled = true,
    this.hintText,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      enabled: enabled,
      decoration: InputDecoration(
        labelText: labelText,
        hintText: hintText,
        errorText: errorText,
        filled: true,
        fillColor: enabled ? AppColors.background : AppColors.grey,
        border: AppTextFieldStyles.defaultBorder,
        enabledBorder: AppTextFieldStyles.defaultBorder,
        focusedBorder: AppTextFieldStyles.focusedBorder,
        disabledBorder: AppTextFieldStyles.disabledBorder,
        errorBorder: AppTextFieldStyles.errorBorder,
        focusedErrorBorder: AppTextFieldStyles.errorBorder,
      ),
    );
  }
}
