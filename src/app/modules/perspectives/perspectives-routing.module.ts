import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerspectivesListComponent } from './pages/perspectives-list/perspectives-list.component';
import { PerspectiveProfileComponent } from './pages/perspective-profile/perspective-profile.component';
import { CreatePerspectiveComponent } from './pages/create-perspective/create-perspective.component';

const routes: Routes = [
    {
        path: '',
        component: PerspectivesListComponent
    },
    {
        path: 'create',
        component: CreatePerspectiveComponent
    },
    {
        path: ':id',
        component: PerspectiveProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerspectivesRoutingModule {

}
