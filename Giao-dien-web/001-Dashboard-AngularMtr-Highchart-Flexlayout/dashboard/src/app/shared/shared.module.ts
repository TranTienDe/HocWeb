import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Defination
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AreaComponent } from './widgets/area/area.component';

// Angular material
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

// Highcharts
import { HighchartsChartModule } from 'highcharts-angular';

// FlexLayout
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    FlexLayoutModule,
    RouterModule,
    HighchartsChartModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
  ]
})
export class SharedModule { }
