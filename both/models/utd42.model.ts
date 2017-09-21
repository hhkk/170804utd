import { CollectionObject } from './collection-object.model';

export interface Utd42 extends CollectionObject {
  text: string;
  owner?: string;
  public: boolean;

}

