import 'package:flutter/material.dart';
import 'app_colors.dart';

class AppTextStyles {
  static const title = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 32,
    fontWeight: FontWeight.w700,
    height: 1.25,
    color: AppColors.lightText,
  );

  static const subtitle = TextStyle(
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: FontWeight.w500,
    height: 1.33,
    color: AppColors.lightText,
  );

  static const body = TextStyle(
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.5,
    color: AppColors.darkText,
  );

  static const button = TextStyle(
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.5,
    color: AppColors.lightText,
  );
}
