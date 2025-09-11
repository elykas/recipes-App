import 'dart:io';
import 'package:dio/dio.dart';
import 'package:foodvibe_mobile/features/post/data/post_model.dart';
import 'package:http_parser/http_parser.dart';


class PostRepository {
  final Dio _dio;

  PostRepository(this._dio);

  Future<CreatePostResponse> createPost(Post post) async {
    final path = '/posts';

   final file = File(post.imageUrl);
    final ext = file.path.split('.').last.toLowerCase();
    final mime = (ext == 'png') ? 'png' : 'jpeg';

    final formData = FormData.fromMap({
      'content': post.content,
      'recipePublicId': post.recipeId,
      'image': await MultipartFile.fromFile(
        file.path,
        filename: file.uri.pathSegments.last,
        contentType: MediaType('image', mime), 
      ),
    });

    final response = await _dio.post(path, data: formData);

    return CreatePostResponse.fromJson(response.data['data']);
  }

  Future<dynamic> deletePost(String postId) async {
    final path = '/posts/$postId';
    final response = await _dio.delete(path);
    return DeletePostResponse.fromJson(response.data['data']);
  }
}
