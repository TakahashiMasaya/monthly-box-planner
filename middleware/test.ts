export default defineNuxtRouteMiddleware((to, from) => {
  console.log('this is middleware')
  // return createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
 return showError({ statusCode: 403, message: '認証されていません'})
  // return abortNavigation(
  //   showError({ statusCode: 403, message: '認証されていません'})
  // )
})