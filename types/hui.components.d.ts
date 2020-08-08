import Vue from "vue";

export { Affix } from "./affix";
export { Anchor, AnchorLink } from "./anchor";
export { SvgIcon } from "./svg-icon";
export { Tip } from "./tip";

interface HUIGlobalOptions {
  size?: string;
}

interface HUIInstallOptions extends HUIGlobalOptions {
  locale?: any;
  i18n?: any;
}

declare const API: {
  version: string;
  locale: (l: any) => void;
  i18n: (fn: any) => void;
  install: (Vue: Vue, opts: HUIInstallOptions) => void;
  lang: (code: string) => void;
};

export default API;

declare module "vue/types/vue" {
  interface Vue {
    $HUI: HUIGlobalOptions;
  }
}
