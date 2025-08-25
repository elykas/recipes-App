import 'package:flutter_dotenv/flutter_dotenv.dart';
class AppConstants {
  static final String policyVersion = dotenv.env['POLICY_VERSION'] ?? "1.0";
 
  static final String bucketName = "foodvibe";


}

class StorageFolders {
  static const post = "post";
  static const user = "user";
  static const recipe = "recipe";
}

