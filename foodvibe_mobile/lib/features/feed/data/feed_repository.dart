import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:foodvibe_mobile/core/constants/app_constans.dart';
import 'package:foodvibe_mobile/features/feed/data/feed_model.dart';
import 'package:foodvibe_mobile/services/supabase_service.dart';

class FeedRepository {
  final Dio _dio;

  FeedRepository(this._dio);

  Future<FeedResponse> getFeed({
    int limit = 5,
    String? cursor,
    List<String>? excludeIds,
  }) async {
    final uri = dotenv.env['GRAPHQL_URI'];

    final query = '''
    query GetFeed(\$limit: Int, \$cursor: String, \$excludeIds: [String!]) {
      getFeed(limit: \$limit, cursor: \$cursor, excludeIds: \$excludeIds) {
        data {
          publicId
          imageUrl
          likeCount
          content
          author {
            publicId
            username
            fullName
            imageUrl
            headLine
          }
          recipe {
            publicId
          }
        }
        cursor
        excludeIds
        success
        message
      }
    }
  ''';

    final response = await _dio.post(
      uri!,
      data: {
        'query': query,
        'variables': {
          'limit': limit,
          'cursor': cursor,
          'excludeIds': excludeIds ?? [],
        },
      },
    );

    final feedData = response.data['data']['getFeed'];

    final postsJson = feedData['data'] as List<dynamic>? ?? [];
    final posts = await Future.wait(
      postsJson.map((json) async {
        final post = FeedPost.fromJson(json);

        final imageUrl = post.imageUrl != null
            ? await SupabaseManager().getSignedImageUrl(
                AppConstants.bucketName,
                post.imageUrl!,
                AppConstants.sevenDays,
              )
            : null;
        final authorImageUrl = post.author.imageUrl != null
            ? await SupabaseManager().getSignedImageUrl(
                AppConstants.bucketName,
                post.author.imageUrl!,
                AppConstants.sevenDays,
              )
            : null;

        return post.copyWith(
          imageUrl: imageUrl,
          author: post.author.copyWith(imageUrl: authorImageUrl),
          isUserLiked: json['isUserLiked'] ?? false,
        );
      }).toList(),
    );
    final nextCursor = feedData['cursor'];
    final updatedExcludeIds =
        (feedData['excludeIds'] as List<dynamic>?)
            ?.map((e) => e.toString())
            .toList() ??
        [];

    return FeedResponse(
      posts: posts,
      cursor: nextCursor,
      excludeIds: updatedExcludeIds,
    );
  }

  Future<dynamic> addLikeToPost({required String postId}) async {
    final path = '/posts/like/$postId';
    final response = await _dio.post(path);
    return response.data;
  }

  Future<dynamic> removeLikeFromPost({required String postId}) async {
    final path = '/posts/unlike/$postId';
    final response = await _dio.post(path);
    return response.data;
  }
}
