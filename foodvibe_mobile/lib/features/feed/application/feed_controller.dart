import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/feed_repository.dart';
import '../data/feed_model.dart';

final feedControllerProvider =
    StateNotifierProvider<FeedController, List<Post>>(
  (ref) => FeedController(ref.read(feedRepositoryProvider)),
);

final feedRepositoryProvider = Provider<FeedRepository>((ref) => FeedRepository());

class FeedController extends StateNotifier<List<Post>> {
  final FeedRepository _feedRepository;

  String? _cursor;
  List<String> _excludeIds = [];
  bool _isFetching = false;
  Timer? _debounce;

  FeedController(this._feedRepository) : super([]);

  Future<void> fetchFeed({int limit = 20}) async {
    if (_isFetching) return;
    _isFetching = true;

    final feedResponse = await _feedRepository.getFeed(
      limit: limit,
      cursor: _cursor,
      excludeIds: _excludeIds,
    );

    state = [...state, ...feedResponse.posts];
    _cursor = feedResponse.cursor;
    _excludeIds = feedResponse.excludeIds;

    _isFetching = false;
  }

  Future<void> fetchMore({int limit = 20}) async {
  if (_debounce?.isActive ?? false) _debounce!.cancel();
  _debounce = Timer(const Duration(milliseconds: 300), () {
    fetchFeed(limit: limit);
  });
}

  void reset() {
    _cursor = null;
    _excludeIds = [];
    state = [];
  }
}
