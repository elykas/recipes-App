import 'dart:html' as html;
import 'dart:async';
import 'image_picker_helper.dart';

Future<String?> _pickImage({required bool fromCamera}) async {
  final input = html.FileUploadInputElement()..accept = 'image/*';
  input.click();

  final completer = Completer<String?>();
  input.onChange.listen((e) {
    final file = input.files?.first;
    if (file != null) {
      final reader = html.FileReader();
      reader.readAsDataUrl(file);
      reader.onLoadEnd.listen((event) {
        completer.complete(reader.result as String?);
      });
    } else {
      completer.complete(null);
    }
  });

  return completer.future;
}

void initImagePickerWeb() {
  ImagePickerHelper.pickImage = _pickImage;
}
