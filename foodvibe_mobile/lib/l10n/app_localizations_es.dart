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
  String get appDescription =>
      'Descubre y comparte tus experiencias gastronómicas con foodVibe. Conéctate con amantes de la comida, explora nuevas recetas y disfruta de una comunidad vibrante de entusiastas culinarios.';

  @override
  String get onboardingText =>
      'Explora, Comparte y Conéctate Alrededor de la Comida';

  @override
  String get swipeUpToLogin => 'Desliza hacia arriba para iniciar sesión';

  @override
  String get loginButton => 'Iniciar sesión';

  @override
  String get loginWelcome => 'Empecemos';

  @override
  String get loginDescription =>
      'Inicia sesión para descubrir recetas y conectar con amantes de la comida';

  @override
  String get emailLabel => 'Correo electrónico';

  @override
  String get loading => 'Cargando...';

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

  @override
  String get usernameIsRequired => 'El nombre de usuario es obligatorio';

  @override
  String get registerLabel => 'Registrarse';

  @override
  String get fullNameLabel => 'Nombre completo';

  @override
  String get invalidFullName =>
      'El nombre completo debe tener entre 2 y 50 letras';

  @override
  String get pickDateLabel => 'Seleccionar fecha';

  @override
  String get birthDateLabel => 'Fecha de nacimiento (opcional)';

  @override
  String get headLineLabel => 'Titular (opcional)';

  @override
  String get invalidHeadLine => 'El titular debe tener entre 2 y 100 letras';

  @override
  String get registerButton => 'Registrarse';

  @override
  String get registerFailed => 'El registro falló. Inténtalo de nuevo.';

  @override
  String get registerSuccess => 'Registro completo';

  @override
  String get agreeToTerms =>
      'Acepto los Términos de servicio y la Política de privacidad';

  @override
  String get termsAndPolicyText =>
      'Términos de servicio y Política de privacidad';

  @override
  String get close => 'Cerrar';
}
