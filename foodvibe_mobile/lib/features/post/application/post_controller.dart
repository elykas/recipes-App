import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/auth/application/auth_controller.dart';
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
    return PostController(repo, ref);
  },
);

class PostController extends StateNotifier<AsyncValue<List<CreatePostResponse>>> {
  final PostRepository _postRepository;
  final Ref ref;

  PostController(this._postRepository, this.ref) : super(const AsyncValue.data([]));

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
    final response =  await _postRepository.deletePost(postId);

    final responsePostId = response.postId;

    final currentPosts = state.value ?? [];
    final updatedPosts = currentPosts.where((p) => p.Id != responsePostId).toList();

    ref.read(authControllerProvider.notifier).updateDeletedPost(responsePostId);
    ref.read(authControllerProvider.notifier).updateDeletedPost(responsePostId);

    state = AsyncValue.data(updatedPosts);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }
}

