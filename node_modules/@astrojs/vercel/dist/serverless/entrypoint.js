import "./polyfill.js";
import { NodeApp } from "astro/app/node";
import { setGetEnv } from "astro/env/setup";
import {
  ASTRO_LOCALS_HEADER,
  ASTRO_MIDDLEWARE_SECRET_HEADER,
  ASTRO_PATH_HEADER,
  ASTRO_PATH_PARAM
} from "../index.js";
setGetEnv((key) => process.env[key]);
const createExports = (manifest, {
  middlewareSecret,
  skewProtection
}) => {
  const app = new NodeApp(manifest);
  const handler = async (req, res) => {
    const url = new URL(`https://example.com${req.url}`);
    const clientAddress = req.headers["x-forwarded-for"];
    const localsHeader = req.headers[ASTRO_LOCALS_HEADER];
    const middlewareSecretHeader = req.headers[ASTRO_MIDDLEWARE_SECRET_HEADER];
    const realPath = req.headers[ASTRO_PATH_HEADER] ?? url.searchParams.get(ASTRO_PATH_PARAM);
    if (typeof realPath === "string") {
      req.url = realPath;
    }
    let locals = {};
    if (localsHeader) {
      if (middlewareSecretHeader !== middlewareSecret) {
        res.statusCode = 403;
        res.end("Forbidden");
        return;
      }
      locals = typeof localsHeader === "string" ? JSON.parse(localsHeader) : JSON.parse(localsHeader[0]);
    }
    delete req.headers[ASTRO_MIDDLEWARE_SECRET_HEADER];
    if (skewProtection && process.env.VERCEL_SKEW_PROTECTION_ENABLED === "1") {
      req.headers["x-deployment-id"] = process.env.VERCEL_DEPLOYMENT_ID;
    }
    const webResponse = await app.render(req, {
      addCookieHeader: true,
      clientAddress,
      locals
    });
    await NodeApp.writeResponse(webResponse, res);
  };
  return {
    default: handler
  };
};
function start() {
}
export {
  createExports,
  start
};
