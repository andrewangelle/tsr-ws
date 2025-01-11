import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    preset: 'vercel',
    experimental: {
      websocket: true
    },
    routeRules: {
      '/_ws': {
        proxy: {
          to: 'ws://locahost:8081'
        }
      }
    }
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
}).addRouter({
  name: "websocket",
  type: "http",
  handler: "./app/ws.ts", // the file we created above
  target: "server",
  base: "/_ws",
})