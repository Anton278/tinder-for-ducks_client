import { Fragment } from "react";

import * as Styled from "./Stepper.styled";

type StepperProps = {
  activeStep: number;
  steps?: number;
  onStepClick?: (step: number) => void;
};

function Stepper({ activeStep, steps = 1, onStepClick }: StepperProps) {
  return (
    <Styled.Wrapper>
      <Styled.Title>Step {activeStep}</Styled.Title>
      <Styled.Steps>
        {Array.from(Array(steps)).map((_, index) => (
          <Fragment key={index}>
            {index !== 0 && <Styled.Line $active={activeStep === index + 1} />}
            <Styled.Step
              onClick={() => onStepClick && onStepClick(index + 1)}
              $active={activeStep === index + 1}
            >
              {index + 1}
            </Styled.Step>
          </Fragment>
        ))}
      </Styled.Steps>
    </Styled.Wrapper>
  );
}

export default Stepper;
