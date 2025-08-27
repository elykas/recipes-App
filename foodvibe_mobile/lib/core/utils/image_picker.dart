import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';

class ImagePickerHelper {
  static Future<File?> pickImage({required bool fromCamera}) async {
    if (fromCamera) {
      final status = await Permission.camera.request();
      if (!status.isGranted) return null;
    } else {
      final status = await Permission.photos.request();
      if (!status.isGranted) return null;
    }

    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(
      source: fromCamera ? ImageSource.camera : ImageSource.gallery,
      maxWidth: 800,
      maxHeight: 800,
    );

    if (pickedFile != null) {
      return File(pickedFile.path);
    }
    return null;
  }
}
