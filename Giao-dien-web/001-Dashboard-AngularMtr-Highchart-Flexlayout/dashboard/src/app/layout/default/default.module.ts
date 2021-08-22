import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';

// Angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

// FlexLayout
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardService } from 'src/app/modules/dashboard.service';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule, // user <router-outlet>
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,

    FlexLayoutModule
  ],
  providers:[
    DashboardService
  ]
})
export class DefaultModule { }
