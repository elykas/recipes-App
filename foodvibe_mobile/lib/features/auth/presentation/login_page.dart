import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../l10n/app_localizations.dart';
import '../widgets/email_login_form.dart';
import '../widgets/google_sign_in_button.dart';
import '../widgets/or_login_with_lines.dart';
import 'package:foodvibe_mobile/core/theme/app_colors.dart';
import 'package:foodvibe_mobile/core/theme/app_text_styles.dart';
import 'package:foodvibe_mobile/core/theme/app_spacing.dart';
import 'package:foodvibe_mobile/core/theme/app_shapes.dart';

class LoginPage extends ConsumerStatefulWidget {
  final String? errorMessage;
  const LoginPage({super.key, this.errorMessage});

  @override
  ConsumerState<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends ConsumerState<LoginPage>
    with SingleTickerProviderStateMixin {
  String? _errorKey;

  double _sheetExtent = 0.1;

  @override
  void initState() {
    super.initState();

    if (widget.errorMessage != null) {
      _errorKey = widget.errorMessage;
    }

    WidgetsBinding.instance.addPostFrameCallback((_) {
      final state = GoRouterState.of(context);
      final extra = state.extra;

      if (extra != null && extra is String) {
        setError(extra);
      }
    });
  }

  void setError(String? error) {
    setState(() => _errorKey = error);
    if (error != null) {
      _sheetExtent = 0.55;
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(gradient: AppColors.loginGradient),
          ),

          NotificationListener<DraggableScrollableNotification>(
            onNotification: (notification) {
              setState(() {
                _sheetExtent = notification.extent;
              });
              return true;
            },
            child: DraggableScrollableSheet(
              initialChildSize: 0.1,
              minChildSize: 0.1,
              maxChildSize: 0.55,
              snap: true,
              snapSizes: const [0.1, 0.55],
              builder: (context, scrollController) {
                return Container(
                  decoration: const BoxDecoration(
                    color: AppColors.background,
                    borderRadius: AppShapes.verticalTopRounded,
                  ),
                  child: SingleChildScrollView(
                    controller: scrollController,
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.medium,
                      vertical: AppSpacing.medium,
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Center(
                          child: AnimatedSwitcher(
                            duration: const Duration(milliseconds: 300),
                            child: _sheetExtent <= 0.15
                                ? const Padding(
                                    padding: EdgeInsets.only(
                                      top: AppSpacing.normal,
                                    ),
                                    child: Icon(
                                      LucideIcons.chevronsUp,
                                      size: 32,
                                      key: ValueKey('icon'),
                                    ),
                                  )
                                : Container(
                                    key: const ValueKey('dragBar'),
                                    width: 40,
                                    height: 4,
                                    margin: const EdgeInsets.only(
                                      top: 8,
                                      bottom: 16,
                                    ),
                                    decoration: BoxDecoration(
                                      color: AppColors.darkText,
                                      borderRadius:
                                          AppShapes.borderRadiusVerySmall,
                                    ),
                                  ),
                          ),
                        ),
                        AnimatedOpacity(
                          duration: const Duration(milliseconds: 300),
                          opacity: ((_sheetExtent - 0.1) / (0.5 - 0.1)).clamp(
                            0.0,
                            1.0,
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                loc.loginWelcome,
                                style: AppTextStyles.subtitle.copyWith(
                                  color: AppColors.darkText,
                                ),
                              ),
                              const SizedBox(height: AppSpacing.small),
                              Text(
                                loc.loginDescription,
                                style: AppTextStyles.body.copyWith(
                                  color: AppColors.darkText,
                                ),
                              ),
                              const SizedBox(height: AppSpacing.extraLarge),
                              EmailLoginForm(setError: setError),
                              const SizedBox(height: AppSpacing.medium),
                              OrWithLines(text: loc.loginOr),
                              const SizedBox(height: AppSpacing.medium),
                              GoogleSignInButton(setError: setError),
                              if (_errorKey != null)
                                Padding(
                                  padding: const EdgeInsets.only(
                                    top: AppSpacing.normal,
                                  ),
                                  child: Text(
                                    loc.loginFailed,
                                    style: Theme.of(context)
                                        .textTheme
                                        .bodyMedium
                                        ?.copyWith(color: AppColors.error),
                                  ),
                                ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          Positioned(
            left: MediaQuery.of(context).size.width * 0.08,
            right: MediaQuery.of(context).size.width * 0.2,
            bottom: MediaQuery.of(context).size.height * 0.14,
            child: AnimatedOpacity(
              opacity: (_sheetExtent < 0.3) ? 1.0 : 0.0,
              duration: const Duration(milliseconds: 300),
              child: IgnorePointer(
                ignoring: _sheetExtent >= 0.3,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(loc.appTitle, style: AppTextStyles.title),
                    const SizedBox(height: AppSpacing.medium),
                    Text(loc.onboardingText, style: AppTextStyles.subtitle),
                    const SizedBox(height: AppSpacing.normal),
                    Text(
                      loc.swipeUpToLogin,
                      style: AppTextStyles.body.copyWith(
                        color: Color(0xFFFFD4B5),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
