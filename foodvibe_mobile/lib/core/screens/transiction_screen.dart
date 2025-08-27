import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/routes/app_router.dart';
import 'package:foodvibe_mobile/l10n/app_localizations.dart';
import 'package:foodvibe_mobile/features/auth/application/auth_controller.dart';
import 'dart:async';
import 'package:foodvibe_mobile/features/feed/application/feed_controller.dart';

import 'package:go_router/go_router.dart';

class TransictionScreen extends ConsumerStatefulWidget {
  const TransictionScreen({super.key});

  @override
  ConsumerState<TransictionScreen> createState() => _TransictionScreenState();
}

class _TransictionScreenState extends ConsumerState<TransictionScreen>
    with SingleTickerProviderStateMixin {
  static const Duration splashDuration = Duration(seconds: 3);

  late final AnimationController _controller;
  late final Animation<double> _fade;
  late final Animation<Offset> _slide;

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

  Future<void> _loadUserAndFeed() async {
    try {
      final authState = ref.read(authControllerProvider);

      if (authState.user == null) {
        throw Exception('No user');
      }

      await ref.read(authControllerProvider.notifier).loadUser();

      await ref.read(feedControllerProvider.notifier).fetchFeed();
    } catch (e) {
      debugPrint('Error loading user or feed: $e');
      rethrow;
    }
  }

  Future<void> _init() async {
    try {
      await _loadUserAndFeed();
      await Future.delayed(splashDuration);

      if (!mounted) return;

      context.go(AppRoutes.feed);
    } catch (_) {
      await Future.delayed(splashDuration);

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
              Color.fromRGBO(255, 131, 42, 0.0),
              Color.fromRGBO(255, 131, 42, 0.52),
            ],
            stops: [0.2628, 0.9452],
          ),
        ),
        child: Center(
          child: FadeTransition(
            opacity: _fade,
            child: SlideTransition(
              position: _slide,
              child: Text(
                loc.appTitle,
                style: const TextStyle(
                  color: Color(0xFFFF832A),
                  fontFamily: 'Poppins',
                  fontSize: 32,
                  fontStyle: FontStyle.normal,
                  fontWeight: FontWeight.w700,
                  height: 40 / 32,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
