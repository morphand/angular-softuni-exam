import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CoreModule } from './app/core/core.module';
import { authReducer } from './app/auth/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { httpInterceptorProviders } from './app/app.interceptors';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, StoreModule.forRoot({ auth: authReducer }), CoreModule, StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true })),
        httpInterceptorProviders,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
    ]
})
  .catch(err => console.error(err));
