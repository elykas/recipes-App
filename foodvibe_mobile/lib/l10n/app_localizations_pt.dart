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

  @override
  String get usernameIsRequired => 'Nome de usuário é obrigatório';

  @override
  String get registerLabel => 'Registrar';

  @override
  String get fullNameLabel => 'Nome completo';

  @override
  String get invalidFullName => 'O nome completo deve ter entre 2 e 50 letras';

  @override
  String get pickDateLabel => 'Selecionar data';

  @override
  String get birthDateLabel => 'Data de nascimento (opcional)';

  @override
  String get headLineLabel => 'Título (opcional)';

  @override
  String get invalidHeadLine => 'O título deve ter entre 2 e 100 letras';

  @override
  String get agreeToTerms =>
      'Concordo com os Termos de Serviço e a Política de Privacidade';

  @override
  String get registerButton => 'Registrar';

  @override
  String get registerFailed => 'Falha no registro. Tente novamente.';

  @override
  String get registerSuccess => 'Registro concluído';

  @override
  String get termsOfService =>
      'Bem-vindo ao FoodVibe! Ao usar este aplicativo, você concorda em cumprir os seguintes termos e condições. Você deve ter pelo menos 13 anos para usar este aplicativo. Você é responsável por manter a confidencialidade das informações da sua conta. Você concorda em não usar o aplicativo para atividades ilegais ou para assediar outros. Reservamo-nos o direito de suspender ou encerrar contas que violem estes termos. O conteúdo fornecido no aplicativo é apenas para uso pessoal e não pode ser redistribuído sem permissão. Ao continuar a usar o aplicativo, você aceita estes termos integralmente.';

  @override
  String get privacyPolicy =>
      'O FoodVibe compromete-se a proteger sua privacidade. Coletamos informações pessoais como seu e-mail, nome de usuário e detalhes do perfil para fornecer e melhorar nossos serviços. Não compartilhamos suas informações com terceiros sem seu consentimento, exceto quando exigido por lei. Seus dados são armazenados com segurança e podem ser excluídos mediante solicitação. Ao usar o aplicativo, você consente com a coleta e uso de suas informações conforme descrito nesta Política de Privacidade.';
}
