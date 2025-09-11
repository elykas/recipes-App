import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/user/application/user_controller.dart';
import 'package:foodvibe_mobile/features/user/widgets/post_delete_widget.dart';

class PostsGrid extends ConsumerWidget {
  final void Function(int index)? onPostTap;
  const PostsGrid({super.key, this.onPostTap});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final posts = ref.watch(userProfileControllerProvider).user?.posts ?? [];

   if (posts.isEmpty) {
      return const Center(child: Text('No posts yet.'));
    }
    
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: posts.length,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
      ),
      itemBuilder: (context, index) {
        final post = posts[index];
        return Stack(
          children: [
            GestureDetector(
              onTap: () => onPostTap?.call(index),
              child: Image.network(
                post.imageUrl ?? '',
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => const Icon(Icons.error),
              ),
            ),
            Positioned(
              top: 4,
              right: 4,
              child: DeletePostButton(postId: post.Id),
            ),
          ],
        );
      },
    );
  }
}
