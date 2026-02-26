import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    base: "/hope/",
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
    ],
    resolve: {
      alias: {
        "@api": "/src/api",
        "@components": "/src/components", // Adjust path as needed
        "@pages": "/src/pages",
        "@store": "/src/store",
        "@auth": "/src/auth",
        "@assets": "/src/assets",
        "@utils": "/src/utils",
        "@routes": "/src/routes",
        "@hooks": "/src/hooks",
        "@constants": "/src/constants",
        "@interfaces": "/src/interfaces",
      },
    },

    server: {
      watch: {
        usePolling: true,
        interval: 1000,
      },

      allowedHosts: [
        "localhost",
        "127.0.0.1",
        "ajio-hope.ajiodev.jio.com",
        "10.177.37.20:32577",
      ],
    },
  };
});
