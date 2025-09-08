export interface FeedDto {
    publicId: string;
    imageUrl: string;
    likeCount: number;
    content: string | null;
    isUserLiked: boolean;
    author: {
        publicId: string;
        username: string;
        fullName: string | null;
        imageUrl: string | null;
        headLine: string | null;
    };
    recipe: { publicId: string | null } | null; 
}

