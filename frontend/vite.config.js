import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        port: 5173,
        host: "0.0.0.0",
    },
    plugins: [react()],
});
