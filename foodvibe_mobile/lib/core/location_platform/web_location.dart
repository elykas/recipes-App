export 'web_location_stub.dart'
    if (dart.library.html) 'web_location_web.dart';

abstract class WebLocation {
  static String? get href => getHref();
}