import { defineConfig, withFilter } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  // cho phép Vite sử dụng process.env
  define: {
    // eslint-disable-next-line no-undef
    'process.env.BUILD_MODE': JSON.stringify(process.env.BUILD_MODE)
  },
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
