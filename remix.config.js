/** @type {import('@remix-run/dev').AppConfig} */
import { flatRoutes } from 'remix-flat-routes'

export default {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  routes: async (defineRoutes) => {
    return flatRoutes('routes', defineRoutes)
  },
}
