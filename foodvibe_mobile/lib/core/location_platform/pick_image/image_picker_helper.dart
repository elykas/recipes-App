// רק abstract + conditional export
export 'image_picker_mobile.dart'
    if (dart.library.html) 'image_picker_web.dart';

abstract class ImagePickerHelper {
  /// כאן פונקציה סטטית שפלטפורמה תאתחל
  static late Future<String?> Function({required bool fromCamera}) pickImage;
}
