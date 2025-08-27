class PostAuthor {
  final String publicId;
  final String? username;
  final String? fullName;
  final String? imageUrl;
  final String? headLine;

  PostAuthor({
    required this.publicId,
    this.username,
    this.fullName,
    this.imageUrl,
    this.headLine,
  });

  factory PostAuthor.fromJson(Map<String, dynamic> json) {
    return PostAuthor(
      publicId: json['publicId'],
      username: json['username'],
      fullName: json['fullName'],
      imageUrl: json['imageUrl'],
      headLine: json['headLine'],
    );
  }

  PostAuthor copyWith({
    String? publicId,
    String? username,
    String? fullName,
    String? imageUrl,
    String? headLine,
  }) {
    return PostAuthor(
      publicId: publicId ?? this.publicId,
      username: username ?? this.username,
      fullName: fullName ?? this.fullName,
      imageUrl: imageUrl ?? this.imageUrl,
      headLine: headLine ?? this.headLine,
    );
  }
}

class PostRecipe {
  final String publicId;

  PostRecipe({required this.publicId});

  factory PostRecipe.fromJson(Map<String, dynamic> json) {
    return PostRecipe(publicId: json['publicId']);
  }
}

class FeedPost {
  final String publicId;
  final String? imageUrl;
  final int? likeCount;
  final String? content;
  final PostAuthor? author;
  final PostRecipe? recipe;

  FeedPost.Feed({
    required this.publicId,
    this.imageUrl,
    this.likeCount,
    this.content,
    this.author,
    this.recipe,
  });

  factory FeedPost.fromJson(Map<String, dynamic> json) {
    return FeedPost.Feed(
      publicId: json['publicId'],
      imageUrl: json['imageUrl'],
      likeCount: json['likeCount'],
      content: json['content'],
      author: json['author'] != null
          ? PostAuthor.fromJson(json['author'])
          : null,
      recipe: json['recipe'] != null
          ? PostRecipe.fromJson(json['recipe'])
          : null,
    );
  }

  FeedPost copyWith({
    String? publicId,
    String? imageUrl,
    int? likeCount,
    String? content,
    PostAuthor? author,
    PostRecipe? recipe,
  }) {
    return FeedPost.Feed(
      publicId: publicId ?? this.publicId,
      imageUrl: imageUrl ?? this.imageUrl,
      likeCount: likeCount ?? this.likeCount,
      content: content ?? this.content,
      author: author ?? this.author,
      recipe: recipe ?? this.recipe,
    );
  }
}

class FeedResponse {
  final List<FeedPost> posts;
  final String? cursor;
  final List<String> excludeIds;

  FeedResponse({required this.posts, this.cursor, this.excludeIds = const []});
}
