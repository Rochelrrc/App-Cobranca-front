interface iconsStyleStateProps {
  home: boolean;
  user: boolean;
  file: boolean;
}

interface SearchButtonIconProps {
  search: string;
}

interface OcultEyeProps {
  isActive: {
    eye1: boolean;
    eye2: boolean;
  };
  setIsActive: React.Dispatch<
    React.SetStateAction<{
      eye1: boolean;
      eye2: boolean;
    }>
  >;
}

interface rowItemProps {
  name: string;
  ID: number;
  value: number;
}

interface rowItemProps2 {
  name: string;
  ID: number;
  CPF: string;
}

interface clientRowItemType {
  id: number;
  name: string;
  CPF: string;
  email: string;
  phoneNumber: string;
  status: string;
}

interface billieRowItemType {
  id: number;
  idClient: number;
  dataDeVencimento: string;
  valor: number;
  status: string;
  descricao: string;
}

interface ChargesRowItemType {
  id: number;
  name: string;
  idCharge: number;
  valor: number;
  dataDeVencimento: string;
  status: string;
  descricao: string;
}
