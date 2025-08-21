import 'package:flutter/material.dart';
import 'package:foodvibe_mobile/features/auth/presentation/login_page.dart';
import 'package:foodvibe_mobile/l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    return Scaffold(
      body: GestureDetector(
        onVerticalDragEnd: (details) {
          final velocity = details.primaryVelocity ?? 0;
          if (velocity < 0) {
            context.go(
              '/login',
            ); // triggers the slide animation defined above
          }
        },
        child: Container(
          width: double.infinity,
          height: double.infinity,
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [Color.fromRGBO(185, 94, 31, 0.0), Color(0xFFB95E1F)],
              stops: [0.0, 0.92],
            ),
          ),
          child: SafeArea(
            bottom: true,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32),
              child: LayoutBuilder(
                builder: (context, constraints) {
                  return SingleChildScrollView(
                    physics: const NeverScrollableScrollPhysics(),
                    child: ConstrainedBox(
                      constraints: BoxConstraints(
                        minHeight: constraints.maxHeight,
                      ),
                      child: IntrinsicHeight(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              loc.appTitle,
                              style: const TextStyle(
                                fontFamily: 'Poppins',
                                color: Colors.white,
                                fontSize: 32,
                                fontWeight: FontWeight.w700,
                                height: 1.25, // line-height / font-size
                              ),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              loc.onboardingText,
                              style: const TextStyle(
                                fontFamily: 'Poppins',
                                color: Colors.white70,
                                fontSize: 18,
                                fontWeight: FontWeight.w500,
                                height: 1.33,
                              ),
                            ),
                            const SizedBox(height: 12),
                            Text(
                              loc.swipeUpToLogin,
                              style: const TextStyle(
                                fontFamily: 'Inter',
                                color: Colors.white54,
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.5,
                              ),
                            ),
                            const SizedBox(height: 30),
                            const Icon(
                              Icons.keyboard_arrow_up,
                              size: 40,
                              color: Colors.white,
                            ),
                            SizedBox(
                              height:
                                  MediaQuery.of(context).padding.bottom + 20,
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        ),
      ),
    );
  }
}
