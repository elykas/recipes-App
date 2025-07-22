import { GroupRecipesPreviewDto } from "../../dto/groupDto";
import { UserGroupsResponse } from "../../types/responses";

export const userGroupsMapper = (userGroups: UserGroupsResponse) => ({
    publicId: userGroups.group.publicId,
    name: userGroups.group.name,
    imageUrl: userGroups.group.imageUrl,
    admin: userGroups.admin
})

export const groupRecipesPreviewMapper = (data: any): GroupRecipesPreviewDto => ({
  publicId: data.publicId,
  name: data.name,
  imageUrl: data.imageUrl,
  members: data.members.map((m: any) => ({
    publicId: m.user.publicId,
    fullName: m.user.fullName,
    username: m.user.username,
    headLine: m.user.headLine,
    imageUrl: m.user.imageUrl,
  })),
  recipes: data.recipes.map((r: any) => ({
    title: r.title,
    publicId: r.publicId,
    imageUrl: r.imageUrl,
    categories: r.categories.map((c: any) => ({
      id: c.id,
      name: c.name,
      type: c.type,
    })),
    isPublic: r.isPublic,
    likesCount: r._count.likes,
  })),
});
