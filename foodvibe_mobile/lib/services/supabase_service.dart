import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseManager {
  static final SupabaseClient _client = Supabase.instance.client;

  static SupabaseClient get client => _client;

  Future<String?> getSignedImageUrl(
    String bucket,
    String path,
    int expirationDays,
  ) async {
    try {
      final res = _client.storage.from(bucket).getPublicUrl(path);
      return res;
    } catch (e) {
      return null;
    }
  }
}
