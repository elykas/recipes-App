import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:foodvibe_mobile/core/constants/app_constans.dart';
import 'package:foodvibe_mobile/features/user/data/user_model.dart';
import 'package:foodvibe_mobile/services/supabase_service.dart';
import 'package:http_parser/http_parser.dart';

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

    final userJson = data['data'];
    if (userJson == null) return null;

    var user = AppUser.fromJson(userJson);

    final signedProfileImage = user.imagePath != null
        ? await SupabaseManager().getSignedImageUrl(
            AppConstants.bucketName,
            user.imagePath!,
            AppConstants.sevenDays,
          )
        : null;
    final signedPosts = user.posts == null
        ? null
        : await Future.wait(
            user.posts!.map((post) async {
              final signedPostImage = post.imageUrl != null
                  ? await SupabaseManager().getSignedImageUrl(
                      AppConstants.bucketName,
                      post.imageUrl!,
                      AppConstants.sevenDays,
                    )
                  : null;

              final signedAuthorImage = post.author.imageUrl != null
                  ? await SupabaseManager().getSignedImageUrl(
                      AppConstants.bucketName,
                      post.author.imageUrl!,
                      AppConstants.sevenDays,
                    )
                  : null;

              return post.copyWith(
                imageUrl: signedPostImage,
                author: post.author.copyWith(imageUrl: signedAuthorImage),
              );
            }),
          );

    return AppUserWithCursor(
      user: user.copyWith(imagePath: signedProfileImage, posts: signedPosts),
      nextCursor: data['nextCursor'],
    );
  }

  Future<dynamic> updateUser(AppUser updatedUser) async {
    final path = '/user';
    final data = updatedUser.toJson();
    final response = await _dio.put(path, data: data);
    return UpdateUserResponse.fromJson(response.data);
  }

  Future<UpdateImageUserResponse> updateUserImage(File imageFile) async {
    final path = '/user/img';

    final ext = imageFile.path.split('.').last.toLowerCase();
    final mime = (ext == 'png') ? 'png' : 'jpeg';

    final formData = FormData.fromMap({
      'image': await MultipartFile.fromFile(
        imageFile.path,
        filename: imageFile.uri.pathSegments.last,
        contentType: MediaType('image', mime),
      ),
    });

    final response = await _dio.post(path, data: formData);

    return await UpdateImageUserResponse.fromJsonWithSignedUrl(
      response.data['data'],
      AppConstants.bucketName,
      AppConstants.sevenDays,
    );
  }

  Future<dynamic> deleteImage() async {
    final path = '/user/remove-img';
    final response = await _dio.put(path);
    return await UpdateImageUserResponse.fromJsonWithSignedUrl(
      response.data['data'],
      AppConstants.bucketName,
      AppConstants.sevenDays,
    );
  }

  Future<dynamic> updateUserLocale(String locale) async {
    final path = '/user/loc/$locale';
    final response = await _dio.put(path);
    return UpdateLocaleUserResponse.fromJson(response.data);
  }
}
