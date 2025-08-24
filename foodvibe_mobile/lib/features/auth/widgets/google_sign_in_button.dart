import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../../l10n/app_localizations.dart';
import '../application/auth_controller.dart';
import 'package:foodvibe_mobile/core/widgets/custom_button.dart';
import 'package:foodvibe_mobile/core/theme/app_colors.dart';
import 'package:foodvibe_mobile/core/theme/app_shapes.dart';
import 'package:foodvibe_mobile/core/theme/app_text_styles.dart';
import 'package:foodvibe_mobile/core/theme/app_spacing.dart';

class GoogleSignInButton extends ConsumerWidget {
  final void Function(String?) setError;
  const GoogleSignInButton({super.key, required this.setError});
  final String googleLogoPath = 'assets/images/google_logo.svg';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final loc = AppLocalizations.of(context)!;

    return CustomButton(
      onPressed: () async {
        try {
          setError(null);
          final success = await ref
              .read(authControllerProvider.notifier)
              .signInWithGoogle();
          if (success) {
            context.go(AppRoutes.verifyToken);
          } else {
            setError("loginFailed");
          }
        } catch (e) {
          setError("loginFailed");
        }
      },
      label: loc.loginWithGoogleButton,
      backgroundColor: Colors.white,
      shape: AppShapes.roundedRectangleShapeMedium,
      border: BorderSide(color: AppColors.darkText, width: 1),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SvgPicture.asset(googleLogoPath, width: 20, height: 20),
          SizedBox(width: AppSpacing.small),
          Text(
            loc.loginWithGoogleButton,
            style: AppTextStyles.button.copyWith(color: AppColors.darkText),
          ),
        ],
      ),
    );
  }
}
