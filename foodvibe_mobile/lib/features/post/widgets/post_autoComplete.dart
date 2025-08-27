import 'package:flutter/material.dart';

class PostAutoCompleteField extends StatelessWidget {
  final TextEditingController controller;
  const PostAutoCompleteField({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    final suggestions = ["Food", "Travel", "Music", "Tech"];

    return Autocomplete<String>(
      optionsBuilder: (TextEditingValue value) {
        if (value.text.isEmpty) return const Iterable<String>.empty();
        return suggestions.where(
          (s) => s.toLowerCase().contains(value.text.toLowerCase()),
        );
      },
      onSelected: (s) => controller.text = s,
      fieldViewBuilder: (context, textEditingController, focusNode, onFieldSubmitted) {
        return TextField(
          controller: controller,
          focusNode: focusNode,
          decoration: const InputDecoration(
            labelText: "Tags",
            border: OutlineInputBorder(),
          ),
        );
      },
    );
  }
}
