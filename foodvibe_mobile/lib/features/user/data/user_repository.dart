import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:foodvibe_mobile/features/user/data/user_model.dart';

class UserRepository {
  final Dio _dio;

  UserRepository({required Dio dio}) : _dio = dio;

  Future<AppUser?> getUserProfile(String publicId, {int limit = 5}) async {
    final uri = dotenv.env['GRAPHQL_URI'] ?? '';

    final query = '''
      query GetUserProfile($publicId: String!, $limit: Int) {
      userProfile(publicId: $publicId, limit: $limit) {
      publicId
      username
      fullName
      imageUrl
      email
      bio
      headLine
      locale
      isAdmin
      posts {
        publicId
        likes
        recipePublicId
        imageUrl
      }
    }
  }
''';

    final response = await _dio.post(
      uri,
      data: {
        'query': query,
        'variables': {'publicId': publicId, 'limit': limit},
      },
    );

    final data = response.data['data']['userProfile'];

    if (data == null) return null;

    return AppUser.fromJson(data);
  }

  Future<AppUser?> updateUser(AppUser updatedUser) async {
    final uri = 'user/update';
    final limit = 5;
}

}