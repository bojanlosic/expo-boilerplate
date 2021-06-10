import i18n from "i18n-js";
import * as Localization from "expo-localization";

import en from "./en";
import de from "./de";
import it from "./it";
import { storageGetItem } from "../core/storage";

i18n.translations = {
  en: en,
  de: de,
  it: it,
};

const setInitialLanguage = async () => {
  let languagePicked;
  try {
    languagePicked = await storageGetItem("languagePicked");
    if (languagePicked) {
      i18n.locale = languagePicked;
    } else {
      // Defaultni na telefonu
      i18n.locale = Localization.locale;
    }
  } catch (error) {
    console.log(error);
  }
};
setInitialLanguage();

i18n.fallbacks = true;

export default i18n;
