import styled from "styled-components";

const StyledError = styled.p`
  color: red;
`;

interface ErrorComponentProps {
  msg: string;
}

export const ErrorComponent = ({ msg }: ErrorComponentProps) => {
  return (
    <StyledError
      style={{
        color: "red",
      }}
    >
      {msg}
    </StyledError>
  );
};
