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
  String get agreeToTerms =>
      'Acepto los Términos de servicio y la Política de privacidad';

  @override
  String get registerButton => 'Registrarse';

  @override
  String get registerFailed => 'El registro falló. Inténtalo de nuevo.';

  @override
  String get registerSuccess => 'Registro completo';

  @override
  String get termsOfService =>
      '¡Bienvenido a FoodVibe! Al usar esta aplicación, usted acepta cumplir con los siguientes términos y condiciones. Debe tener al menos 13 años para usar esta aplicación. Usted es responsable de mantener la confidencialidad de la información de su cuenta. Acepta no usar la aplicación para actividades ilegales o para acosar a otros. Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos. El contenido proporcionado en la aplicación es solo para uso personal y no puede redistribuirse sin permiso. Al continuar usando la aplicación, acepta estos términos en su totalidad.';

  @override
  String get privacyPolicy =>
      'FoodVibe se compromete a proteger su privacidad. Recopilamos información personal como su correo electrónico, nombre de usuario y detalles del perfil para proporcionar y mejorar nuestros servicios. No compartimos su información con terceros sin su consentimiento, excepto cuando lo exige la ley. Sus datos se almacenan de forma segura y pueden eliminarse a petición. Al usar la aplicación, usted da su consentimiento para la recopilación y el uso de su información según lo descrito en esta Política de Privacidad.';
}
