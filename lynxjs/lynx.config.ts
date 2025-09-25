import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';
import { defineConfig } from '@lynx-js/rspeedy';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  server: {
    host: 'localhost',
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        // return `${url}?fullscreen=true`
        return 'http://localhost:3000/main.lynx.bundle?fullscreen=true';
      },
    }),
    pluginReactLynx(),
    pluginTypeCheck(),
    pluginSass(),
  ],
  source: {
    define: {
      'process.env': {
        TMDB_API_KEY: JSON.stringify(process.env.TMDB_API_KEY),
      },
    },
  },
  tools: {
    rspack(config, { appendPlugins }) {
      if (process.env.RSDOCTOR === 'true') {
        appendPlugins(
          new RsdoctorRspackPlugin({
            // plugin options
            supports: { banner: true },
          }),
        );
      }
    },
  },
});
