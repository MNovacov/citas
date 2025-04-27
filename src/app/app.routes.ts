import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { GestionCitasPage } from './pages/gestion-citas/gestion-citas.page';
import { ConfiguracionPage } from './pages/configuracion/configuracion.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'gestion-citas',
    component: GestionCitasPage,
  },
  {
    path: 'configuracion',
    component: ConfiguracionPage,
  },
];
