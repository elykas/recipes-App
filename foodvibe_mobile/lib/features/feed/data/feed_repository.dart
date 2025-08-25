import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:foodvibe_mobile/core/constants/app_constans.dart';
import 'package:foodvibe_mobile/core/network/dio_client.dart';
import 'package:foodvibe_mobile/features/feed/data/feed_model.dart';
import 'package:foodvibe_mobile/services/supabase_service.dart';

class FeedRepository {
  final Dio _dio;

  FeedRepository([Dio? dio]) : _dio = dio ?? DioClient().dio;

  /// מחזיר רשימת פוסטים + cursor
  Future<FeedResponse> getFeed({
    int limit = 20,
    String? cursor,
    List<String>? excludeIds,
  }) async {
    final uri = dotenv.env['GRAPHQL_URL'];

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

    final posts = (feedData['data'] as List).map((json) {
      final post = Post.fromJson(json);

      final imageUrl = post.imageUrl != null
          ? SupabaseManager().getPublicImageUrl(
              "${AppConstants.bucketName}/${StorageFolders.post}",
              post.imageUrl!,
            )
          : null;

      final authorImageUrl = post.author?.imageUrl != null
          ? SupabaseManager().getPublicImageUrl(
              "${AppConstants.bucketName}/${StorageFolders.user}",
              post.author!.imageUrl!,
            )
          : null;

      return post.copyWith(
        imageUrl: imageUrl,
        author: post.author?.copyWith(imageUrl: authorImageUrl),
      );
    }).toList();

    final nextCursor = feedData['cursor'] as String?;
    final updatedExcludeIds = (feedData['excludeIds'] as List<dynamic>?)
        ?.map((e) => e.toString())
        .toList();

    return FeedResponse(
      posts: posts,
      cursor: nextCursor,
      excludeIds: updatedExcludeIds ?? [],
    );
  }
}
