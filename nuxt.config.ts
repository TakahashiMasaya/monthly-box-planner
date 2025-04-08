// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/icon', '@nuxt/eslint', '@nuxt/test-utils/module'],
  devtools: { enabled: true },
  serverDir: 'src/server',
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  eslint: {
    // options here
    config: {
      stylistic: true,
    },
  },
})
