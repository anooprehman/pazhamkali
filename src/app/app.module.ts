import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { ColorChangeDirective } from '../directives/color-change/color-change';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyAJF5weT3f9aylmlP7lh-Z5O0wolgYnACA",
    authDomain: "pazhamkali.firebaseapp.com",
    databaseURL: "https://pazhamkali.firebaseio.com",
    projectId: "pazhamkali",
    storageBucket: "pazhamkali.appspot.com",
    messagingSenderId: "981135211443"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ColorChangeDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
