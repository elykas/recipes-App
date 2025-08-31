import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';
import 'package:foodvibe_mobile/features/post/data/post_repository.dart';
import 'package:foodvibe_mobile/core/network/dio_client.dart';

final dioClientProvider = FutureProvider<DioClient>((ref) async {
  return await DioClient.getInstance();
});

final dioProvider = Provider<Dio>((ref) {
  final dioClient = ref.watch(dioClientProvider).maybeWhen(
    data: (value) => value,
    orElse: () => throw Exception("DioClient עדיין לא נטען"),
  );
  return dioClient.dio;
});

