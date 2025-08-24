import 'package:flutter/material.dart';
import 'package:foodvibe_mobile/core/theme/app_text_styles.dart';

class CustomButton extends StatelessWidget {
  final VoidCallback onPressed;
  final String label;
  final bool isLoading;
  final Widget? child;
  final EdgeInsets? padding;
  final OutlinedBorder? shape;
  final Color? backgroundColor;
  final BorderSide? border;

  const CustomButton({
    required this.onPressed,
    required this.label,
    this.isLoading = false,
    this.child,
    this.padding,
    this.shape,
    this.backgroundColor,
    this.border,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: isLoading ? null : onPressed,
      style: ElevatedButton.styleFrom(
        padding: padding ?? EdgeInsets.symmetric(vertical: 16),
        shape:
            shape ??
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        backgroundColor: backgroundColor ?? Theme.of(context).primaryColor,
        side: border,
      ),
      child: isLoading
          ? SizedBox(
              width: 20,
              height: 20,
              child: CircularProgressIndicator(
                strokeWidth: 2,
                valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
              ),
            )
          : child ?? Text(label, style: AppTextStyles.button),
    );
  }
}
