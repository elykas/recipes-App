class Post {
  final String? id;
  final String imageUrl; 
  final String? content;
  final String? recipeId; 

  Post({
    this.id,
    required this.imageUrl,
    this.content,
    this.recipeId,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['publicId'] as String?,
      imageUrl: json['imageUrl'] as String,
      content: json['content'] as String,
      recipeId: json['recipePublicId'] as String?
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'publicId': id,
      'imageUrl': imageUrl,
      'content': content,
      'recipePublicId': recipeId,
    };
  }
}

class CreatePostResponse {
  final String Id;

  CreatePostResponse({required this.Id});

  factory CreatePostResponse.fromJson(Map<String, dynamic> json) {
    return CreatePostResponse(Id: json['publicId'] as String);
  }

  Map<String, dynamic> toJson() {
    return {
      'publicId': Id,
    };
  }

}



class DeletePostResponse {
  final String Id;
  final String postId;

  DeletePostResponse({required this.Id, required this.postId});

  factory DeletePostResponse.fromJson(Map<String, dynamic> json) {
    return DeletePostResponse(Id: json['publicId'] as String, postId: json['postId'] as String);
  }

}