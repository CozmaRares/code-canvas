/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    include: ["test/vitest/*.{test,spec}.?(c|m)[jt]s?(x)"],
  },
});
