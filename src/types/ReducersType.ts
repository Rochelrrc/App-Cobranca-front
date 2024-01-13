interface ClientType {
  id: number;
  associado_id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  complemento: string;
  uf: string;
  status: string;
}

interface BillType {
  cliente_id: number;
  descricao: string;
  id: number;
  nome_cliente: string;
  status: string;
  valor: number;
  vencimento: string;
}
