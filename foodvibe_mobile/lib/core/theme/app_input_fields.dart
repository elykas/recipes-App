import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_shapes.dart';

class AppTextFieldStyles {
  static const defaultBorder = OutlineInputBorder(
    borderRadius: AppShapes.borderRadiusMediumTop16Bottom12,
    borderSide: BorderSide.none,
  );

  static const focusedBorder = OutlineInputBorder(
    borderRadius: AppShapes.borderRadiusMediumTop16Bottom12,
    borderSide: BorderSide(color: AppColors.grey, width: 1),
  );

  static const errorBorder = OutlineInputBorder(
    borderRadius: AppShapes.borderRadiusMediumTop16Bottom12,
    borderSide: BorderSide(color: AppColors.error, width: 1),
  );

  static const disabledBorder = OutlineInputBorder(
    borderRadius: AppShapes.borderRadiusMediumTop16Bottom12,
    borderSide: BorderSide(color: AppColors.grey, width: 1),
  );
}
