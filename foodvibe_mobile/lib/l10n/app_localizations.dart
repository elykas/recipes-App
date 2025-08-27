import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_en.dart';
import 'app_localizations_es.dart';
import 'app_localizations_pt.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
    : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
        delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('en'),
    Locale('es'),
    Locale('pt'),
  ];

  /// The title of the application
  ///
  /// In en, this message translates to:
  /// **'foodVibe'**
  String get appTitle;

  /// A brief description of the application
  ///
  /// In en, this message translates to:
  /// **'Discover and share your food experiences with foodVibe. Connect with food lovers, explore new recipes, and enjoy a vibrant community of culinary enthusiasts.'**
  String get appDescription;

  /// Text displayed during the onboarding process
  ///
  /// In en, this message translates to:
  /// **'Explore, Share, and Connect Around Food'**
  String get onboardingText;

  /// Instruction to swipe up for login
  ///
  /// In en, this message translates to:
  /// **'Swipe up to login'**
  String get swipeUpToLogin;

  /// Login button text
  ///
  /// In en, this message translates to:
  /// **'Continue'**
  String get loginButton;

  /// Welcome message for login screen
  ///
  /// In en, this message translates to:
  /// **'Let’s get started'**
  String get loginWelcome;

  /// Description text for login screen
  ///
  /// In en, this message translates to:
  /// **'Sign in to discover recipes and connect with food lovers'**
  String get loginDescription;

  /// Email input label
  ///
  /// In en, this message translates to:
  /// **'Email Address'**
  String get emailLabel;

  /// Loading indicator text
  ///
  /// In en, this message translates to:
  /// **'Loading...'**
  String get loading;

  /// Success message for email sent
  ///
  /// In en, this message translates to:
  /// **'Email sent successfully, check your inbox.'**
  String get emailSent;

  /// Error message for invalid email input
  ///
  /// In en, this message translates to:
  /// **'Invalid email format'**
  String get invalidEmailInput;

  /// Or text
  ///
  /// In en, this message translates to:
  /// **'or'**
  String get loginOr;

  /// Error message for invalid login
  ///
  /// In en, this message translates to:
  /// **'Login failed. Please try again.'**
  String get loginFailed;

  /// Button text to resend email
  ///
  /// In en, this message translates to:
  /// **'Resend Email'**
  String get resendEmailButton;

  /// Text to go back to login
  ///
  /// In en, this message translates to:
  /// **'Back to login'**
  String get backToLogin;

  /// Countdown for resending email link
  ///
  /// In en, this message translates to:
  /// **'Resend in {seconds} sec'**
  String resendInSeconds(Object seconds);

  /// Message for expired link
  ///
  /// In en, this message translates to:
  /// **'The link has expired. Please request a new one.'**
  String get expiredLink;

  /// Message for new email sent
  ///
  /// In en, this message translates to:
  /// **'A new email has been sent. Please check your inbox.'**
  String get newEmailSent;

  /// Login with Google button text
  ///
  /// In en, this message translates to:
  /// **'Continue with Google'**
  String get loginWithGoogleButton;

  /// Username input label
  ///
  /// In en, this message translates to:
  /// **'Username'**
  String get usernameLabel;

  /// Error message for invalid username
  ///
  /// In en, this message translates to:
  /// **'Invalid username'**
  String get invalidUsername;

  /// Error message for taken username
  ///
  /// In en, this message translates to:
  /// **'Username is already taken'**
  String get takenUsername;

  /// Checking username message
  ///
  /// In en, this message translates to:
  /// **'Checking...'**
  String get checkingUsername;

  /// Username available message
  ///
  /// In en, this message translates to:
  /// **'Username is available'**
  String get usernameAvailable;

  /// Error message for required username
  ///
  /// In en, this message translates to:
  /// **'Username is required'**
  String get usernameIsRequired;

  /// Register label
  ///
  /// In en, this message translates to:
  /// **'Register'**
  String get registerLabel;

  /// Full name input label
  ///
  /// In en, this message translates to:
  /// **'Full Name'**
  String get fullNameLabel;

  /// Error message for invalid full name
  ///
  /// In en, this message translates to:
  /// **'Full name must be 2–50 letters only'**
  String get invalidFullName;

  /// Pick date label
  ///
  /// In en, this message translates to:
  /// **'Pick date'**
  String get pickDateLabel;

  /// Birth date label
  ///
  /// In en, this message translates to:
  /// **'birthdate(optional)'**
  String get birthDateLabel;

  /// Headline label
  ///
  /// In en, this message translates to:
  /// **'Headline (optional)'**
  String get headLineLabel;

  /// Error message for invalid headline
  ///
  /// In en, this message translates to:
  /// **'Headline must be 2–100 letters only'**
  String get invalidHeadLine;

  /// Register button text
  ///
  /// In en, this message translates to:
  /// **'Register'**
  String get registerButton;

  /// Error message for failed registration
  ///
  /// In en, this message translates to:
  /// **'Registration failed. Please try again.'**
  String get registerFailed;

  /// Success message for successful registration
  ///
  /// In en, this message translates to:
  /// **'Registration complete'**
  String get registerSuccess;

  /// Text for agreeing to terms and conditions
  ///
  /// In en, this message translates to:
  /// **'I agree to the Terms of Service and Privacy Policy'**
  String get agreeToTerms;

  /// Text for terms of service and privacy policy
  ///
  /// In en, this message translates to:
  /// **'Terms of Service & Privacy Policy'**
  String get termsAndPolicyText;

  /// Text to close the terms and policy modal
  ///
  /// In en, this message translates to:
  /// **'Close'**
  String get close;

  /// Create post label
  ///
  /// In en, this message translates to:
  /// **'Create Post'**
  String get createPostLabel;

  /// Submit post button text
  ///
  /// In en, this message translates to:
  /// **'Submit Post'**
  String get submitPost;

  /// Error message for failed post creation
  ///
  /// In en, this message translates to:
  /// **'Post creation failed. Please try again.'**
  String get createPostFailed;

  /// Camera button text
  ///
  /// In en, this message translates to:
  /// **'Camera'**
  String get camera;

  /// Gallery button text
  ///
  /// In en, this message translates to:
  /// **'Gallery'**
  String get gallery;

  /// Post content label
  ///
  /// In en, this message translates to:
  /// **'Content'**
  String get contentLabel;

  /// Success message for successful post creation
  ///
  /// In en, this message translates to:
  /// **'Post created successfully'**
  String get createPostSuccess;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['en', 'es', 'pt'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'en':
      return AppLocalizationsEn();
    case 'es':
      return AppLocalizationsEs();
    case 'pt':
      return AppLocalizationsPt();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
