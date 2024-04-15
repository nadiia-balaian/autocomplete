import { styled } from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 10px;
`;

interface AutoCompleteInputProps {
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const AutoCompleteInput = ({
  value,
  onInputChange,
  onKeyDown,
}: AutoCompleteInputProps) => {
  return (
    <Input
      type="text"
      placeholder="Type something..."
      value={value}
      onChange={onInputChange}
      onKeyDown={onKeyDown}
      aria-autocomplete="list"
      aria-controls="autocomplete-listbox"
    />
  );
};
