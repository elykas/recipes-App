import 'package:flutter/material.dart';
import 'routes/app_router.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import './l10n/app_localizations.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: appRouter,
      title: 'My App',
      theme: ThemeData(primarySwatch: Colors.blue),

       localizationsDelegates: const [
        AppLocalizations.delegate, // קבצי התרגום שהופקו (ARB)
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: AppLocalizations.supportedLocales, // השפות הנתמכות מה-ARB
    );
  }
}
   