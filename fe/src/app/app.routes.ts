import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/restricted/home/home';
import { LayoutType } from './types/enums';

export const routes: Routes = [
      {
        path: '',
        canActivate: [],
        component: HomePageComponent,
        data: { layoutType: LayoutType.Empty },
      },

    ];
