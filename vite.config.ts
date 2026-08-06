import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({
      target: 'react',
      quoteStyle: 'double',
      autoCodeSplitting: true,
    }),
    viteReact(),
  ],
})

export default config
