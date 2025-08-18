// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Portuguese (`pt`).
class AppLocalizationsPt extends AppLocalizations {
  AppLocalizationsPt([String locale = 'pt']) : super(locale);

  @override
  String get appTitle => 'foodVibe';

  @override
  String get loginButton => 'Entrar';

  @override
  String get emailLabel => 'E-mail';

  @override
  String get emailSent =>
      'E-mail enviado com sucesso, verifique sua caixa de entrada.';

  @override
  String get invalidEmailInput => 'Formato de email inválido';

  @override
  String get loginOr => 'ou';

  @override
  String get loginFailed => 'Falha no login. Por favor, tente novamente.';

  @override
  String get resendEmailButton => 'Reenviar E-mail';

  @override
  String get backToLogin => 'Voltar ao login';

  @override
  String resendInSeconds(Object seconds) {
    return 'Reenviar em $seconds seg';
  }

  @override
  String get expiredLink => 'O link expirou. Por favor, solicite um novo.';

  @override
  String get newEmailSent =>
      'Um novo e-mail foi enviado. Por favor, verifique sua caixa de entrada.';

  @override
  String get loginWithGoogleButton => 'Entrar com o Google';

  @override
  String get usernameLabel => 'Nome de usuário';

  @override
  String get invalidUsername => 'Nome de usuário inválido';

  @override
  String get takenUsername => 'O nome de usuário já está em uso';

  @override
  String get checkingUsername => 'Verificando...';

  @override
  String get usernameAvailable => 'Nome de usuário disponível';
}
