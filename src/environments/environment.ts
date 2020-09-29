// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
