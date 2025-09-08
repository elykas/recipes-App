import 'package:foodvibe_mobile/core/constants/app_constans.dart';
import 'package:foodvibe_mobile/features/feed/data/feed_model.dart';
import 'package:foodvibe_mobile/services/supabase_service.dart';

class AppUser {
  final String publicId;
  final String username;
  final String? fullName;
  final String? imagePath;
  final String? email;
  final String? bio;
  final String? headLine;
  final String? locale;
  final bool isAdmin;
  final List<FeedPost>? posts;

  AppUser({
    required this.publicId,
    required this.username,
    this.fullName,
    this.imagePath,
    this.email,
    this.bio,
    this.headLine,
    this.locale,
    required this.isAdmin,
    this.posts,
  });

  factory AppUser.fromJson(Map<String, dynamic> json) {
    final posts = (json['posts'] as List<dynamic>?)
        ?.map((p) => FeedPost.fromJson(p as Map<String, dynamic>))
        .toList();

    return AppUser(
      publicId: json['publicId'],
      username: json['username'],
      fullName: json['fullName'],
      imagePath: json['imageUrl'],
      email: json['email'],
      bio: json['bio'],
      headLine: json['headLine'],
      locale: json['locale'],
      isAdmin: json['isAdmin'] ?? false,
      posts: posts,
    );
  }

  Future<String?> getSignedImageUrl() async {
    if (imagePath == null) return null;
    return SupabaseManager().getSignedImageUrl(
      AppConstants.bucketName,
      imagePath!,
      AppConstants.sevenDays,
    );
  }

  Future<List<FeedPost>?> getSignedPosts() async {
    if (posts == null) return null;

    return Future.wait(
      posts!.map((post) async {
        final signedPostImage = post.imageUrl != null
            ? await SupabaseManager().getSignedImageUrl(
                AppConstants.bucketName,
                post.imageUrl!,
                AppConstants.sevenDays,
              )
            : null;

        final signedAuthorImage = post.author.imageUrl != null
            ? await SupabaseManager().getSignedImageUrl(
                AppConstants.bucketName,
                post.author.imageUrl!,
                AppConstants.sevenDays,
              )
            : null;

        return post.copyWith(
          imageUrl: signedPostImage,
          author: post.author.copyWith(imageUrl: signedAuthorImage),
        );
      }),
    );
  }
}
