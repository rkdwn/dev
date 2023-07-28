import { IconProps } from "./type";

const LogoutIcon = (props: IconProps) => {
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
        d="M1.66667 20C1.22222 20 0.833333 19.8333 0.5 19.5C0.166667 19.1667 0 18.7778 0 18.3333V1.66667C0 1.22222 0.166667 0.833333 0.5 0.5C0.833333 0.166667 1.22222 0 1.66667 0H9.97222V1.66667H1.66667V18.3333H9.97222V20H1.66667ZM15.1667 14.8611L13.9722 13.6667L16.8056 10.8333H6.66667V9.16667H16.75L13.9167 6.33333L15.1111 5.13889L20 10.0278L15.1667 14.8611Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default LogoutIcon;
