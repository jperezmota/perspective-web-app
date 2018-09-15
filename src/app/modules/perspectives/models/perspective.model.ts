import { AuthorModel } from './author.model';

export interface PerspectiveModel {
    id: number;
    perspective: string;
    author: AuthorModel;
    thoughts: string;
}
