import i18next from 'i18next';
import { Home, Bookings, TermsAndConditions } from './translates'

i18next
    .init({
        compatibilityJSON: 'v3',
        interpolation: {
            // React already does escaping
            escapeValue: false,
        },
        lng: 'en', // 'en' | 'es'
        // Using simple hardcoded resources for simple example
        resources: {
            en: {
                translation: {
                    Home: Home.en,
                    Bookings: Bookings.en,
                    TermsAndConditions: TermsAndConditions.en,
                },
            },
            ar: {
                translation: {
                    Home: Home.ar,
                    Bookings: Bookings.ar,
                    TermsAndConditions: TermsAndConditions.ar,
                },
            },
        },
    })

export default i18next