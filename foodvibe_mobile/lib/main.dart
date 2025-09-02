// main.dart
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:foodvibe_mobile/services/deeplink_service.dart';
import 'package:foodvibe_mobile/core/network/dio_client.dart';

import 'app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  
  await Supabase.initialize(
    url: dotenv.env['SUPABASE_URL'] ?? "",
    anonKey: dotenv.env['SUPABASE_KEY'] ?? "",
  );
 
  await DioClient.getInstance();
 
  final container = ProviderContainer();
  container.read(deepLinkServiceProvider).init();

  runApp(UncontrolledProviderScope(container: container, child: const MyApp()));
}