export interface FeedDto {
    publicId: string;
    imageUrl: string;
    likeCount: number;
    content: string;
    author: {
        publicId: string;
        username: string;
        fullName: string;
        imageUrl: string;
    };
    recipe: {
        publicId: string;
    };
}