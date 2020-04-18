import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClienteComponent, ModalDialogCliente } from './cliente/cliente.component';
import { ColorMadecorComponent } from './color-madecor/color-madecor.component';
import { FerreteriaComponent, ModalDialogFerreteria } from './ferreteria/ferreteria.component';
import { CotizacionMaderaComponent } from './cotizacion-madera/cotizacion-madera.component';
import { CotizacionFerreteriaComponent } from './cotizacion-ferreteria/cotizacion-ferreteria.component';
import { SharedModule } from '../../shared/shared.module';
import { PublicoComponent } from './publico/publico.component';

@NgModule({
  declarations: [
      
  ClienteComponent,
  ColorMadecorComponent,
  FerreteriaComponent,
  CotizacionMaderaComponent,
  CotizacionFerreteriaComponent,
  PublicoComponent,
  ModalDialogFerreteria
],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  
  exports:[
    ClienteComponent,
    PublicoComponent,
    ColorMadecorComponent,
    FerreteriaComponent,
    CotizacionMaderaComponent,
    CotizacionFerreteriaComponent,
    ModalDialogFerreteria
   
  ],
  entryComponents:[ClienteComponent,ModalDialogCliente],
})
export class DyrcocinasModule { }
