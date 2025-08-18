class Validators {
  static bool _validateField(
    String value, {
    int? minLength,
    int? maxLength,
    String? pattern,
    bool allowEmpty = false,
  }) {
    final trimmed = value.trim();

    if (!allowEmpty && trimmed.isEmpty) return false;
    if (minLength != null && trimmed.length < minLength) return false;
    if (maxLength != null && trimmed.length > maxLength) return false;
    if (pattern != null && !RegExp(pattern).hasMatch(trimmed)) return false;

    return true;
  }

  static bool validateUsername(String username) =>
      _validateField(
        username,
        minLength: 3,
        maxLength: 20,
        pattern: r'^[a-zA-Z0-9_]+$',
      );

  static bool validateFullName(String fullName) =>
      _validateField(
        fullName,
        minLength: 2,
        maxLength: 30,
        pattern: r'^[a-zA-Z\s]+$',
      );

  static bool validateHeadline(String headline) =>
      _validateField(
        headline,
        maxLength: 40,
        allowEmpty: true,
      );
}
