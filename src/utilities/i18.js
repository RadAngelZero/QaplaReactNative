import i18n from 'i18n-js';
import { NativeModules, Platform } from 'react-native';
import es from './../../assets/translations/es.json';
import en from './../../assets/translations/en.json';

i18n.defaultLocale = 'es';

/**
 * According to the operative system, we take the local user language, after that we make a substring with the first two characters
 * so we avoid create a lot of cases because any language have some variations, for example: 'en', 'en_US', 'en_UK', etc. we only take 'en'
 * for the english, however in the future as the app evolve we can evolve the translations files to get cover any variation of the supported languages
 */
i18n.locale =
    Platform.OS === 'ios' ?
        NativeModules.SettingsManager.settings.AppleLocale === undefined ?
            NativeModules.SettingsManager.settings.AppleLanguages[0].substring(0, 2)
            :
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
 * Returns the translation of the content based on the given key and
 * with the given options
 * For options see: https://github.com/fnando/i18n-js/wiki/Usage
 * @param {string} key Route of the element to translate on the files inside of folder translations
 * @param {object} options Object with aditional parameters to add on the text
 * @returns {string} Translated text
 * @example For translation: "messages": { "welcomMessage": "Welcome %{userName}" } Use: translate('messages.welcomeMessage', { userName: 'DHVS' }) returns: 'Welcome DHVS'
 * Optionaly you can set the scope in the options
 * @example For translation: "messages": { "welcomMessage": "Welcome %{userName}" } Use: translate('welcomeMessage', { userName: 'DHVS', scope: 'messages' }) returns: 'Welcome DHVS'
 */
export function translate(key, options) {
    return i18n.t(key, options);
}

export function getLocaleLanguage() {
    return i18n.locale;
}