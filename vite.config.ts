import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
 
export default defineConfig({
	plugins: [react()],
	preview: {
		port: 8283,
		host: true,    // This enables listening on all network interfaces
	},
	server: {        // Also add this for development server
		host: true,    // This enables listening on all network interfaces
		port: 8283
	}
});
