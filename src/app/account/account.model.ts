import {User} from '../user/user.model';

export interface Account {
    id: number;
    address?: string;
    name: string;
    users?: User[];
    fields?: string[];
}
