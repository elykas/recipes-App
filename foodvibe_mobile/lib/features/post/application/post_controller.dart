import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/post/data/post_repository.dart';
import 'package:foodvibe_mobile/features/post/data/post_model.dart';
import 'package:foodvibe_mobile/providers/dio_provider.dart';

final postRepositoryProvider = Provider<PostRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return PostRepository(dio);
});

final postControllerProvider = StateNotifierProvider<PostController, AsyncValue<List<CreatePostResponse>>>(
  (ref) {
    final repo = ref.watch(postRepositoryProvider); 
    return PostController(repo);
  },
);

class PostController extends StateNotifier<AsyncValue<List<CreatePostResponse>>> {
  final PostRepository _postRepository;

  PostController(this._postRepository) : super(const AsyncValue.data([]));

  Future<void> createPost(Post postData) async {
    state = const AsyncValue.loading();
    try {
      final post = await _postRepository.createPost(postData);
      state = AsyncValue.data([...state.value ?? [], post]);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  Future<void> deletePost(String postId) async {
    state = const AsyncValue.loading();
    try {
      await _postRepository.deletePost(postId);

    final currentPosts = state.value ?? [];
    final updatedPosts = currentPosts.where((p) => p.Id != postId).toList();
    state = AsyncValue.data(updatedPosts);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }
}

