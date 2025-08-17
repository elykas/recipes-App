class VerifyTokenResponse {
  final String publicId;
  final String email;
  final bool exist;
  final String message;

  VerifyTokenResponse({
    required this.publicId,
    required this.email,
    required this.exist,
    required this.message,
  });

  factory VerifyTokenResponse.fromJson(Map<String, dynamic> json) {
    final data = json['data'] ?? {};
    return VerifyTokenResponse(
      publicId: data['publicId'] ?? '',
      email: data['email'] ?? '',
      exist: json['exist'] ?? false,
      message: json['message'] ?? '',
    );
  }
}

class UserRegisterDetails {
  final String email;
  final String username;
  final String? fullName;
  final String? headLine;
  final DateTime? birthDate;
  final String? locale;
  final bool agreedToPolicy;
  final DateTime? agreedToPolicyDate;
  final String? agreedToPolicyVersion;


  UserRegisterDetails({
    required this.email,
    required this.username,
    this.fullName,
    this.headLine,
    this.birthDate,
    this.locale,
    this.agreedToPolicy = false,
    this.agreedToPolicyDate,
    this.agreedToPolicyVersion
  });

 Map<String, dynamic> toJson() {
  final map = <String, dynamic>{
    'email': email,
    'username': username,
    'agreedToPolicy': agreedToPolicy,
  };

  if (fullName != null) map['fullName'] = fullName;
  if (headLine != null) map['headLine'] = headLine;
  if (birthDate != null) map['birthDate'] = birthDate!.toIso8601String();
  if (locale != null) map['locale'] = locale;
  if (agreedToPolicyDate != null) map['agreedAt'] = agreedToPolicyDate!.toIso8601String();
  if (agreedToPolicyVersion != null) map['agreedToPolicyVersion'] = agreedToPolicyVersion;

  return map;
}
}
