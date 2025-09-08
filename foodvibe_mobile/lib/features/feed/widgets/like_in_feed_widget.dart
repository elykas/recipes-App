import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/feed/application/feed_controller.dart';
import 'package:foodvibe_mobile/features/feed/data/feed_model.dart';

class LikeInFeedButton extends ConsumerWidget {
  final FeedPost post;

  const LikeInFeedButton({super.key, required this.post});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = ref.read(feedControllerProvider.notifier);
    final isLiked = post.isUserLiked;

    return Row(
      children: [
        IconButton(
          icon: Icon(
            isLiked ? Icons.favorite : Icons.favorite_border,
            color: isLiked ? Colors.red : Colors.grey,
          ),
          onPressed: () => controller.toggleLike(post: post),
        ),
        Text(
          '${post.likeCount ?? 0} likes',
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
      ],
    );
  }
}
