import { Locale } from "vant";
import enUS from "vant/lib/locale/lang/en-US";
import zhCN from "vant/lib/locale/lang/zh-CN";

export function Locals(a) {
  if (a === "zh") {
    Locale.use("zh", zhCN)
  } else {
    Locale.use("en", enUS)
  }
}
