import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:foodvibe_mobile/core/constants/app_constans.dart';
import 'package:foodvibe_mobile/features/user/data/user_model.dart';

class UserRepository {
  final Dio _dio;

  UserRepository({required Dio dio}) : _dio = dio;

  Future<AppUserWithCursor?> getUserProfile(
    String publicId, {
    int limit = 9,
    String? cursor,
  }) async {
    final uri = dotenv.env['GRAPHQL_URI'] ?? '';

    final query =
        '''
      query GetUserProfile($publicId: String!, $limit: Int, $cursor: String) {
      userProfile(publicId: $publicId, limit: $limit, cursor: $cursor) {
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
        'variables': {'publicId': publicId, 'limit': limit, 'cursor': cursor},
      },
    );

    final data = response.data['data']['userProfile'];

    if (data == null) return null;

    return AppUserWithCursor.fromJson(data);
  }

  Future<dynamic> updateUser(AppUser updatedUser) async {
    final path = '/user';
    final data = updatedUser.toJson();
    final response = await _dio.put(path, data: data);
    return UpdateUserResponse.fromJson(response.data);
  }

  Future<UpdateImageUserResponse> updateUserImage(File imageFile) async {
    final path = '/user/img';

    final fileName = imageFile.path.split('/').last;
    final formData = FormData.fromMap({
      'image': await MultipartFile.fromFile(imageFile.path, filename: fileName),
    });

    final response = await _dio.post(path, data: formData);

    return await UpdateImageUserResponse.fromJsonWithSignedUrl(
      response.data,
      AppConstants.bucketName,
      AppConstants.sevenDays,
    );
  }

  Future<dynamic> deleteImage() async {
    final path = '/user/img';
    final response = await _dio.put(path);
    return await UpdateImageUserResponse.fromJsonWithSignedUrl(
      response.data,
      AppConstants.bucketName,
      AppConstants.sevenDays,
    );
  }
}
