import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';
import 'package:foodvibe_mobile/features/post/data/post_repository.dart';
import 'package:foodvibe_mobile/core/network/dio_client.dart';

final dioClientProvider = Provider<DioClient>((ref) {
  final instance = DioClient.instance; // use the public getter
  if (instance == null) {
    throw Exception(
      'DioClient not initialized! Make sure to call DioClient.getInstance() in main()',
    );
  }
  return instance;
});

final dioProvider = Provider<Dio>((ref) {
  final dioClient = ref.read(dioClientProvider);
  return dioClient.dio;
});
