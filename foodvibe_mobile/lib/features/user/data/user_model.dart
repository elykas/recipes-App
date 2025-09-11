import 'package:foodvibe_mobile/core/constants/app_constans.dart';
import 'package:foodvibe_mobile/features/feed/data/feed_model.dart';
import 'package:foodvibe_mobile/services/supabase_service.dart';

class AppUser {
  final String Id;
  final String  username;
  final String? fullName;
  final String? imagePath;
  final String? email;
  final String? bio;
  final String? headLine;
  final String  locale;
  final bool isAdmin;
  final List<FeedPost>? posts;

  AppUser({
    required this.Id,
    required this.username,
    this.fullName,
    this.imagePath,
    this.email,
    this.bio,
    this.headLine,
    required this.locale,
    required this.isAdmin,
    this.posts,
  });

  factory AppUser.fromJson(Map<String, dynamic> json) {
    final posts = (json['posts'] as List<dynamic>?)
        ?.map((p) => FeedPost.fromJson(p as Map<String, dynamic>))
        .toList();

    return AppUser(
      Id: json['publicId'],
      username: json['username'],
      fullName: json['fullName'],
      imagePath: json['imageUrl'],
      email: json['email'],
      bio: json['bio'],
      headLine: json['headLine'],
      locale: json['locale'] ?? 'en',
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

extension AppUserToJson on AppUser {
  Map<String, dynamic> toJson() {
    return {'fullName': fullName, 'bio': bio, 'headLine': headLine};
  }
}

extension AppUserCopy on AppUser {
  AppUser copyWith({
    String? Id,
    String?  username,
    String? fullName,
    String? imagePath,
    String? email,
    String? bio,
    String? headLine,
    String?  locale,
    bool? isAdmin,
    List<FeedPost>? posts,
  }) {
    return AppUser(
      Id: Id ?? this.Id,
      username: username ?? this.username,
      fullName: fullName ?? this.fullName,
      imagePath: imagePath ?? this.imagePath,
      email: email ?? this.email,
      bio: bio ?? this.bio,
      headLine: headLine ?? this.headLine,
      locale: locale ?? this.locale,
      isAdmin: isAdmin ?? this.isAdmin,
      posts: posts ?? this.posts,
    );
  }
}

class AppUserWithCursor {
  final AppUser user;
  final String? nextCursor;

  AppUserWithCursor({required this.user, this.nextCursor});

  factory AppUserWithCursor.fromJson(Map<String, dynamic> json) {
    return AppUserWithCursor(
      user: AppUser.fromJson(json),
      nextCursor: json['nextCursor'],
    );
  }
}

class UpdateUserResponse {
  final String Id;
  final String? fullName;
  final String? headLine;
  final String? bio;

  UpdateUserResponse({
    required this.Id,
    this.fullName,
    this.headLine,
    this.bio,
  });

  factory UpdateUserResponse.fromJson(Map<String, dynamic> json) {
    return UpdateUserResponse(
      Id: json['publicId'],
      fullName: json['fullName'],
      headLine: json['headLine'],
      bio: json['bio'],
    );
  }
}

class UpdateImageUserResponse {
  final String Id;
  final String? imageUrl;

  UpdateImageUserResponse({required this.Id, this.imageUrl});

  factory UpdateImageUserResponse.fromJson(Map<String, dynamic> json) {
    return UpdateImageUserResponse(
      Id: json['publicId'],
      imageUrl: json['imageUrl'],
    );
  }

  static Future<UpdateImageUserResponse> fromJsonWithSignedUrl(
    Map<String, dynamic> json,
    String bucket,
    int expirationDays,
  ) async {
    final raw = UpdateImageUserResponse.fromJson(json);

    if (raw.imageUrl != null) {
      final signedUrl = await SupabaseManager().getSignedImageUrl(
        bucket,
        raw.imageUrl!,
        expirationDays,
      );
      return UpdateImageUserResponse(Id: raw.Id, imageUrl: signedUrl);
    }

    return raw;
  }
}

class UpdateLocaleUserResponse {
  final String Id;
  final String locale;

  UpdateLocaleUserResponse({required this.Id, required this.locale});

  factory UpdateLocaleUserResponse.fromJson(Map<String, dynamic> json) {
    return UpdateLocaleUserResponse(
      Id: json['publicId'],
      locale: json['locale'],
    );
  }
}
