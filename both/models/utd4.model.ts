import { CollectionObject } from './collection-object.model';

export interface Utd4 extends CollectionObject {
  utdstr: string;
  owner?: string;
  public: boolean;
  dynamic: boolean;

}

