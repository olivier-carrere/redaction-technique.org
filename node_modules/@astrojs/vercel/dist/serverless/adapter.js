import vercelIntegration from "../index.js";
function serverless(config) {
  console.warn(
    'The "@astrojs/vercel/serverless" import is deprecated and will be removed in a future release. Please import from "@astrojs/vercel" instead.'
  );
  return vercelIntegration(config);
}
export {
  serverless as default
};
