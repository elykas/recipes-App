import { GroupRecipesPreviewDto, FullRecipeGroupDto } from "../../dto/groupDto";
import {
  GroupRecipesPreviewResponse,
  RecipeGroupResponse,
  UserGroupsResponse,
} from "../../types/response/groupResponse";

export const userGroupsMapper = (userGroups: UserGroupsResponse) => ({
  publicId: userGroups.group.publicId,
  name: userGroups.group.name,
  imageUrl: userGroups.group.imageUrl,
  admin: userGroups.admin,
});

export const groupRecipesPreviewMapper = (
  data: GroupRecipesPreviewResponse
): GroupRecipesPreviewDto => ({
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
  recipes: data.groupRecipes.map((gr: any) => {
    const r = gr.recipe;
    return {
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
    };
  }),
});

export const recipeGroupMapper = (
  recipe: RecipeGroupResponse
): FullRecipeGroupDto => ({
  publicId: recipe.recipe.publicId,
  title: recipe.recipe.title,
  difficulty: recipe.recipe.difficulty,
  isPublic: recipe.recipe.isPublic,
  tip: recipe.recipe.tip,
  prepTime: recipe.recipe.prepTime,
  imageUrl: recipe.recipe.imageUrl,
  description: recipe.recipe.description,
  categories: recipe.recipe.categories.map((c) => ({
    id: c.id,
    name: c.name,
    type: c.type,
  })),
  steps: recipe.recipe.steps.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    duration: s.duration,
    order: s.order,
  })),
  ingredients: recipe.recipe.ingredients.map((ing) => ({
    id: ing.id,
    name: ing.name,
    quantity: ing.quantity,
    unit: ing.unit,
  })),
});
