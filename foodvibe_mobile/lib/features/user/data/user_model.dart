// user_model.dart
import 'package:foodvibe_mobile/core/constants/app_constans.dart';
import 'package:foodvibe_mobile/features/feed/data/feed_model.dart';
import 'package:foodvibe_mobile/services/supabase_service.dart';

class User {
  final String publicId;
  final String username;
  final String? fullName;
  final String? imageUrl;
  final String? email;
  final String? bio;
  final String? headLine;
  final String? locale;
  final bool isAdmin;
  final List<FeedPost>? posts;

  User.Profile({
    required this.publicId,
    required this.username,
    this.fullName,
    this.imageUrl,
    this.email,
    this.bio,
    this.headLine,
    this.locale,
    required this.isAdmin,
    this.posts,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    final posts = (json['posts'] as List<dynamic>?)
        ?.map((p) => FeedPost.fromJson(p as Map<String, dynamic>))
        .toList();

    final imageUrl = json['imageUrl'] != null
        ? SupabaseManager().getPublicImageUrl(
            "${AppConstants.bucketName}/${StorageFolders.user}",
            json['imageUrl'],
          )
        : null;

    final updatedPosts = posts?.map((post) {
      final postImage = post.imageUrl != null
          ? SupabaseManager().getPublicImageUrl(
              "${AppConstants.bucketName}/${StorageFolders.post}",
              post.imageUrl!,
            )
          : null;

      final authorImage = post.author?.imageUrl != null
          ? SupabaseManager().getPublicImageUrl(
              "${AppConstants.bucketName}/${StorageFolders.user}",
              post.author!.imageUrl!,
            )
          : null;

      return post.copyWith(
        imageUrl: postImage,
        author: post.author?.copyWith(imageUrl: authorImage),
      );
    }).toList();

    return User.Profile(
      publicId: json['publicId'],
      username: json['username'],
      fullName: json['fullName'],
      imageUrl: imageUrl,
      email: json['email'],
      bio: json['bio'],
      headLine: json['headLine'],
      locale: json['locale'],
      isAdmin: json['isAdmin'] ?? false,
      posts: updatedPosts,
    );
  }
}
