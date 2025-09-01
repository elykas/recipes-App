import 'package:foodvibe_mobile/core/constants/app_constans.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseManager {
  static final SupabaseClient _client = Supabase.instance.client;

  Future<String?> getSignedImageUrl(String bucket, String path, int expirationDays) async {
  final res = await _client.storage
      .from(bucket)
      .createSignedUrl(path, expirationDays); // URL valid for 60 seconds
  return res;
}

  static SupabaseClient get client => _client;
}
