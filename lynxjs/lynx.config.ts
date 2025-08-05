import { defineConfig } from '@lynx-js/rspeedy'
import dotenv from 'dotenv'

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'

dotenv.config()

export default defineConfig({
  server: {
    host: "localhost",
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        // return `${url}?fullscreen=true`
        return 'http://localhost:3000/main.lynx.bundle?fullscreen=true'
      },
    }),
    pluginReactLynx(),
  ],
  source: {
    define: {
      'process.env': {
        TMDB_API_KEY: JSON.stringify(process.env.TMDB_API_KEY),
      },
    },
  },
})
