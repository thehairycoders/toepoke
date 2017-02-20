import { AuthProviders, AuthMethods } from 'angularfire2';

export const environment = {
  production: true,  
  firebaseConfig:  {
    apiKey: "AIzaSyB-fwfpjppYf9IkjddQsAKJcjGmn-yHsdY",
    authDomain: "angular2-ngrx-firebase-auth.firebaseapp.com",
    databaseURL: "https://angular2-ngrx-firebase-auth.firebaseio.com",
    storageBucket: "angular2-ngrx-firebase-auth.appspot.com",
    messagingSenderId: "427093340635"
  },
  firebaseAuthConfig: {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  }
};