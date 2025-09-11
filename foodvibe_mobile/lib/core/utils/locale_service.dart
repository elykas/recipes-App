import 'package:flutter/material.dart';
import 'package:foodvibe_mobile/features/user/data/user_model.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:foodvibe_mobile/l10n/app_localizations.dart';

class LocaleService {
  static Future<Locale> getInitialLocale(AppUser? user) async {
    if (user != null && user.locale != null) {
      final locale = Locale(user.locale!);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('locale', locale.languageCode);
      return locale;
    }

    final prefs = await SharedPreferences.getInstance();
    final storedLocaleCode = prefs.getString('locale');
    if (storedLocaleCode != null) return Locale(storedLocaleCode);

    final deviceLocale = WidgetsBinding.instance.platformDispatcher.locale;
    final supported = AppLocalizations.supportedLocales
        .map((l) => l.languageCode)
        .toList();
    return supported.contains(deviceLocale.languageCode)
        ? deviceLocale
        : const Locale('en');
  }
}
