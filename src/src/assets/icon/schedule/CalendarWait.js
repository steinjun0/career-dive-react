import { colorTextLight } from "util/styledComponent";

export default function CalendarWait({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.1667 4.33333H21V2H18.6667V4.33333H9.33333V2H7V4.33333H5.83333C4.55 4.33333 3.5 5.38333 3.5 6.66667V23C3.5 24.2833 4.55 25.3333 5.83333 25.3333H22.1667C23.45 25.3333 24.5 24.2833 24.5 23V6.66667C24.5 5.38333 23.45 4.33333 22.1667 4.33333ZM22.1667 23H5.83333V11.3333H22.1667V23ZM5.83333 9V6.66667H22.1667V9H5.83333Z"
        fill={color ? color : colorTextLight}
        style={{ transition: 'all 0.3s ease-out' }} />
      <path d="M14 12.8328C11.792 12.8328 10 14.6248 10 16.8328C10 19.0408 11.792 20.8328 14 20.8328C16.208 20.8328 18 19.0408 18 16.8328C18 14.6248 16.208 12.8328 14 12.8328ZM15.32 18.7128L13.6 16.9928V14.4328H14.4V16.6648L15.88 18.1448L15.32 18.7128Z"
        fill={color ? color : colorTextLight}
        style={{ transition: 'all 0.3s ease-out' }} />
    </svg>
  );
}

