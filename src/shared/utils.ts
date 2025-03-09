import WebApp from "@twa-dev/sdk";

const HEADER_AND_FOOTER_SIZE = 207;
export const heightProportion =
  (WebApp.viewportStableHeight || window.innerHeight) - HEADER_AND_FOOTER_SIZE;
