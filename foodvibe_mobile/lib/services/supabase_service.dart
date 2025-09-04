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
      print(bucket);
      print(path);
      final res = await _client.storage
          .from('foodvibe')
          .createSignedUrl("post/604d5c1d-eedf-4d25-a868-94356475a6f3/bb8fa0bf-d25c-452d-ba02-43cbe0235e85.jpeg", expirationDays); 
      print("res[$path]: isssssssssssss $res");
      return res;
    } catch (e) {
      print("error storage: on supa $e");
    }
    return null;
  }

}
