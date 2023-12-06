import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule

import { PagesRoutingModule } from './pages-routing.module';
import { MainLayoutComponent } from './templates/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [MainLayoutComponent, HomeComponent],
  imports: [
    CommonModule,

    ReactiveFormsModule,

    PagesRoutingModule,

    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,

    // ToastrModule.forRoot(), // ToastrModule added

  ],
})
export class PagesModule {}
