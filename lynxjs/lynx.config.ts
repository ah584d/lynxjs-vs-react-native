import { defineConfig } from '@lynx-js/rspeedy'
import dotenv from 'dotenv'

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'

dotenv.config()

export default defineConfig({
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        // return `${url}?fullscreen=true`
        return 'http://lynxjs.local:3000/main.lynx.bundle?fullscreen=true'

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
