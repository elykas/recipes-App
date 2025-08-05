class VerifyTokenResponse {
  final String id;
  final String email;
  final bool exist;
  final String message;

  VerifyTokenResponse({
    required this.id,
    required this.email,
    required this.exist,
    required this.message,
  });

  factory VerifyTokenResponse.fromJson(Map<String, dynamic> json) {
    final data = json['data'] ?? {};
    return VerifyTokenResponse(
      id: data['id'] ?? '',
      email: data['email'] ?? '',
      exist: json['exist'] ?? false,
      message: json['message'] ?? '',
    );
  }
}
