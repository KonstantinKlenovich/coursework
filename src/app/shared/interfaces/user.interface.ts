export interface UserPasswordAndEmail {
  email: string;
  password: string;
}

export interface UserEmailAndNameAndId {
  email: string;
  name: string;
  id: string;
}

export interface UserPasswordAndEmailAndName {
  password: string;
  email: string;
  name: string;
}

export interface UserFull extends UserPasswordAndEmailAndName {
  id: string;
}

export interface UserFirebase {
  [id: string]: UserPasswordAndEmailAndName;
}

export interface NameFirebaseUser {
  name: string;
}
