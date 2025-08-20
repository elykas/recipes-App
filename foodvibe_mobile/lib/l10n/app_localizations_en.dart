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
  String get appDescription =>
      'Discover and share your food experiences with foodVibe. Connect with food lovers, explore new recipes, and enjoy a vibrant community of culinary enthusiasts.';

  @override
  String get onboardingText => 'Explore, Share, and Connect Around Food';

  @override
  String get swipeUpToLogin => 'Swipe up to login';

  @override
  String get loginButton => 'Login';

  @override
  String get loginWelcome => 'Let’s get started';

  @override
  String get loginDescription =>
      'Sign in to discover recipes and connect with food lovers';

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
  String get registerButton => 'Register';

  @override
  String get registerFailed => 'Registration failed. Please try again.';

  @override
  String get registerSuccess => 'Registration complete';

  @override
  String get agreeToTerms =>
      'I agree to the Terms of Service and Privacy Policy';

  @override
  String get termsAndPolicyText => 'Terms of Service & Privacy Policy';

  @override
  String get close => 'Close';
}
