/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      //Background
      dkGeneralBgC: "#1A1A1A",
      dkPrimaryBgC: "#2A2133",
      dSecondaryBgC: "#D1A5FF",
      dkDisabledButtonBgC: "#454545",
      dkButtonBgC: "#E7FD5D",
      dkBackdropC: "rgba(26, 26, 26, 0.8)",
      dkSecondaryGradient: "#51366C",
      ltSecondaryGradient: "#EEE3F9",
      secondaryGradient: "#6E36B9",
      // Icon
      dkPrimaryIconC: "#D1A5FF",
      PrimaryIconC: "#E7FD5D",

      //Border
      dkSecondaryBorderC: "#E7FD5D",
      dkPrimaryBorderC: "#D1A5FF",
      //Text
      dkPrimaryTextC: "#FFFFFF",
      dkSecondaryTextC: "#E7FD5D",
      dkOwnMessageTextC: "#1A1A1A",
      dkInactiveInfoTextC: "#9284A1",
      dkPrimaryAccentTextC: "#ADB580",
      dkSecondaryAccentTextC: "#D1A5FF",
      dkDisabledTextC: "#1B1A1A",
    },
  },
  plugins: [],
  darkMode: "class",
};
