import WebApp from "@twa-dev/sdk";

const HEADER_AND_FOOTER_SIZE = 167;
alert(WebApp.viewportHeight);
export const heightProportion =
  (WebApp.viewportHeight || window.innerHeight) - HEADER_AND_FOOTER_SIZE;
