import { CollectionObject } from './collection-object.model';

export interface Utd42 extends CollectionObject {
    //datey: string;
    filelineraw: string;
    //texty: string;
    date: string;
    text: string;
    owner?: string;
    public?: boolean;

}
