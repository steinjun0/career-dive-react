import { colorTextLight } from "util/styledComponent";

export default function EditCalendarIcon({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 10H19V12H21V6C21 4.9 20.1 4 19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H12V20H5V10ZM5 6H19V8H5V6ZM22.84 16.28L22.13 16.99L20.01 14.87L20.72 14.16C21.11 13.77 21.74 13.77 22.13 14.16L22.84 14.87C23.23 15.26 23.23 15.89 22.84 16.28ZM19.3 15.58L21.42 17.7L16.12 23H14V20.88L19.3 15.58Z"
        fill={color ? color : colorTextLight}
        style={{ transition: 'all 0.3s ease-out' }} />
    </svg>
  );
}

