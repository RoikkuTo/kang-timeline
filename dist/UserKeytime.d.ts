import Timestamp from './Timestamp';
export interface UserKeytime {
    id: number;
    timestamp: number;
    task: (params: Timestamp) => void;
}
export default class UserKeytimes {
    list: UserKeytime[];
    index: number;
    add(keytime: Omit<UserKeytime, 'id'>): void;
    remove(id: UserKeytime['id']): void;
    compare(ts: Timestamp): void;
}
