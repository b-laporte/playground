import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "theme" | "plugins"> = {
  theme: {
    extend: {},
  },
  plugins: [],
  content: ["./**/*.{js,ts,jsx,tsx,mdx}"],
};

export default config;
