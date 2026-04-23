import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config: UserConfig = {
  plugins: [react(), tailwindcss()],
}

export default defineConfig(config)
