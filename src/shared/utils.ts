import WebApp from "@twa-dev/sdk";

const HEADER_AND_FOOTER_SIZE = 242;
export const heightProportion =
  (WebApp.viewportStableHeight || window.innerHeight) - HEADER_AND_FOOTER_SIZE;
