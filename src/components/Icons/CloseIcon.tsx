import { IconProps } from "./type";

const CloseIcon = (props: IconProps) => {
  //
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M35.1113 12.0215L12.1113 35.0215"
        stroke="#4F4F4F"
        strokeWidth="2"
      />
      <path
        d="M35.3281 35.2383L12.3281 12.2382"
        stroke="#4F4F4F"
        strokeWidth="2"
      />
    </svg>
  );
};

export default CloseIcon;
