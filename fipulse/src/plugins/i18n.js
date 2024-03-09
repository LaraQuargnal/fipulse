import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

createApp().use(createI18n());

const messages = {
    'en': {
        navBarHome: 'Home',
        navBarLogin: 'Login',
        navBarSignup: 'Signup',
        navBarLanguage: 'Language',
        navBarSearch: 'Search',
        loginTitle: 'Login to Your Account',
        loginNoAccountYet: 'Don`t have an account yet?',
        signUp: 'Sign up',
        loginEmailAddress: 'Email address',
        enterEmail: 'Enter email',
        loginEmailNote: 'We`ll never share your email with anyone else.',
        passwordLabel: 'Password',
        submit: 'Submit',
        signupTitle: 'Sign up',
        signupName: 'Name',
        chooseName: 'Choose nick name',
        confirmPassword: 'Confirm Password',
        alreadyhaveAccount: 'Already have an account?'



    },
    'hr':{
        navBarHome: 'Početna',
        navBarLogin: 'Prijava',
        navBarSignup: 'Registracija',
        navBarLanguage: 'Jezik',
        navBarSearch: 'Pretraživanje',
        loginTitle: 'Prijava korisnika',
        loginNoAccountYet: 'Nemate korisnički račun?',
        signUp: 'Registrirajte se',
        loginEmailAddress: 'Email adresa',
        enterEmail: 'Unesite email',
        loginEmailNote: 'Nikada nećemo dijeliti vaše podatke.',
        passwordLabel: 'Lozinka',
        submit: 'Pošalji',
        signupTitle: 'Registracija',
        signupName: 'Ime',
        chooseName: 'Izaberite nadimak',
        confirmPassword: 'Potvrdi lozinku',
        alreadyhaveAccount: 'Već imate račun?'

    }
};

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'hr',
    messages,
  });

export default i18n;