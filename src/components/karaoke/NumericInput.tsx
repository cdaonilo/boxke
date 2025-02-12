import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface NumericInputProps {
  onCodeChange?: (code: string) => void;
  onCodeSubmit?: (code: string) => void;
  initialValue?: string;
  maxLength?: number;
}

const NumericInput = ({
  onCodeChange = () => {},
  onCodeSubmit = () => {},
  initialValue = "",
  maxLength = 5,
}: NumericInputProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    onCodeChange(value);
  }, [value, onCodeChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers, backspace, delete, and arrow keys
    if (
      !/[0-9]/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Enter"].includes(
        e.key,
      )
    ) {
      e.preventDefault();
    }

    if (e.key === "Enter" && value.length > 0) {
      onCodeSubmit(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    if (newValue.length <= maxLength) {
      setValue(newValue);
    }
  };

  return (
    <Card className="w-[400px] h-[120px] bg-black border-gray-800 p-6 flex items-center justify-center">
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="text-6xl text-center h-20 bg-gray-800 text-white border-gray-700 focus:border-blue-500"
        placeholder="00000"
        maxLength={maxLength}
        autoFocus
      />
    </Card>
  );
};

export default NumericInput;
