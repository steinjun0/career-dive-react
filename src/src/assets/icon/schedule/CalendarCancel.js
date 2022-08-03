import { colorTextLight } from "util/styledComponent";

export default function CalendarCancel({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.1667 4.33333H21V2H18.6667V4.33333H9.33333V2H7V4.33333H5.83333C4.55 4.33333 3.5 5.38333 3.5 6.66667V23C3.5 24.2833 4.55 25.3333 5.83333 25.3333H22.1667C23.45 25.3333 24.5 24.2833 24.5 23V6.66667C24.5 5.38333 23.45 4.33333 22.1667 4.33333ZM22.1667 23H5.83333V11.3333H22.1667V23ZM5.83333 9V6.66667H22.1667V9H5.83333Z"
        fill={color ? color : colorTextLight}
        style={{ transition: 'all 0.3s ease-out' }}
      />
      <path d="M11.2367 21.1667L10 19.93L12.8467 17.0833L10 14.2367L11.2367 13L14.0833 15.8467L16.93 13L18.1667 14.2367L15.32 17.0833L18.1667 19.93L16.93 21.1667L14.0833 18.32L11.2367 21.1667Z"
        fill={color ? color : colorTextLight}
        style={{ transition: 'all 0.3s ease-out' }} />
    </svg>
  );
}

