import i18n from 'i18n-js';
import { NativeModules, Platform } from 'react-native';
import es from './../../assets/translations/es.json';
import en from './../../assets/translations/en.json';

i18n.defaultLocale = 'en';

/**
 * According to the operative system, we take the local user language, after that we make a substring with the first two characters
 * so we avoid create a lot of cases because any language have some variations, for example: 'en', 'en_US', 'en_UK', etc. we only take 'en'
 * for the english, however in the future as the app evolve we can evolve the translations files to get cover any variation of the supported languages
 */
i18n.locale =
    Platform.OS === 'ios' ?
        NativeModules.SettingsManager.settings.AppleLocale.substring(0, 2)
    :
        NativeModules.I18nManager.localeIdentifier.substring(0, 2);

/**
 * Flag to support fallbacks, that means, when it's true, if the app can't find a translation for the user language (i18n.locale property)
 * takes the default language (i18n.defaultLocale property)
 * For some reason this flag is false by default. So don't remove this line, at least that we have all the languages covered, in this case
 * we can remove it
 */
i18n.fallbacks = true;
i18n.translations = { es, en };

/**
 * Returns the translation of the content based on the given scope and
 * with the given options
 * @param {string} scope Route of the element to translate on the files inside of folder translations
 * @param {object} options Object with aditional parameters to add
 * @returns {string} Translated text
 * @example translate('welcomeMessage', { userName: 'DHVS' }): 'Welcome DHVS'
 */
export function translate(scope, options) {
    return i18n.t(scope, options);
}