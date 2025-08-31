import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:foodvibe_mobile/core/network/dio_client.dart';
import 'package:foodvibe_mobile/features/post/data/post_repository.dart';

final dioClientProvider = FutureProvider<DioClient>((ref) async {
  return await DioClient.getInstance();
});

final postRepositoryProvider = Provider<PostRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider).maybeWhen(
    data: (value) => value,
    orElse: () => throw Exception("DioClient לא נטען עדיין"),
  );

  return PostRepository(dioClient.dio);
});
