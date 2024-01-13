interface RegisterFormTypes {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface LoginFormTypes {
  email: string;
  password: string;
}

interface EditUserTypes {
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  currentPassword: string;
  newPassword: string;
}

interface ClientFormType {
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  cep: string;
  address: string;
  neighbourhood: string;
  addressDetail: string;
  state: string;
  city: string;
}

interface AddBillFormTypes {
  price: string;
  discription: string;
  date: string;
}

interface EditBillFormTypes {
  price: string;
  discription: string;
  date: string;
}