const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				display: ["Space Grotesk", ...defaultTheme.fontFamily.serif],
				body: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
