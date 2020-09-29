export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyCaEqnuR5Gbx_iAswbXuOBq1597MPUvMP4',
    authDomain: 'item-crud.firebaseapp.com',
    databaseURL: 'https://item-crud.firebaseio.com',
    projectId: 'item-crud',
    storageBucket: 'item-crud.appspot.com',
    messagingSenderId: '798810369231',
    appId: '1:798810369231:web:271e8fbb9476aaa8d55bba',
    measurementId: 'G-BYQFVXV1ZL',
    clientId:
      '798810369231-0hd8p36r9upic1rfplfs0b0jp1obl8m7.apps.googleusercontent.com',
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    ],
    scope: [
      'email',
      'profile',
      'https://www.googleapis.com/auth/calendar',
    ].join(' '),
  },
};
