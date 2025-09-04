import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:path_provider/path_provider.dart';

class ImagePickerHelper {
  static Future<File?> pickImage({required bool fromCamera}) async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(
      source: fromCamera ? ImageSource.camera : ImageSource.gallery,
      maxWidth: 800,
      maxHeight: 800,
    );

    if (pickedFile != null) {
      final directory = await getApplicationDocumentsDirectory();
      final newPath =
      '${directory.path}/${DateTime.now().millisecondsSinceEpoch}.jpg';
  final imageFile = await File(pickedFile.path).copy(newPath);

  return imageFile;
    }

    return null;
  }
}
