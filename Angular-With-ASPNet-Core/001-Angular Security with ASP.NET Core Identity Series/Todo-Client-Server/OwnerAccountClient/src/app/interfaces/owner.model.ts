import { Account } from "./account.model";

export interface Owner {
  ownerId: number;
  name: string;
  dateOfBirth: Date;
  address: string;
  accounts?: Account[];
}
