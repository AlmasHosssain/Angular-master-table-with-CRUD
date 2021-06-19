import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentModule } from './material-component.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { ConfirmBoxComponent } from './components/confirm-box/confirm-box.component';
import { CustomDataPipePipe } from './pipe/custom-data-pipe.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    TableViewComponent,
    ConfirmBoxComponent,
    CustomDataPipePipe
  ],
  imports: [
    CommonModule,
    MaterialComponentModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    MaterialComponentModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    TableViewComponent,
    ConfirmBoxComponent,
  ],
  entryComponents: [
    ConfirmBoxComponent
  ]
})
export class SharedModule { }
