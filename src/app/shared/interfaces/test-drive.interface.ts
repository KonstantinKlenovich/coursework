import { AutoWithId } from "./auto.interface";
import { UserEmailAndNameAndId } from "./user.interface";

export interface TestDriveInfo {
  auto: AutoWithId;
  user: UserEmailAndNameAndId;
  date: Date;
}

export interface TestDriveInfoFirebase {
  [key: string]: TestDriveInfo;
}

export interface NameTestDrive {
  name: string;
}