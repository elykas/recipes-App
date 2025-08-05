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
  String get loginWithGoogleButton => 'Entrar com o Google';
}
