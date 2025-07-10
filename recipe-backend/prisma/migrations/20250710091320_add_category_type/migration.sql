/*
  Warnings:

  - Added the required column `type` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('MealType', 'MainIngredient', 'Cuisine', 'DietaryPreference', 'CookingMethod', 'Occasion', 'SkillLevel', 'PreparationTime', 'Equipment', 'Audience', 'NutritionFocus', 'Seasonality', 'FlavorProfile', 'Texture');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "type" "CategoryType" NOT NULL;
