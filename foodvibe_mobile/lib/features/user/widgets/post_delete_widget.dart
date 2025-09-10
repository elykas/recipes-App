import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/post/application/post_controller.dart';
import 'package:go_router/go_router.dart';

class DeletePostButton extends ConsumerWidget {
  final String postId;

  const DeletePostButton({super.key, required this.postId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () async {
        final confirmed = await showDialog<bool>(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Delete Post'),
            content: const Text('Are you sure you want to delete this post?'),
            actions: [
              TextButton(
                onPressed: () => context.pop(false), 
                child: const Text('Cancel'),
              ),
              TextButton(
                onPressed: () => context.pop(true), 
                child: const Text('Delete'),
              ),
            ],
          ),
        );
        if (confirmed == true) {
          ref.read(postControllerProvider.notifier).deletePost(postId);
        }
      },
      child: Container(
        decoration: const BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.black54,
        ),
        padding: const EdgeInsets.all(4),
        child: const Icon(
          Icons.close,
          size: 18,
          color: Colors.white,
        ),
      ),
    );
  }
}
