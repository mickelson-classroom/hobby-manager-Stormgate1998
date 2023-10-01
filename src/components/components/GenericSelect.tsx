import React, { FC, useEffect, useState } from "react";

interface GenericSelectProps<T> {
  valid_feedback: string;
  invalid_feeback: string;
  label: string;
  isValid: boolean;
  onChange: (value: T) => void;
  options: T[]; // Use a generic T type for options
}

export const GenericSelect = <T extends {}>({
  onChange,
  valid_feedback,
  invalid_feeback,
  label,
  isValid,
  options,
}: GenericSelectProps<T>) => {
  const [selectedOption, setSelectedOption] = useState<T | null>(options[0] || null);

  useEffect(() => {
    onChange(selectedOption as T);
  }, [selectedOption]);

  return (
    <>
      <label className="form-label">{label}</label>
      <select
        className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
        value={selectedOption as unknown as string} // Adjust here
        onChange={(e) => {
          const selectedValue = e.target.value as unknown as T;
          setSelectedOption(selectedValue);
        }}
      >
        {options.map((option: T, index: number) => (
          <option key={index} value={(option as unknown as string)}>
            {(option as unknown as string)}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{invalid_feeback}</div>
      <div className="valid-feedback">{valid_feedback}</div>
    </>
  );
};
