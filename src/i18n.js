import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import Backend from 'i18next-xhr-backend';


i18n
.use(Backend)
.use(initReactI18next)
.init({
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'de'],
    interpolation: {
        escapeValue: false,
    },
    backend: {
        loadPath: '/BurgerBuilder/locales/{{lng}}/{{ns}}.json'
    },
    react: {
        useSuspense: true
    }
});

export default i18n;
