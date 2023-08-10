import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ContactFormComponent],
  exports: [ContactFormComponent],
})
export class SharedModule {}
