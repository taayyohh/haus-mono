import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./tools/vitest/vitest.setup.ts",
	},
	plugins: [react(), tsconfigPaths()],
});
