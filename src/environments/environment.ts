// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import { AuthProviders, AuthMethods } from 'angularfire2';

export const environment = {
  production: false,  
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
