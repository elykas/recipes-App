// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Spanish Castilian (`es`).
class AppLocalizationsEs extends AppLocalizations {
  AppLocalizationsEs([String locale = 'es']) : super(locale);

  @override
  String get appTitle => 'foodVibe';

  @override
  String get loginButton => 'Iniciar sesión';

  @override
  String get emailLabel => 'Correo electrónico';

  @override
  String get invalidEmailInput => 'Formato de correo inválido';

  @override
  String get loginOr => 'o';

  @override
  String get loginFailed => 'Inicio de sesión fallido. Inténtalo de nuevo.';

  @override
  String get loginWithGoogleButton => 'Iniciar sesión con Google';
}
