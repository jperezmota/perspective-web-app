import { AuthorityModel } from './authority.model';

export interface UserAuthenticationModel {
    username: string;
    token: string;
    authorities: AuthorityModel[];
}
