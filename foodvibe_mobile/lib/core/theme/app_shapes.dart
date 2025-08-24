import 'package:flutter/material.dart';

class AppShapes {
  static const borderRadiusVerySmall = BorderRadius.all(Radius.circular(2));
  static const borderRadiusSmall = BorderRadius.all(Radius.circular(8));
  static const borderRadiusMedium = BorderRadius.all(Radius.circular(16));
  static const borderRadiusLarge = BorderRadius.all(Radius.circular(24));
  static const borderRadiusMediumTop16Bottom12 = BorderRadius.only(
    topLeft: Radius.circular(16),
    topRight: Radius.circular(16),
    bottomLeft: Radius.circular(12),
    bottomRight: Radius.circular(12),
  );

  static const roundedRectangleShapeSmall = RoundedRectangleBorder(
    borderRadius: BorderRadius.all(Radius.circular(8)),
  );



  static const roundedRectangleShapeMedium = RoundedRectangleBorder(
    borderRadius: BorderRadius.all(Radius.circular(16)),
  );



  static const verticalTopRounded = BorderRadius.vertical(
    top: Radius.circular(40),
  );

  static const circleShape = CircleBorder();
}
