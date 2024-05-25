import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // load env vars from .env
export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
});
