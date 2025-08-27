import 'package:flutter/material.dart';
import 'dart:io';
import 'package:foodvibe_mobile/core/utils/image_picker.dart';

class PostImagePicker extends StatelessWidget {
  final void Function(String path) onImagePicked;
  const PostImagePicker({super.key, required this.onImagePicked});

  Future<void> _pickImage(BuildContext context) async {
    final fromCamera = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text(loc.camera),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text(loc.gallery),
          ),
        ],
      ),
    );

    if (fromCamera == null) return;

    final file = await ImagePickerHelper.pickImage(fromCamera: fromCamera);
    if (file != null) {
      onImagePicked(file.path);
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => _pickImage(context),
      child: Container(
        height: 200,
        width: double.infinity,
        color: Colors.grey[300],
        child: const Icon(Icons.add_a_photo, size: 50),
      ),
    );
  }
}