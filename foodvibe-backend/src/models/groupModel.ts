import IRecipe from "./recipeModel";
import IUser from "./userModel";

export interface IGroup {
    id?: number;
    publicId: string;
    name: string;
    description?: string | null;
    imageUrl?: string;
    creatorId?: number | null;
    creator?: IUser | null;
    members?: IGroupMember[]
    recipes?: IRecipe[]
}

export interface IGroupMember {
    id?: number;
    groupId: number;
    userId: number;
    admin: boolean
    joinedAt?: Date | null
    user?: IUser | null
}
