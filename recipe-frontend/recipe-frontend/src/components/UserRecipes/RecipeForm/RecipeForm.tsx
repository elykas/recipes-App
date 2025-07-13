import { useState } from "react";
import type { IRecipe, Ingredient } from "../../../types/recipeType";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { CardContent } from "../../ui/CardContent";
import LabeledInput from "../../ui/LabeledInput";
import { useCategoriesContext } from "../../../context/categoriesContext";
import Select from "react-select";

interface RecipeFormProps {
  initialRecipe?: IRecipe;
  onSubmit: (recipe: Omit<IRecipe, "id">) => void;
  onCancel: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  initialRecipe,
  onSubmit,
  onCancel,
}) => {
  const {categories} = useCategoriesContext();
  const [error, setError] = useState("");
  const [name, setName] = useState(initialRecipe?.name || "");
  const [categoriesSelected, setCategoriesSelected] = useState(initialRecipe?.categories || []);
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialRecipe?.ingredients || []);
  const [steps, setSteps] = useState(initialRecipe?.steps || []);

  const categoryOptions = categories.map((cat) => ({
    label: `${cat.name} (${cat.type})`,
    value: cat.id,
    ...cat,
  }));

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { quantity: "", name: "", unit: "" }]);
  };

  const handleIngredientUpdate = (
    index: number,
    field: Exclude<keyof Ingredient, "id">,
    value: string
  ) => {
    const updated = [...ingredients];
    (updated[index][field] ) = value;
    setIngredients(updated);
  };

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleStepChange = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const handleSubmit = () => {
    onSubmit({
      name,
      categories: categoriesSelected,
      ingredients,
      steps,
    });
  };

  return (
    <Card className="max-w-xl mx-auto mt-6">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Recipe Form</h2>

        <LabeledInput
          placeholder="Recipe Name"
          value={name}
          onChange={setName}
        />

        <div className="mb-4">
          <label className="block mb-1 font-medium">Categories</label>
          <Select
            options={categoryOptions}
            isMulti
            getOptionLabel={(e) => `${e.name} (${e.type})`}
            getOptionValue={(e) => e.id.toString()}
            value={categoriesSelected}
            onChange={(selected) => setCategoriesSelected(selected as typeof categoriesSelected)}
            placeholder="Select categories..."
          />
        </div>

        <h3 className="font-medium mt-4 mb-2">Ingredients:</h3>
        {ingredients.map((ing, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <LabeledInput
              placeholder="Quantity"
              value={ing.quantity}
              onChange={(val) => handleIngredientUpdate(idx, "quantity", val)}
              className="flex-1"
            />
            <LabeledInput
              placeholder="Name"
              value={ing.name}
              onChange={(val) => handleIngredientUpdate(idx, "name", val)}
              className="flex-1"
            />
            <LabeledInput
              placeholder="Unit"
              value={ing.unit}
              onChange={(val) => handleIngredientUpdate(idx, "unit", val)}
              className="flex-1"
            />
          </div>
        ))}
        <Button onClick={handleAddIngredient} variant="outline">
          + Add Ingredient
        </Button>

        <h3 className="font-medium mt-4 mb-2">Steps:</h3>
        {steps.map((step, idx) => (
          <textarea
            key={idx}
            className="border p-2 w-full mb-2"
            placeholder={`Step ${idx + 1}`}
            value={step}
            onChange={(e) => handleStepChange(idx, e.target.value)}
          />
        ))}
        <Button onClick={handleAddStep} variant="outline">
          + Add Step
        </Button>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeForm;
