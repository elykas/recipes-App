import { Prisma } from "@prisma/client";
import { ISteps } from "../models/recipeModel";
import {pgGetRecipeIdByPublicId} from "./recipesDAL"
import ErrorResponse from "../utils/errors/errors";

export const pgUpdateRecipeSteps = async (
    publicRecipeId: string,
    steps: ISteps[],
    tx: Prisma.TransactionClient
  ): Promise<void> => {
    const recipeId: number | null = await pgGetRecipeIdByPublicId(publicRecipeId);
  
    if (!recipeId) throw ErrorResponse("Recipe not found", 404);
  
    await tx.step.deleteMany({
      where: { recipeId },
    });
  
    if (steps.length > 0) {
      await tx.step.createMany({
        data: steps.map((step) => ({
          title: step.title,
          description: step.description,
          duration: step.duration,
          order: step.order,
          recipeId,
        })),
      });
    }
  }