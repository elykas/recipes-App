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
  String get emailSent =>
      'Correo enviado con exito, revisa tu bandeja de entrada.';

  @override
  String get invalidEmailInput => 'Formato de correo inválido';

  @override
  String get loginOr => 'o';

  @override
  String get loginFailed => 'Inicio de sesión fallido. Inténtalo de nuevo.';

  @override
  String get resendEmailButton => 'Reenviar correo';

  @override
  String get backToLogin => 'Volver al inicio de sesión';

  @override
  String resendInSeconds(Object seconds) {
    return 'Reenviar en $seconds seg';
  }

  @override
  String get expiredLink =>
      'El enlace ha expirado. Por favor, solicita uno nuevo.';

  @override
  String get newEmailSent =>
      'Se ha enviado un nuevo correo. Por favor, revisa tu bandeja de entrada.';

  @override
  String get loginWithGoogleButton => 'Iniciar sesión con Google';

  @override
  String get usernameLabel => 'Nombre de usuario';

  @override
  String get invalidUsername => 'Nombre de usuario inválido';

  @override
  String get takenUsername => 'El nombre de usuario ya está en uso';

  @override
  String get checkingUsername => 'Comprobando...';

  @override
  String get usernameAvailable => 'Nombre de usuario disponible';
}
