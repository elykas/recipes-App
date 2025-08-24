import 'package:flutter/material.dart';

// Create a new widget for the OR with lines effect
class OrWithLines extends StatelessWidget {
  final String text;

  // Constructor that accepts the text to display (e.g., "OR")
  const OrWithLines({Key? key, required this.text}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Container(
            height: 1,
            color: const Color(0xFFE9E9F4), 
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8.0),
          child: Text(
            text,
            style: const TextStyle(
              color: Color(0xFF777792),
              fontFamily: "Inter",
              fontWeight: FontWeight.w400,
              fontSize: 14,
              height: 1.42,
              fontStyle: FontStyle.normal,
            ),
          ),
        ),
        Expanded(
          child: Container(
            height: 1,
            color: const Color(0xFFE9E9F4), // Line color
          ),
        ),
      ],
    );
  }
}
