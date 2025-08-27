import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:foodvibe_mobile/providers/locale_provider.dart';
import 'package:foodvibe_mobile/l10n/app_localizations.dart';
import 'package:foodvibe_mobile/features/auth/application/auth_controller.dart';
import 'dart:async';
import 'package:foodvibe_mobile/features/feed/application/feed_controller.dart';

import 'package:go_router/go_router.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({super.key});

  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fade;
  late Animation<Offset> _slide;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    );

    _fade = CurvedAnimation(parent: _controller, curve: Curves.easeIn);

    // התחלה מ־3/4 המסך עד האמצע (y = 0 זה מרכז, y חיובי זה למטה)
    _slide = Tween<Offset>(
      begin: const Offset(0, 0.6), // 0.5 = בערך שלושת רבעי המסך למטה
      end: Offset.zero, // מרכז המסך
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));

    _controller.forward();

    final deviceLocale = WidgetsBinding.instance.platformDispatcher.locale;
    final supported = AppLocalizations.supportedLocales
        .map((l) => l.languageCode)
        .toList();

    final initialLocale = supported.contains(deviceLocale.languageCode)
        ? deviceLocale
        : const Locale('en');

    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(localeProvider.notifier).setLocale(initialLocale);
    });

    _init();
  }

Future<void> _init() async {
  try {
    await ref.read(authControllerProvider.notifier).loadUser();

    final authState = ref.read(authControllerProvider);

    if (authState.user != null) {
      
      await ref.read(feedControllerProvider.notifier).fetchFeed();
      
      await Future.delayed(const Duration(seconds: 3));

      if (!mounted) return;
      context.go(AppRoutes.feed);
    } else {
      await Future.delayed(const Duration(seconds: 3));
      if (!mounted) return;
      context.go(AppRoutes.login);
    }
  } catch (e, st) {
    print('Error loading user or feed: $e\n$st');
    if (!mounted) return;
    context.go(AppRoutes.login);
  }
}


  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;

    return Scaffold(
      backgroundColor: Colors.white,
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color.fromRGBO(255, 131, 42, 0.0), // rgba(255,131,42,0.00)
              Color.fromRGBO(255, 131, 42, 0.52), // rgba(255,131,42,0.52)
            ],
            stops: [0.2628, 0.9452], // אחוזים שהמרת ל־0..1
          ),
        ),
        child: Center(
          child: FadeTransition(
            opacity: _fade,
            child: SlideTransition(
              position: _slide,
              child: Text(
                loc.appTitle, // עכשיו זה נכון
                style: const TextStyle(
                  color: Color(0xFFFF832A), // #FF832A
                  fontFamily: 'Poppins', // Font family
                  fontSize: 32, // Font size
                  fontStyle: FontStyle.normal, // Normal style
                  fontWeight: FontWeight.w700, // Bold (700)
                  height: 40 / 32, // line-height / font-size = 40/32 = 1.25
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
