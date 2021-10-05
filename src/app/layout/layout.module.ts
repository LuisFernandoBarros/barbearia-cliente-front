import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarbeariaModule } from './barbearia/barbearia.module';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';


@NgModule({
  declarations: [  
    LayoutComponent
  ],
  imports: [    
    LayoutRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BarbeariaModule
  ]
})
export class LayoutModule { }
