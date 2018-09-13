import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerspectivesListComponent } from './pages/perspectives-list/perspectives-list.component';
import { PerspectiveComponent } from './pages/perspective/perspective.component';

const routes: Routes = [
    {
        path: '',
        component: PerspectivesListComponent
    },
    {
        path: ':id',
        component: PerspectiveComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerspectivesRoutingModule {

}
