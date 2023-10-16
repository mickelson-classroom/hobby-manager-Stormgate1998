import React from "react";
import { useState } from "react";

interface FormControl<T> {
  value: T;
  isValid: boolean;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  setValidity: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useFormControl<T>(initialValue: T): FormControl<T> {
  const [value, setValue] = useState<T>(initialValue);
  const [isValid, setValidity] = useState<boolean>(true);

  return {
    value,
    isValid,
    setValue,
    setValidity,
  };
}