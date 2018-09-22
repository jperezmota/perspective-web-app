import { ConfigModel } from '../core/interfaces/config';

export class PagesConfig implements ConfigModel {
	public config: any = {};

	constructor() {
		this.config = {
			'/': {
				page: {
					title: 'Dashboard',
					desc: 'Latest updates and statistic charts'
				}
			},
			perspectives: {
				page: { title: 'Perspectives', desc: 'Perspectives' }
			},
			authors: {
				page: { title: 'Authors', desc: 'Authors' }
			},
			categories: {
				page: { title: 'Categories', desc: 'Categories' }
			},
			builder: {
				page: { title: 'Layout Builder', desc: 'Layout builder' }
			},
			header: {
				actions: {
					page: { title: 'Actions', desc: 'actions example page' }
				}
			},
			profile: {
				page: { title: 'User Profile', desc: '' }
			},
			404: {
				page: { title: '404 Not Found', desc: '', subheader: false }
			}
		};
	}
}
