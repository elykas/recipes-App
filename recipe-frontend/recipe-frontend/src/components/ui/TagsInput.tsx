import React from "react";
import { X } from "lucide-react";
import { Button } from "./Button";
import LabeledInput from "./LabeledInput";

interface TagsInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  currentInput: string;
  setCurrentInput: (val: string) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({
  label,
  placeholder,
  tags,
  setTags,
  currentInput,
  setCurrentInput,
}) => {
  const handleAdd = () => {
    if (currentInput.trim()) {
      setTags([...tags, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const handleRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex gap-2 mb-2">
        <LabeledInput
          placeholder={placeholder}
          value={currentInput}
          onChange={setCurrentInput}
          onKeyDown={handleKeyDown}
        />
        <Button type="button" onClick={handleAdd}>
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-sm"
          >
            {tag}
            <Button type="button" onClick={() => handleRemove(idx)}>
              <X className="w-3 h-3" />
            </Button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
