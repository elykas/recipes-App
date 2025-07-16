import IUser from "./userModel";

export interface IPost {
  id?: number | null;
  publicId: string;
  content?: String | null;
  imageUrl?: String | null;
  type: PostType;
  author?: IUser | null;
  authorId: number;
  recipeId?: number | null;
  likes?: IPostLike[];
  title: string;
}

export enum PostType {
  TextBg = "TextBg",
  Image = "Image",
  Video = "Video",
}

export interface IPostLike {
  id?: number | null;
  postId: number;
  userId: number;
  type: LikeType;
}

export enum LikeType {
  Like = "Like",
  Love = "Love",
  Haha = "Haha",
  Wow = "Wow",
  Sad = "Sad",
  Angry = "Angry",
}
