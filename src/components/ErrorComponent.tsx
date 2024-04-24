import styled from "styled-components";

const StyledError = styled.p`
  color: red;
`;

interface ErrorComponentProps {
  message: string;
}

export const ErrorComponent = ({ message }: ErrorComponentProps) => {
  return (
    <StyledError
      style={{
        color: "red",
        fontSize: "0.8rem",
      }}
    >
      {message}
    </StyledError>
  );
};
