import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/feed_model.dart';
import '../data/feed_repository.dart';
import '../providers/feed_providers.dart';

final feedControllerProvider =
    StateNotifierProvider<FeedController, List<FeedPost>>((ref) {
      final repo = ref.watch(feedRepositoryProvider);
      return FeedController(repo);
    });

class FeedController extends StateNotifier<List<FeedPost>> {
  final FeedRepository _feedRepository;

  String? _cursor;
  List<String> _excludeIds = [];
  bool _isFetching = false;
  Timer? _debounce;

  FeedController(this._feedRepository) : super([]);

  Future<void> fetchFeed({int limit = 5}) async {
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

  Future<void> fetchMore({int limit = 5}) async {
    if (_debounce?.isActive ?? false) _debounce!.cancel();
    final completer = Completer<void>();

    _debounce = Timer(const Duration(milliseconds: 300), () async {
      try {
        await fetchFeed(limit: limit);
        completer.complete();
      } catch (e) {
        completer.completeError(e);
      }
    });

    return completer.future;
  }

  void reset() {
    _cursor = null;
    _excludeIds = [];
    state = [];
  }
}
