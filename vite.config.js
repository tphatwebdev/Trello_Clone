import { defineConfig, withFilter } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    withFilter(
      svgr(),
      { load: { id: /\.svg\?react$/ } }
    ),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
