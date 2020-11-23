export interface User {
  showUserInfo: boolean;
  adressToggle: boolean;
  showAddAdress: boolean;
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  phone: string;
  mail: string;
  password: string;
  check: string;
  formAdress: Array<Adress>;
}

export interface Adress {
  showAdressInfo: boolean;
  adressType: string;
  adress: string;
  city: string;
  country: string;
  postalCode: string;
}
