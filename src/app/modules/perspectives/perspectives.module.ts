import { NgModule } from '@angular/core';
import { PerspectivesListComponent } from './pages/perspectives-list/perspectives-list.component';
import { CommonModule } from '@angular/common';
import { PerspectivesRoutingModule } from './perspectives-routing.module';
import { PartialsModule } from '../partials/partials.module';
import { PerspectiveService } from './services/perspectives.service';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AuthorsService } from './services/authors.service';
import { CategoriesService } from './services/categories.service';
import { CreatePerspectiveComponent } from './pages/create-perspective/create-perspective.component';
import { PerspectiveProfileComponent } from './pages/perspective-profile/perspective-profile.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import {AuthorsListComponent } from './pages/authors-list/authors-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PerspectivesRoutingModule,
        PartialsModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        SharedModule
    ],
    declarations: [
        PerspectivesListComponent,
        CreatePerspectiveComponent,
        PerspectiveProfileComponent,
        CategoriesListComponent,
        AuthorsListComponent
    ],
    providers: [
        PerspectiveService, AuthorsService, CategoriesService
    ]
})
export class PerspectivesModule {}
