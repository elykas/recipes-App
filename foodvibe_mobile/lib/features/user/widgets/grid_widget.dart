import 'package:flutter/material.dart';
import 'package:foodvibe_mobile/features/feed/data/feed_model.dart';

class PostsGrid extends StatelessWidget {
  final List<FeedPost> posts;
  final void Function(int index)? onPostTap;

  const PostsGrid({super.key, required this.posts, this.onPostTap});

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: posts.length,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
      ),
      itemBuilder: (context, index) {
        final post = posts[index];
        return GestureDetector(
          onTap: () => onPostTap?.call(index), 
          child: Image.network(
            post.imageUrl ?? '',
            fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => const Icon(Icons.error),
          ),
        );
      },
    );
  }
}
