import 'package:flutter/material.dart';
import 'package:foodvibe_mobile/core/theme/app_text_styles.dart';
import 'package:foodvibe_mobile/core/theme/app_spacing.dart';
import 'package:foodvibe_mobile/core/theme/app_shapes.dart';
import 'package:foodvibe_mobile/core/theme/app_colors.dart';
import 'package:foodvibe_mobile/l10n/app_localizations.dart';

enum ButtonVariant { primary, secondary }

class CustomButton extends StatelessWidget {
  final VoidCallback? onPressed;
  final String? label;
  final Widget? child; // <-- add this
  final bool isLoading;
  final ButtonVariant variant;
  final EdgeInsets? padding;
  final OutlinedBorder? shape;

  const CustomButton({
    this.label,
    this.onPressed,
    this.child, // <-- add this
    this.isLoading = false,
    this.variant = ButtonVariant.primary,
    this.padding,
    this.shape,
  });

  @override
  Widget build(BuildContext context) {
    final isDisabled = onPressed == null || isLoading;
    final loc = AppLocalizations.of(context)!;

    Color backgroundColor;
    Color foregroundColor;
    BorderSide? border;

    switch (variant) {
      case ButtonVariant.primary:
        backgroundColor = isDisabled ? Colors.grey[400]! : AppColors.darkText;
        foregroundColor = Colors.white;
        border = null;
        break;
      case ButtonVariant.secondary:
        backgroundColor = isDisabled ? Colors.grey[200]! : Colors.white;
        foregroundColor = isDisabled ? Colors.grey[600]! : Colors.black;
        border = BorderSide(color: Colors.black, width: 1);
        break;
    }

    return SizedBox(
      width: double.infinity, // ✅ הכפתור יתפרס על כל הרוחב
      child: ElevatedButton(
        onPressed: isDisabled ? null : onPressed,
        style: ElevatedButton.styleFrom(
          padding:
              padding ??
              const EdgeInsets.symmetric(vertical: AppSpacing.medium),
          shape:
              shape ??
              RoundedRectangleBorder(
                borderRadius: AppShapes.borderRadiusMedium,
              ),
          backgroundColor: backgroundColor,
          foregroundColor: foregroundColor,
          side: border,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (isLoading) ...[
              SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    variant == ButtonVariant.primary
                        ? Colors.white
                        : Colors.black,
                  ),
                ),
              ),
              const SizedBox(width: 8),
            ],
            if (child != null) ...[
              child!, // SVG + טקסט שלך
            ] else ...[
              Text(
                isLoading ? loc.loading : (label ?? ''),
                style: AppTextStyles.button.copyWith(color: foregroundColor),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
