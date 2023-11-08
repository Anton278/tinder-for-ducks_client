import { Container as StyledContainer } from "./Container.styled";

type ContainerProps = {
  children?: React.ReactNode;
};

function Container({ children }: ContainerProps) {
  return <StyledContainer>{children}</StyledContainer>;
}

export default Container;
