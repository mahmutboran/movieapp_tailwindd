import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, signInWithPopup,sendPasswordResetEmail } from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helpers/ToastNotify";

//* Your web app's Firebase configuration

//* Your web app's Firebase configuration
// TODO: Replace the following with your app's Firebase project configuration
//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
//! firebase console settings bölümünden firebaseconfig ayarlarını al
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//? Yeni bir kullanıcı için kull. firebase methodu
export const createUser = async (email, password, navigate, displayName) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    })
    console.log(userCredential);
    navigate("/")
    toastSuccessNotify("Registered successfully")
  } catch (err) {
    toastErrorNotify(err.message)
  }
}

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password
//! Email/password ile girişi enable yap
export const signIn = async (email, password, navigate) => {
  try {
    signInWithEmailAndPassword(auth, email, password)
    navigate("/")
    toastSuccessNotify("Logged in successfully")
  } catch (err) {
    toastErrorNotify(err.message);
  }
}

//? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user
      setCurrentUser({ email, displayName, photoURL })
      console.log(user)
    } else {
      // User is signed out
      setCurrentUser(false);
      console.log("user signed out");
    }
  });
}

export const logOut = () => {
  signOut(auth)
  toastSuccessNotify("Logged out successfully!");
}

//*********************signUpWithGoogle************************ */
//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
//! Google ile girişi enable yap
//* => Authentication => settings => Authorized domains => add domain
//! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle
export const signUpWithGoogle = (navigate) => {
  //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu

  const provider = new GoogleAuthProvider();
  //? Açılır pencere ile giriş yapmak için kullanılan firebase yöntemi
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
      navigate("/")
      toastSuccessNotify("Logged in successfully!");
    }).catch((err) => {
      console.log(err);
    });
}

export const forgotPassword = (email) => {
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      toastWarnNotify("Please check your mail box!");
      // alert("Please check your mail box!");
    })
    .catch((err) => {
      toastErrorNotify(err.message);
      // alert(err.message);
      // ..
    });
};