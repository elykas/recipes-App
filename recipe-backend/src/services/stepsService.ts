import { Prisma } from "@prisma/client";
import {ISteps} from "../models/recipeModel"
import { pgUpdateRecipeSteps } from "../dal/stepsDal";
export const updateRecipeStepsService = async (
    publicRecipeId: string,
    steps: ISteps[],
    tx: Prisma.TransactionClient
): Promise<void> => {
    await pgUpdateRecipeSteps(publicRecipeId, steps, tx);
};