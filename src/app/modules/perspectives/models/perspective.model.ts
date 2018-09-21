import { AuthorModel } from './author.model';
import { CategoryModel } from './category.model';

export interface PerspectiveModel {
    id: number;
    perspective: string;
    thoughts?: string;
    author?: AuthorModel;
    category?: CategoryModel;
}
