import 'package:flutter/material.dart';

class AppColors {
  static const primary = Color(0xFFB95E1F); 
  static const darkText = Color(0xFF1E1E24);
  static const grey = Color(0xFF777792);
  static const lightText = Colors.white;
  static const background = Colors.white;
  static const error = Color(0xFFDB6C6C);

  // אפשר גם להוסיף gradient כקבוע
  static const loginGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [Color.fromRGBO(185, 94, 31, 0.0), Color(0xFFB95E1F)],
    stops: [0.0, 0.92],
  );
}
