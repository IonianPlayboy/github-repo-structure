const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: colors.cyan["700"],
			},
			fontFamily: {
				display: ["Space Grotesk", ...defaultTheme.fontFamily.serif],
				body: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
