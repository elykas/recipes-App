import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// זה ה-StateNotifier שמחזיק את השפה הנוכחית
class LocaleNotifier extends StateNotifier<Locale> {
  LocaleNotifier(Locale initialLocale) : super(initialLocale);

  void setLocale(Locale newLocale) {
    state = newLocale;
  }
}

// provider גלובלי לכל האפליקציה
final localeProvider =
    StateNotifierProvider<LocaleNotifier, Locale>((ref) {
  // default לפני שהמשתמש מתחבר
  return LocaleNotifier(const Locale('en'));
});
