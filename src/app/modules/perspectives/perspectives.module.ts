import { NgModule } from '@angular/core';
import { PerspectivesListComponent } from './pages/perspectives-list/perspectives-list.component';
import { CommonModule } from '../../../../node_modules/@angular/common';
import { PerspectivesRoutingModule } from './perspectives-routing.module';
import { PartialsModule } from '../partials/partials.module';
import { PerspectiveService } from './services/perspectives.service';

@NgModule({
    imports: [
        CommonModule,
        PerspectivesRoutingModule,
        PartialsModule
    ],
    declarations: [
        PerspectivesListComponent
    ],
    providers: [
        PerspectiveService
    ]
})
export class PerspectivesModule {}
