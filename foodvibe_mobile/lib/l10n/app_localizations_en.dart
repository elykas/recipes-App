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
  String get resendEmailButton => 'Resend Email';

  @override
  String get backToLogin => 'Back to login';

  @override
  String resendInSeconds(Object seconds) {
    return 'Resend in $seconds sec';
  }

  @override
  String get expiredLink => 'The link has expired. Please request a new one.';

  @override
  String get newEmailSent =>
      'A new email has been sent. Please check your inbox.';

  @override
  String get loginWithGoogleButton => 'Login with Google';

  @override
  String get usernameLabel => 'Username';

  @override
  String get invalidUsername => 'Invalid username';

  @override
  String get takenUsername => 'Username is already taken';

  @override
  String get checkingUsername => 'Checking...';

  @override
  String get usernameAvailable => 'Username is available';

  @override
  String get usernameIsRequired => 'Username is required';

  @override
  String get registerLabel => 'Register';

  @override
  String get fullNameLabel => 'Full Name';

  @override
  String get invalidFullName => 'Full name must be 2–50 letters only';

  @override
  String get pickDateLabel => 'Pick date';

  @override
  String get birthDateLabel => 'birthdate(optional)';

  @override
  String get headLineLabel => 'Headline (optional)';

  @override
  String get invalidHeadLine => 'Headline must be 2–100 letters only';

  @override
  String get agreeToTerms =>
      'I agree to the Terms of Service and Privacy Policy';

  @override
  String get registerButton => 'Register';

  @override
  String get registerFailed => 'Registration failed. Please try again.';

  @override
  String get registerSuccess => 'Registration complete';

  @override
  String get termsOfService =>
      'Welcome to FoodVibe! By using this app, you agree to abide by the following terms and conditions. You must be at least 13 years old to use this app. You are responsible for maintaining the confidentiality of your account information. You agree not to use the app for illegal activities or to harass others. We reserve the right to suspend or terminate accounts for violations of these terms. The content provided in the app is for personal use only and may not be redistributed without permission. By continuing to use the app, you accept these terms in full.';

  @override
  String get privacyPolicy =>
      'FoodVibe is committed to protecting your privacy. We collect personal information such as your email, username, and profile details to provide and improve our services. We do not share your information with third parties without your consent, except as required by law. Your data is stored securely and may be deleted upon request. By using the app, you consent to the collection and use of your information as described in this Privacy Policy.';
}
