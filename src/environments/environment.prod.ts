import { AuthMethods, AuthProviders } from 'angularfire2';

export const environment = {
  production: true,  
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
