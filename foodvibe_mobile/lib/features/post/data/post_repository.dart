import 'package:dio/dio.dart';
import 'package:foodvibe_mobile/features/post/data/post_model.dart';


class PostRepository {
  final Dio _dio;

  PostRepository(this._dio);

  Future<CreatePostResponse> createPost(Post post) async {
    final path = '/posts';

    final formData = FormData.fromMap({
      'content': post.content,
      'recipePublicId': post.recipeId,
      'image': await MultipartFile.fromFile(post.imageUrl),
    });

    final response = await _dio.post(path, data: formData);

    return CreatePostResponse.fromJson(response.data['data']);
  }
}
