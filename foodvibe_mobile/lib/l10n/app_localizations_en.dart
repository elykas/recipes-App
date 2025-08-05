// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appTitle => 'foodVibe';

  @override
  String get loginButton => 'Login';

  @override
  String get emailLabel => 'Email';

  @override
  String get emailSent => 'Email sent successfully, check your inbox.';

  @override
  String get invalidEmailInput => 'Invalid email format';

  @override
  String get loginOr => 'or';

  @override
  String get loginFailed => 'Login failed. Please try again.';

  @override
  String get loginWithGoogleButton => 'Login with Google';
}
