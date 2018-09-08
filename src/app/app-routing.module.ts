import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './modules/pages/snippets/error-page/error-page.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: 'app/modules/pages/pages.module#PagesModule'
	},
	{
		path: 'login',
		// canActivate: [NgxPermissionsGuard],
		loadChildren: './modules/auth/auth.module#AuthModule',
		data: {
			permissions: {
				except: 'ADMIN'
			}
		},
	},
	{
		path: '404',
		component: ErrorPageComponent
	},
	{
		path: 'error/:type',
		component: ErrorPageComponent
	},
	{
		path: '**',
		redirectTo: '404',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
