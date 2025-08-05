export interface ICategory {
  id: number;
  type: CategoryTypes;
  name?: string;
}


export const CategoryTypes = {
  MealType: "MealType",
  MainIngredient: "MainIngredient",
  Cuisine: "Cuisine",
  DietaryPreference: "DietaryPreference",
  CookingMethod: "CookingMethod",
  Occasion: "Occasion",
  SkillLevel: "SkillLevel",
  PreparationTime: "PreparationTime",
  Equipment: "Equipment",
  Audience: "Audience",
  NutritionFocus: "NutritionFocus",
  Seasonality: "Seasonality",
  FlavorProfile: "FlavorProfile",
  Texture: "Texture",
} as const;

export type CategoryTypes = typeof CategoryTypes[keyof typeof CategoryTypes];
