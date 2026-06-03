import vercelIntegration from "../index.js";
function staticAdapter(config) {
  console.warn(
    'The "@astrojs/vercel/static" import is deprecated and will be removed in a future release. Please import from "@astrojs/vercel" instead.'
  );
  return vercelIntegration(config);
}
export {
  staticAdapter as default
};
