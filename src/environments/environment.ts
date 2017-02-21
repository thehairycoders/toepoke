import { AuthMethods, AuthProviders } from 'angularfire2';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,  
  firebaseConfig:  {
    apiKey: 'AIzaSyCnl5ZVn0PKbmbgTg1KwzyjDxxE--gsqIk',
    authDomain: 'toepoke-46680.firebaseapp.com',
    databaseURL: 'https://toepoke-46680.firebaseio.com',
    storageBucket: 'toepoke-46680.appspot.com',
    messagingSenderId: '734224259966'
  },
  firebaseAuthConfig: {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  },
  homeRoute: 'dashboard'
};
