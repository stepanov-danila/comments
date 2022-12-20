export const ChevronSvgIcon = (props) => {
  return (
    <div className="svg" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="10"
        fill="none"
        viewBox="0 0 13 10"
      >
        <g clipPath="url(#clip0_2053_5594)">
          <path
            fill="#000"
            fillRule="evenodd"
            d="M13 7.791L6.5.495 0 7.791l1.524 1.71L6.5 3.915l4.977 5.586L13 7.791z"
            clipRule="evenodd"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_2053_5594">
            <path
              fill="#fff"
              d="M0 0H13V9H0z"
              transform="translate(0 .5)"
            ></path>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export const CornerDownRightIcon = (props) => {
  return (
    <div className="svg" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#A6A6A6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 10l5 5-5 5"
        ></path>
        <path
          stroke="#A6A6A6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 4v7a4 4 0 004 4h12"
        ></path>
      </svg>
    </div>
  );
};

export const CornerUpLeftIcon = (props) => {
  return (
    <div className="svg" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        fill="none"
        viewBox="0 0 24 25"
      >
        <path
          stroke="#A6A6A6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 9.372l-5-5-5 5"
        ></path>
        <path
          stroke="#A6A6A6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20 20.372h-7a4 4 0 01-4-4v-12"
        ></path>
      </svg>
    </div>
  );
};

export const LikeIcon = ({ color = "#00AEFF", ...rest }) => {
  return (
    <div className="svg" {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          fill={color}
          fillRule="evenodd"
          d="M2 5.375c0-.93.33-1.725.99-2.385A3.25 3.25 0 015.375 2c.523 0 1.014.111 1.47.333.458.223.843.53 1.155.92.32-.39.707-.697 1.16-.92A3.283 3.283 0 0110.625 2c.93 0 1.725.33 2.385.99.66.66.99 1.455.99 2.385 0 .461-.131 1.056-.393 1.787-.261.73-.634 1.467-1.119 2.208a45.436 45.436 0 01-1.265 1.917c-.258.371-.477.666-.657.884-.179.219-.39.459-.633.721a4.602 4.602 0 01-.656.604c-.195.14-.404.259-.627.357A1.604 1.604 0 018 14a1.67 1.67 0 01-.651-.141 3.182 3.182 0 01-.626-.352 4.411 4.411 0 01-.651-.597 16.802 16.802 0 01-.627-.715 14.762 14.762 0 01-.656-.885c-.258-.371-.467-.68-.627-.926-.16-.246-.377-.584-.65-1.014A10.544 10.544 0 012.41 7.185C2.137 6.431 2 5.828 2 5.375z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export const EditIcon = (props) => {
  return (
    <div className="svg" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 15 15"
      >
        <path
          fill="#7B8487"
          d="M14.266 3.86a.795.795 0 00.234-.587.795.795 0 00-.234-.586L12.312.734A.795.795 0 0011.727.5a.795.795 0 00-.586.234L9.5 2.375 12.625 5.5l1.64-1.64zm-2.461 2.46L8.68 3.195l-8.36 8.36v3.125h3.125l8.36-8.36z"
        ></path>
      </svg>
    </div>
  );
};

export const DeleteIcon = (props) => {
  return (
    <div className="svg" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="13"
        fill="none"
        viewBox="0 0 12 13"
      >
        <path
          fill="#7B8487"
          d="M11.82 1.852L10.648.68 6 5.328 1.352.68.18 1.852 4.828 6.5.18 11.148l1.172 1.172L6 7.672l4.648 4.648 1.172-1.172L7.172 6.5l4.648-4.648z"
        ></path>
      </svg>
    </div>
  );
};
