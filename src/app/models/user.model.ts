export interface User {
  show: boolean;
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

interface Adress {
  adressType: string;
  adress: string;
  city: string;
  country: string;
  postalCode: string;
}
