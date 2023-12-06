import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminVideosComponent } from './admin-videos/admin-videos.component';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './templates/main-layout/main-layout.component';

const childrenHomeRoutes: Routes = [
  {
    path: 'admin',
    component: AdminVideosComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: childrenHomeRoutes,
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
