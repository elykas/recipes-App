import 'package:flutter/material.dart';
import 'package:foodvibe_mobile/l10n/app_localizations.dart';


class PostContentField extends StatelessWidget {
  final TextEditingController controller;
  const PostContentField({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return TextField(
      controller: controller,
      maxLines: 3,
      decoration: InputDecoration(
        labelText: loc.contentLabel,
        border: OutlineInputBorder(),
      ),
    );
  }
}
