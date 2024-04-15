import styled from "styled-components";

const Item = styled.li`
  cursor: pointer;
  padding: 10px;
  transition: background 0.3s;
  
  &:hover {
    background: #ddd;
  }
`;

interface DropdownItemProps {
  text: string;
  isActive: boolean;
  onSelect: () => void;
  searchValue: string;
}
export const DropdownItem = ({
  text,
  isActive,
  searchValue,
  onSelect,
}: DropdownItemProps) => {
  const matchIndex = text.toLowerCase().indexOf(searchValue.toLowerCase());
  const beforeMatch = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + searchValue.length);
  const afterMatch = text.slice(matchIndex + searchValue.length);

  return (
    <Item
      key={text}
      role="option"
      id={`option-${text}`}
      style={isActive ? { backgroundColor: "#bde4ff" } : {}}
      onClick={onSelect}
    >
      {beforeMatch}
      <span style={{ backgroundColor: "yellow" }}>{match}</span>
      {afterMatch}
    </Item>
  );
};
