import * as Styled from "./SectionTitle.styled";

type SectionTitleProps = {
  children?: string;
};

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <Styled.Wrapper>
      <Styled.Title>{children}</Styled.Title>
      <Styled.Divider />
    </Styled.Wrapper>
  );
}

export default SectionTitle;
