import 'package:flutter_dotenv/flutter_dotenv.dart';
class AppConstants {
  static final String policyVersion = dotenv.env['POLICY_VERSION'] ?? "1.0";
}
