import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../../ui/button";

interface TagsInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ label, placeholder, tags, setTags }) => {
  const [currentInput, setCurrentInput] = useState<string>("");

  const handleAdd = () => {
    if (currentInput.trim()) {
      setTags([...tags, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const handleRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder={placeholder}
          className="border p-2 rounded w-full"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
        />
        <Button type="button" onClick={handleAdd}>Add</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span key={idx} className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-sm">
            {tag}
            <button type="button" onClick={() => handleRemove(idx)}>
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
