import 'package:flutter/material.dart';
import 'dart:io';
import 'package:foodvibe_mobile/core/utils/image_picker.dart';
import 'package:foodvibe_mobile/l10n/app_localizations.dart';

class PostImagePicker extends StatefulWidget {
  final void Function(String path) onImagePicked;
  const PostImagePicker({super.key, required this.onImagePicked});

  @override
  State<PostImagePicker> createState() => _PostImagePickerState();
}

class _PostImagePickerState extends State<PostImagePicker> {
  File? _pickedFile;

  Future<void> _pickImage(BuildContext context) async {
    final loc = AppLocalizations.of(context)!;
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
      setState(() => _pickedFile = file); // update state
      widget.onImagePicked(file.path);
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
        child: _pickedFile == null
            ? const Icon(Icons.add_a_photo, size: 50)
            : Image.file(
                _pickedFile!,
                fit: BoxFit.cover,
                width: double.infinity,
              ),
      ),
    );
  }
}
