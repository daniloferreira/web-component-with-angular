import {Resource} from './resource';
import {Link} from './link';

export class Email implements Resource {
  public type: string;
  public external: boolean;
  public confirmed: boolean;
  public email: string;
  public creationDate: Date;
  public lastUpdateDate: Date;
  _links: Link[];
}
