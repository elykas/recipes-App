import 'package:flutter/material.dart';
import 'package:foodvibe_mobile/features/feed/data/feed_model.dart';
import 'package:go_router/go_router.dart';

void showPostViewer({
  required BuildContext context,
  required List<FeedPost> posts,
  required int initialIndex,
  required Future<void> Function() onLoadMore,
}) {
  showDialog(
    context: context,
    builder: (_) {
      return Dialog(
        insetPadding: EdgeInsets.zero,
        backgroundColor: Colors.black,
        child: PostViewerPage(
          posts: posts,
          initialIndex: initialIndex,
          onLoadMore: onLoadMore,
        ),
      );
    },
  );
}

class PostViewerPage extends StatefulWidget {
  final List<FeedPost> posts;
  final int initialIndex;
  final Future<void> Function() onLoadMore;

  const PostViewerPage({
    super.key,
    required this.posts,
    required this.initialIndex,
    required this.onLoadMore,
  });

  @override
  State<PostViewerPage> createState() => _PostViewerPageState();
}

class _PostViewerPageState extends State<PostViewerPage> {
  late PageController _controller;

  @override
  void initState() {
    super.initState();
    _controller = PageController(initialPage: widget.initialIndex);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black, 
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            if (context.mounted) context.pop();
          },
        ),
      ),
      body: PageView.builder(
        controller: _controller,
        itemCount: widget.posts.length,
        onPageChanged: (index) async {
          if (index == widget.posts.length - 1) {
            await widget.onLoadMore(); 
          }
        },
        itemBuilder: (context, index) {
          final post = widget.posts[index];
          return InteractiveViewer(
            child: Center(
              child: Image.network(
                post.imageUrl ?? '',
                fit: BoxFit.contain,
                errorBuilder: (_, __, ___) =>
                    const Icon(Icons.error, color: Colors.white),
              ),
            ),
          );
        },
      ),
    );
  }
}