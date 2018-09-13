import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerspectivesListComponent } from './pages/perspectives-list/perspectives-list.component';

const routes: Routes = [
    {
        path: '',
        component: PerspectivesListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerspectivesRoutingModule {

}
