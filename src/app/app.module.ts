import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainEmailComponent} from './main-email/main-email.component';
import {createCustomElement} from '@angular/elements';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainEmailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [MainEmailComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const customButton = createCustomElement(MainEmailComponent, { injector });
    customElements.define('main-email', customButton);
  }
  ngDoBootstrap() {}
}
