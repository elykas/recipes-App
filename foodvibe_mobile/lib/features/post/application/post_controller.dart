import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/post/data/post_model.dart';
import 'package:foodvibe_mobile/features/post/data/post_repository.dart';

/// Provider ל-Repository
final postRepositoryProvider = Provider<PostRepository>((ref) {
  return PostRepository();
});

/// Provider ל-Controller
final postControllerProvider =
    StateNotifierProvider<PostController, List<CreatePostResponse>>((ref) {
  final repo = ref.read(postRepositoryProvider);
  return PostController(repo);
});

/// Controller שמנהל את רשימת הפוסטים
class PostController extends StateNotifier<List<CreatePostResponse>> {
  final PostRepository _postRepository;

  PostController(this._postRepository) : super([]);

  Future<void> createPost(Post postData) async {
      final postId = await _postRepository.createPost(postData);
      state = [...state, postId]; 
  }
}
