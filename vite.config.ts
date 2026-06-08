import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

import { cloudflare } from "@cloudflare/vite-plugin";

const config = defineConfig({
  plugins: [viteTsConfigPaths({
    projects: ['./tsconfig.json'],
  }), tailwindcss(), tanstackStart({
    ssr: process.env.MOBILE_BUILD !== 'true',
  }), viteReact(), VitePWA({
    registerType: 'autoUpdate',
    manifest: false, // already using public/manifest.webmanifest
  }), cloudflare({
    viteEnvironment: {
      name: "ssr"
    }
  })],
})

export default config