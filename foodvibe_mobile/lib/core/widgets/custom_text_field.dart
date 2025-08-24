import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final String labelText;
  final String? errorText;
  final Color? backgroundColor;
  final double? topLeftRadius;
  final double? topRightRadius;
  final double? bottomLeftRadius;
  final double? bottomRightRadius;
  final Icon? icon;
  final String? hintText;
  final TextStyle? textStyle;

  const CustomTextField({
    required this.controller,
    required this.labelText,
    this.errorText,
    this.backgroundColor,
    this.topLeftRadius, // כל פינה מותאמת אישית
    this.topRightRadius,
    this.bottomLeftRadius,
    this.bottomRightRadius,
    this.icon,
    this.hintText,
    this.textStyle,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      style: textStyle, // סגנון טקסט מותאם אישית
      decoration: InputDecoration(
        labelText: labelText,
        hintText: hintText,
        errorText: errorText,
        icon: icon,
        filled: true,
        fillColor: backgroundColor ?? Colors.transparent,
        border: errorText == null
            ? InputBorder
                  .none // ללא גבול אם אין שגיאה
            : OutlineInputBorder(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(topLeftRadius ?? 8.0),
                  topRight: Radius.circular(topRightRadius ?? 8.0),
                  bottomLeft: Radius.circular(bottomLeftRadius ?? 8.0),
                  bottomRight: Radius.circular(bottomRightRadius ?? 8.0),
                ),
                borderSide: BorderSide(
                  color: Colors.red,
                  width: 2,
                ), // גבול אדום אם יש שגיאה
              ),
        focusedBorder: errorText == null
            ? OutlineInputBorder(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(topLeftRadius ?? 8.0),
                  topRight: Radius.circular(topRightRadius ?? 8.0),
                  bottomLeft: Radius.circular(bottomLeftRadius ?? 8.0),
                  bottomRight: Radius.circular(bottomRightRadius ?? 8.0),
                ),
                borderSide: BorderSide(
                  color: Theme.of(context).primaryColor,
                  width: 2,
                ), // גבול רגיל כאשר ממוקד
              )
            : OutlineInputBorder(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(topLeftRadius ?? 8.0),
                  topRight: Radius.circular(topRightRadius ?? 8.0),
                  bottomLeft: Radius.circular(bottomLeftRadius ?? 8.0),
                  bottomRight: Radius.circular(bottomRightRadius ?? 8.0),
                ),
                borderSide: BorderSide(
                  color: Colors.red,
                  width: 1,
                ), // גבול אדום גם כשיש שגיאה
              ),
        enabledBorder: errorText == null
            ? OutlineInputBorder(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(topLeftRadius ?? 8.0),
                  topRight: Radius.circular(topRightRadius ?? 8.0),
                  bottomLeft: Radius.circular(bottomLeftRadius ?? 8.0),
                  bottomRight: Radius.circular(bottomRightRadius ?? 8.0),
                ),
                borderSide: BorderSide(
                  color: Colors.grey,
                  width: 1,
                ), // גבול רגיל במצב פעיל
              )
            : OutlineInputBorder(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(topLeftRadius ?? 8.0),
                  topRight: Radius.circular(topRightRadius ?? 8.0),
                  bottomLeft: Radius.circular(bottomLeftRadius ?? 8.0),
                  bottomRight: Radius.circular(bottomRightRadius ?? 8.0),
                ),
                borderSide: BorderSide(
                  color: Colors.red,
                  width: 2,
                ), // גבול אדום גם אם פעיל ויש שגיאה
              ),
      ),
    );
  }
}
