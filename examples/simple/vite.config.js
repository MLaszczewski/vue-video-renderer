const path = require('path')
const vuePlugin = require('@vitejs/plugin-vue')
import { defineConfig } from 'vite'
import findFreePorts from "find-free-ports"


const ssrTransformCustomDir = () => {
  return {
    props: [],
    needRuntime: true
  }
}

export default defineConfig(async ({ command, mode }) => {
  return {
    define: {
      ENV_BASE_HREF: JSON.stringify(process.env.BASE_HREF || 'http://localhost:8001')
    },
    server: {
      hmr: {
        port: (await findFreePorts())[0]
      }
    },
    plugins: [
      vuePlugin({
        template: {
          compilerOptions: {
            //   whitespace: "preserve",
            directiveTransforms: {
              'ripple': ssrTransformCustomDir,
              'styleclass': ssrTransformCustomDir,
              'badge': ssrTransformCustomDir,
              'shared-element': ssrTransformCustomDir
            }
          }
        },
      })
    ],
    build: {
      minify: false,
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    ssr: {
      external: [
        'debug',
        'vite'
      ],
      noExternal: [
        'vue-meta',
        'vue-video-renderer'
      ]
    },
    optimizeDeps: {
      include: [
        'debug'
      ]
    },

    resolve: {
      alias: [
        { find: 'debug', replacement: 'debug/src/browser.js' },
      ],
    },
    resolvers: [],
  }
})