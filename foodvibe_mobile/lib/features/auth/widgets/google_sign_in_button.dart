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

class GoogleSignInButton extends ConsumerStatefulWidget {
  final void Function(String?) setError;
  const GoogleSignInButton({super.key, required this.setError});

  @override
  ConsumerState<GoogleSignInButton> createState() => _GoogleSignInButtonState();
}

class _GoogleSignInButtonState extends ConsumerState<GoogleSignInButton> {
  bool _isLoading = false;
  final String googleLogoPath = 'assets/images/google_logo.svg';

  Future<void> _handleSignIn() async {
    try {
      setState(() {
        _isLoading = true;
      });
      widget.setError(null);

      final success = await ref
          .read(authControllerProvider.notifier)
          .signInWithGoogle();

      if (success) {
        if (mounted) {
          context.go(AppRoutes.verifyToken);
        }
      } else {
        widget.setError("loginFailed");
      }
    } catch (e) {
      widget.setError("loginFailed");
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    return CustomButton(
      onPressed: _isLoading ? null : _handleSignIn,
      isLoading: _isLoading,
      variant: ButtonVariant.secondary, // 👈 כאן בוחרים שהכפתור יהיה לבן
      shape: AppShapes.roundedRectangleShapeMedium,
      padding: EdgeInsets.symmetric(vertical: AppSpacing.medium),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (!_isLoading) ...[
            SvgPicture.asset(googleLogoPath, width: 20, height: 20),
            SizedBox(width: AppSpacing.small),
          ],
          Text(
            _isLoading ? loc.loading : loc.loginWithGoogleButton,
            style: AppTextStyles.button.copyWith(color: AppColors.darkText),
          ),
        ],
      ),
    );
  }
}
