const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					pale: colors.cyan["100"],
					lighter: colors.cyan["400"],
					light: colors.cyan["500"],
					DEFAULT: colors.cyan["700"],
					dark: colors.cyan["800"],
					darker: colors.cyan["900"],
				},
			},
			fontFamily: {
				display: ["Space Grotesk", ...defaultTheme.fontFamily.serif],
				body: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
			},
			animation: {
				gradient: "bg-slide 15s ease infinite",
			},
			keyframes: {
				"bg-slide": {
					"0%, 100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
				},
			},
			backgroundImage: {
				"topograpy-pattern": "url('/svg/topography-pattern.svg')",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
