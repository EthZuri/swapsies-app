interface StepperProps {
  currentStep: number;
}
const Stepper = ({ currentStep = 0 }: StepperProps) => {
  return (
    <ul className="steps">
      <li
        className={`step text-black ${currentStep >= 0 ? "step-primary" : ""}`}
      >
        Your tokens
      </li>
      <li
        className={`step text-black ${currentStep >= 1 ? "step-primary" : ""}`}
      >
        Counter-party tokens
      </li>
      <li
        className={`step text-black ${currentStep >= 2 ? "step-primary" : ""}`}
      >
        Review
      </li>
    </ul>
  );
};

export default Stepper;
