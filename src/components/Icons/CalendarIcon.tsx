import { IconProps } from "./type";

const CalendarIcon = (props: IconProps) => {
  //
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9496 1.7H13.0996V0H11.3996V1.7H4.59961V0H2.89961V1.7H2.04961C1.10611 1.7 0.358109 2.465 0.358109 3.4L0.349609 15.3C0.349609 16.235 1.10611 17 2.04961 17H13.9496C14.8846 17 15.6496 16.235 15.6496 15.3V3.4C15.6496 2.465 14.8846 1.7 13.9496 1.7ZM7.99951 10.5H11.9995V13.5H7.99951V10.5ZM2.04961 15.3H13.9496V5.95H2.04961V15.3Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CalendarIcon;
