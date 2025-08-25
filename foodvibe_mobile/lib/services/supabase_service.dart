import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseManager {
  static final SupabaseClient _client = Supabase.instance.client;

  String getPublicImageUrl(String bucket, String path) {
    return _client.storage.from(bucket).getPublicUrl(path);
  }

  static SupabaseClient get client => _client;
}
