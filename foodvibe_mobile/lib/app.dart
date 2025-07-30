import 'package:flutter/material.dart';
import 'routes/app_router.dart';
import 'package:go_router/go_router.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: appRouter,
      title: 'My App',
      theme: ThemeData(primarySwatch: Colors.blue),
    );
  }
}
