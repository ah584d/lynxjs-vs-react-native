import i18next from 'i18next';
import en from './locales/en.json';
const localI18nInstance = i18next.createInstance();
const localesContext = import.meta.webpackContext('./locales', {
    recursive: false,
    regExp: /\.json$/,
});
localI18nInstance.init({
    lng: 'en',
    compatibilityJSON: 'v4',
    resources: Object.fromEntries(localesContext.keys().map(key => [
        key.match(/\/([^/]+)\.json$/)?.[1] || key,
        {
            translation: localesContext(key),
        },
    ])),
});
export { localI18nInstance as i18n };
export const t = (key) => {
    return localI18nInstance.t(key);
};
