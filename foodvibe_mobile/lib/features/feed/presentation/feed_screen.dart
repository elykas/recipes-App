import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/features/feed/data/feed_model.dart';
import '../application/feed_controller.dart';

class FeedScreen extends ConsumerStatefulWidget {
  const FeedScreen({super.key});

  @override
  ConsumerState<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends ConsumerState<FeedScreen> {
  final ScrollController _scrollController = ScrollController();
  bool _isLoadingMore = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadInitialFeed();

    _scrollController.addListener(() {
      final maxScroll = _scrollController.position.maxScrollExtent;
      final currentScroll = _scrollController.position.pixels;

      if (currentScroll >= maxScroll * 0.8 && !_isLoadingMore) {
        _loadMore();
      }
    });
  }

  Future<void> _loadInitialFeed() async {
    setState(() {
      _error = null;
      _isLoadingMore = true;
    });

    try {
      await ref.read(feedControllerProvider.notifier).fetchFeed();
    } catch (e) {
      _error = e.toString();
    } finally {
      setState(() {
        _isLoadingMore = false;
      });
    }
  }

  Future<void> _loadMore() async {
    setState(() => _isLoadingMore = true);

    try {
      await ref.read(feedControllerProvider.notifier).fetchMore();
    } catch (e) {
      _error = e.toString();
    } finally {
      setState(() => _isLoadingMore = false);
    }
  }

  Future<void> _onRefresh() async {
    setState(() => _isLoadingMore = true);

    ref.read(feedControllerProvider.notifier).reset();

    try {
      await ref.read(feedControllerProvider.notifier).fetchFeed();
    } catch (e) {
      _error = e.toString();
    } finally {
      setState(() => _isLoadingMore = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final feed = ref.watch(feedControllerProvider);

    if (_error != null) {
      return Center(child: Text('Error: $_error'));
    }

    return RefreshIndicator(
      onRefresh: _onRefresh,
      child: ListView.builder(
        controller: _scrollController,
        itemCount: feed.length + (_isLoadingMore ? 1 : 0),
        itemBuilder: (context, index) {
          if (index >= feed.length) {
            return const Padding(
              padding: EdgeInsets.all(16),
              child: Center(child: CircularProgressIndicator()),
            );
          }

          final post = feed[index];
          return FeedItemWidget(post: post);
        },
      ),
    );
  }
}

class FeedItemWidget extends StatelessWidget {
  final Post post;

  const FeedItemWidget({super.key, required this.post});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ListTile(
          leading: post.author?.imageUrl != null
              ? CircleAvatar(backgroundImage: NetworkImage(post.author!.imageUrl!))
              : const CircleAvatar(child: Icon(Icons.person)),
          title: Text(post.author?.username ?? post.author?.fullName ?? 'Unknown'),
        ),

        if (post.imageUrl != null)
          Image.network(
            post.imageUrl!,
            fit: BoxFit.cover,
            width: double.infinity,
            height: 250,
          ),

        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('${post.likeCount ?? 0} likes', style: const TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 4),
              Text(post.content ?? ''),
              const SizedBox(height: 4),
              Row(
                children: [
                  const Icon(Icons.book, size: 16),
                  const SizedBox(width: 4),
                  Text(post.recipe?.publicId ?? ''),
                ],
              ),
            ],
          ),
        ),
        const Divider(),
      ],
    );
  }
}
