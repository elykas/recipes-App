import React from "react";

interface LabeledInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  className = "",
}) => {
  return (
    <div className="mb-2 w-full">
      {label && <label className="block text-sm mb-1">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        className={`border p-2 w-full ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default LabeledInput;
