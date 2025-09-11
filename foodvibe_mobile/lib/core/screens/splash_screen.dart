import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/core/location_platform/href/web_location.dart';
import 'package:foodvibe_mobile/core/utils/locale_service.dart';
import 'package:foodvibe_mobile/features/auth/application/auth_controller.dart';
import 'package:foodvibe_mobile/features/feed/application/feed_controller.dart';
import 'package:foodvibe_mobile/l10n/app_localizations.dart';
import 'package:foodvibe_mobile/providers/dio_provider.dart';
import 'package:foodvibe_mobile/providers/locale_provider.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
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
  final href = getHref();

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    );

    _fade = CurvedAnimation(parent: _controller, curve: Curves.easeIn);

    _slide = Tween<Offset>(
      begin: const Offset(0, 0.6),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));

    _controller.forward();

    _init();
  }

  Future<void> _init() async {
    try {
      if (kIsWeb || href != null) {
        final uri = Uri.parse(href!);

        final query = uri.queryParameters;
        final hasAuthParams = [
          'access_token',
          'refresh_token',
          'code',
          'type',
        ].any(query.containsKey);

        if (hasAuthParams) {
          context.go(AppRoutes.verifyToken);
        }
      }

      ref.read(dioClientProvider);
      await ref.read(authControllerProvider.notifier).loadUser();
      if (!mounted) return;

      final authState = ref.read(authControllerProvider);
      final user = authState.user;
      final initialLocale = await LocaleService.getInitialLocale(user);
      ref.read(localeProvider.notifier).setLocale(initialLocale);

      await Future.delayed(const Duration(seconds: 3));

      if (!mounted) return;
      if (user == null) {
        context.go(AppRoutes.login);
        return;
      }

      try {
        await ref.read(feedControllerProvider.notifier).fetchFeed();
      } catch (e) {
        debugPrint('Error loading feed: $e');
      }
      
      if (!mounted) return;
      context.go(AppRoutes.feed);

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
