import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
    importProvidersFrom([
      provideFirebaseApp(()=>initializeApp({
        apiKey: "AIzaSyAn3EK0ykGZ6Rij3Iplf8FpovrlXzJYS1s",
        authDomain: "coffe-shop-1694c.firebaseapp.com",
        projectId: "coffe-shop-1694c",
        storageBucket: "coffe-shop-1694c.appspot.com",
        messagingSenderId: "646532608909",
        appId: "1:646532608909:web:81314ce8ad1af26ccb43c4",
        measurementId: "G-6YLZB1PLBM"
      })  
      ),
      provideAuth(()=>getAuth())
    ])
]
};
