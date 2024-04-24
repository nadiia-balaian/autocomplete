import styled from "styled-components";

const Item = styled.li`
  cursor: pointer;
  padding: 10px;
  transition: background 0.3s;

  &:hover {
    background: #ddd;
  }
`;

interface DropdownItemProps extends React.HTMLAttributes<HTMLLIElement>{
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
  ...props
}: DropdownItemProps) => {
  const highlightText = (str: string) => {
    const regex = new RegExp(searchValue, "gi");
    return str.replace(
      regex,
      (match) => `<span style="background: yellow">${match}</span>`
    );
  };

  return (
    <Item
      key={text}
      role="option"
      id={`option-${text}`}
      style={isActive ? { backgroundColor: "#bde4ff" } : {}}
      onClick={onSelect}
      {...props}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: highlightText(text),
        }}
      />
    </Item>
  );
};
