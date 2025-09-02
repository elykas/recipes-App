import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/feed_repository.dart';
import 'package:foodvibe_mobile/providers/dio_provider.dart';

final feedRepositoryProvider = Provider<FeedRepository>((ref)  {
  // מחכים ש־dioProvider יסתיים
  final dio = ref.watch(dioProvider);
  return FeedRepository(dio);
});