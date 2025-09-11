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
  String get appDescription =>
      'Descubra e compartilhe suas experiências gastronômicas com o foodVibe. Conecte-se com amantes da culinária, explore novas receitas e aproveite uma comunidade vibrante de entusiastas da gastronomia.';

  @override
  String get onboardingText =>
      'Explore, Compartilhe e Conecte-se em Torno da Comida';

  @override
  String get swipeUpToLogin => 'Deslize para cima para entrar';

  @override
  String get loginButton => 'Entrar';

  @override
  String get loginWelcome => 'Vamos começar';

  @override
  String get loginDescription =>
      'Faça login para descobrir receitas e se conectar com amantes da comida';

  @override
  String get emailLabel => 'E-mail';

  @override
  String get loading => 'Carregando...';

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
  String get registerButton => 'Registrar';

  @override
  String get registerFailed => 'Falha no registro. Tente novamente.';

  @override
  String get registerSuccess => 'Registro concluído';

  @override
  String get agreeToTerms =>
      'Concordo com os Termos de Serviço e a Política de Privacidade';

  @override
  String get termsAndPolicyText =>
      'Termos de Serviço e Política de Privacidade';

  @override
  String get close => 'Fechar';

  @override
  String get createPostLabel => 'Criar Post';

  @override
  String get submitPost => 'Enviar Post';

  @override
  String get createPostFailed => 'Falha ao criar post. Tente novamente.';

  @override
  String get camera => 'Camera';

  @override
  String get gallery => 'Galeria';

  @override
  String get contentLabel => 'Conteúdo';

  @override
  String get createPostSuccess => 'Post criado com sucesso';

  @override
  String get editProfile => 'Editar Perfil';

  @override
  String get editProfileFailed => 'Falha ao editar perfil. Tente novamente.';

  @override
  String get editProfileSuccess => 'Perfil editado com sucesso.';

  @override
  String get saveButton => 'Salvar';

  @override
  String get languageLabel => 'Idioma';

  @override
  String get contactLabel => 'Contato';

  @override
  String get aboutLabel => 'Sobre';

  @override
  String get termsLabel => 'Termos';

  @override
  String get privacyLabel => 'Privacidade';

  @override
  String get accessibilityLabel => 'Acessibilidade';

  @override
  String get logoutLabel => 'Sair';

  @override
  String get selectLanguageLabel => 'Selecione um idioma';

  @override
  String get bioLabel => 'Biografia';
}
