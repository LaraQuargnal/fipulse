import { createI18n } from "vue-i18n";

const messages = {
  en: {
    navBarHome: "Home",
    navBarLogin: "Login",
    navBarSignup: "Signup",
    navBarLanguage: "Language",
    navBarSearch: "Search",
    navBarUserCard: "User Card",
    navBarStudentCorner: "Student Corner",
    navBarLogOut: "Log Out",
    loginTitle: "Login to Your Account",
    loginNoAccountYet: "Don`t have an account yet?",
    signUp: "Sign up",
    loginEmailAddress: "Email address",
    enterEmail: "Enter email",
    loginEmailNote: "We`ll never share your email with anyone else.",
    passwordLabel: "Password",
    submit: "Submit",
    signupTitle: "Sign up",
    signupName: "Name",
    chooseName: "Choose nick name",
    confirmPassword: "Confirm Password",
    alreadyhaveAccount: "Already have an account?",
    navBarPosts: "Posts",
    firstUndergraduate: "1. undergraduate",
    secondUndergraduate: "2. undergraduate",
    thirdUndergraduate: "3. undergraduate",
    firstGraduate: "1. graduate",
    secondGraduate: "2. graduate",
    browseCategories: "BROWSE CATEGORIES",
    users: "USERS",
    addPost: "ADD POST",
    addForum: "ADD POST",
    ForumQue: "What's on your mind?",
    ForumHelp: "Enter post or question",
    Answer: "Enter answer",
    SubmitAnswer: "Submit answer",
    ProfilePic: "Change profile picture",
    UserData: "USER DATA",
    Nick: "Nickname:",
    Pass: "Password:",
    Darknet: "Darknet access:",
    Grade: "Grade:",
    NickChange: "Change nickname",
    Save: "Save",
  },
  hr: {
    navBarHome: "Početna",
    navBarLogin: "Prijava",
    navBarSignup: "Registracija",
    navBarLanguage: "Jezik",
    navBarSearch: "Pretraživanje",
    navBarUserCard: "Kartica korisnika",
    navBarStudentCorner: "Studentski Kutak",
    navBarLogOut: "Odjava korisnika",
    loginTitle: "Prijava korisnika",
    loginNoAccountYet: "Nemate korisnički račun?",
    signUp: "Registrirajte se",
    loginEmailAddress: "Email adresa",
    enterEmail: "Unesite email",
    loginEmailNote: "Nikada nećemo dijeliti vaše podatke.",
    passwordLabel: "Lozinka",
    submit: "Pošalji",
    signupTitle: "Registracija",
    signupName: "Ime",
    chooseName: "Izaberite nadimak",
    confirmPassword: "Potvrdi lozinku",
    alreadyhaveAccount: "Već imate račun?",
    navBarPosts: "Objave",
    firstUndergraduate: "1. preddiplomski",
    secondUndergraduate: "2. preddiplomski",
    thirdUndergraduate: "3. preddiplomski",
    firstGraduate: "1. diplomski",
    secondGraduate: "2. diplomski",
    browseCategories: "PREGLED KATEGORIJA",
    users: "KORISNICI",
    addPost: "DODAJ OBJAVU",
    addForum: "DODAJ OBJAVU",
    ForumQue: "Što ti je na umu?",
    ForumHelp: "Unesi objavu ili pitanje",
    Answer: "Unesi odgovor",
    SubmitAnswer: "Odgovori",
    ProfilePic: "Izmijeni sliku profila",
    UserData: "PODACI KORISNIKA",
    Nick: "Nadimak:",
    Pass: "Lozinka:",
    Darknet: "Pristup Darknet-u:",
    Grade: "Ocjena:",
    NickChange: "Izmijeni nadimak",
    Save: "Spremi",
  },
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "hr",
  messages,
});

export default i18n;
