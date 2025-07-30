import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseManager {
  static final SupabaseClient _client = Supabase.instance.client;

  static SupabaseClient get client => _client;
}
