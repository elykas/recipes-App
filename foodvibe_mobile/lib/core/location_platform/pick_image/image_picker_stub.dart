import 'image_picker_helper.dart';

// מימוש stub שמחזיר תמיד null
Future<String?> _pickImage({required bool fromCamera}) async => null;

// אתחול
void initImagePickerStub() {
  ImagePickerHelper.pickImage = _pickImage;
}
