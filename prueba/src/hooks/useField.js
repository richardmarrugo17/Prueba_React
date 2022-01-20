import { useState } from "react";

export const useField = (initialValue) => {
  const [value, setvalue] = useState(initialValue);
  const onChange = (e) => {
    const { value } = e.target;
    setvalue(value);
  };
  return { value, onChange, setvalue };
};
