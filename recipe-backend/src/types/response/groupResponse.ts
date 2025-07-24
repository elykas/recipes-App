import { Prisma } from "@prisma/client";
export type UserGroupsResponse = Prisma.GroupMemberGetPayload<{
  select: {
    group: {
      select: {
        id: true;
        name: true;
        imageUrl: true;
        publicId: true;
      };
    };
    admin: true;
  };
}>;

export type GroupRecipesPreviewResponse = Prisma.GroupGetPayload<{
  include: {
    groupRecipes: {
      select: {
        recipe: {
          select: {
            title: true;
            publicId: true;
            imageUrl: true;
            categories: true;
            isPublic: true;
            _count: {
              select: {
                likes: true;
              };
            };
          };
        };
      };
    };
    members: {
      select: {
        user: {
          select: {
            publicId: true;
            fullName: true;
            username: true;
            headLine: true;
            imageUrl: true;
          };
        };
      };
    };
  };
}>;

export type RecipeGroupResponse = Prisma.GroupRecipeGetPayload<{
  select: {
      recipe: {
        include: {
          ingredients: true,
          categories: true,
          steps: true,
        },
      },
    },
  }>;

export type GroupMembersIdByGroupIdResponse = Prisma.GroupGetPayload<{
  select: {
    members: {
      select: {
        admin: true;
        user: {
          select: {
            id: true;
            publicId: true;
          };
        };
      };
    };
  };
}>;

export type GroupIdResponse = Prisma.GroupGetPayload<{
  select: {
    publicId: true;
  };
}>;

export type UpdatedGroupResponse = Prisma.GroupGetPayload<{
  select: {
    publicId: true;
    name: true;
    description: true;
  };
}>;

export type AddGroupMemberResponse = Prisma.GroupMemberGetPayload<{
  select: {
    group: {
      select: {
        publicId: true;
      };
    };
  };
}>;

export type UpdateGroupRecipeResponse = Prisma.GroupRecipeGetPayload<{
  select: {
    group: {
      select: {
        publicId: true;
      };
    };
  };
}>;
