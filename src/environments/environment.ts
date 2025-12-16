// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_backend: "https://2a326101-99a7-41ba-95c0-3b84e4c35c34.mock.pstmn.io",
  url_security: "https://b644ca29-b559-4216-b08f-cb8d86333f4b.mock.pstmn.io",
  url_web_socket: "http://localhost:5000", // Backend principal
  url_reports: "http://localhost:3000", // JSON Server para reportes (puerto 3000)
  geminiApiKey: "YOUR_GROQ_API_KEY_HERE", // Get from https://console.groq.com/keys
  firebase: {
    apiKey: "AIzaSyB06Inj1NUHSwtPTzZKlUxgN82YbSmsNQQ",
    authDomain: "delivery-system-auth.firebaseapp.com",
    projectId: "delivery-system-auth",
    storageBucket: "delivery-system-auth.firebasestorage.app",
    messagingSenderId: "770870984180",
    appId: "1:770870984180:web:e46f837ccbab4f0b808da1",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
