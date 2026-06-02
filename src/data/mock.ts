export type StoreStatus = "Ativa" | "Inativa";
export type OrderStatus =
  | "Novo"
  | "Em preparo"
  | "Saiu para entrega"
  | "Entregue"
  | "Cancelado";

export type Adega = {
  id: number;
  nome: string;
  bairro: string;
  cidade: string;
  whatsapp: string;
  status: StoreStatus;
  avaliacao: string;
  entrega: string;
};

export type Produto = {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  ativo: boolean;
  emoji: string;
  imageUrl: string;
};

export type Pedido = {
  numero: string;
  cliente: string;
  telefone: string;
  endereco: string;
  adega: string;
  itens: string[];
  valor: number;
  pagamento: string;
  status: OrderStatus;
  data: string;
};

export type Usuario = {
  id: number;
  responsavel: string;
  email: string;
  telefone: string;
  adega: string;
  tipo: "Dono da adega" | "Operador";
};

export const adegas: Adega[] = [
  {
    id: 1,
    nome: "Adega dos Altos",
    bairro: "Tambore",
    cidade: "Barueri",
    whatsapp: "(11) 98888-1001",
    status: "Ativa",
    avaliacao: "4,9",
    entrega: "20 min",
  },
  {
    id: 2,
    nome: "Adega Alphaville",
    bairro: "Alphaville",
    cidade: "Santana de Parnaiba",
    whatsapp: "(11) 97777-1002",
    status: "Ativa",
    avaliacao: "4,8",
    entrega: "25 min",
  },
  {
    id: 3,
    nome: "Adega Central",
    bairro: "Centro",
    cidade: "Barueri",
    whatsapp: "(11) 96666-1003",
    status: "Inativa",
    avaliacao: "4,7",
    entrega: "30 min",
  },
];

export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Heineken 600ml",
    categoria: "Cervejas",
    preco: 11.9,
    estoque: 48,
    ativo: true,
    emoji: "\u{1F37A}",
    imageUrl: "/images/heineken.jpg",
  },
  {
    id: 2,
    nome: "Corona Long Neck",
    categoria: "Cervejas",
    preco: 9.9,
    estoque: 36,
    ativo: true,
    emoji: "\u{1F37A}",
    imageUrl: "/images/corona.jpg",
  },
  {
    id: 3,
    nome: "Gelo 5kg",
    categoria: "Gelo",
    preco: 12,
    estoque: 18,
    ativo: true,
    emoji: "\u{1F9CA}",
    imageUrl: "/images/gelo.jpg",
  },
  {
    id: 4,
    nome: "Carv\u00e3o 3kg",
    categoria: "Carv\u00e3o",
    preco: 18,
    estoque: 12,
    ativo: true,
    emoji: "\u{1F525}",
    imageUrl: "/images/carvao.jpg",
  },
  {
    id: 5,
    nome: "Red Bull",
    categoria: "Energ\u00e9ticos",
    preco: 10,
    estoque: 24,
    ativo: true,
    emoji: "\u{1F964}",
    imageUrl: "/images/redbull.jpg",
  },
  {
    id: 6,
    nome: "Whisky Red Label",
    categoria: "Destilados",
    preco: 89.9,
    estoque: 6,
    ativo: false,
    emoji: "\u{1F943}",
    imageUrl: "/images/whisky-red-label.jpg",
  },
];

export const pedidos: Pedido[] = [
  {
    numero: "#1001",
    cliente: "Thiago Martins",
    telefone: "(11) 98888-1234",
    endereco: "Rua X, 120",
    adega: "Adega dos Altos",
    itens: ["2x Heineken", "1x Gelo"],
    valor: 35.8,
    pagamento: "PIX no site",
    status: "Saiu para entrega",
    data: "02/06/2026",
  },
  {
    numero: "#1002",
    cliente: "Ana Clara",
    telefone: "(11) 97777-4321",
    endereco: "Av. Copacabana, 55",
    adega: "Adega Alphaville",
    itens: ["4x Corona", "1x Red Bull"],
    valor: 49.6,
    pagamento: "Cart\u00e3o na entrega",
    status: "Novo",
    data: "02/06/2026",
  },
  {
    numero: "#1003",
    cliente: "Bruno Lima",
    telefone: "(11) 96666-7788",
    endereco: "Rua das Flores, 87",
    adega: "Adega Central",
    itens: ["1x Whisky Red Label", "1x Carv\u00e3o"],
    valor: 107.9,
    pagamento: "Dinheiro",
    status: "Em preparo",
    data: "01/06/2026",
  },
];

export const usuarios: Usuario[] = [
  {
    id: 1,
    responsavel: "Marcos Silva",
    email: "marcos@adegadosaltos.com",
    telefone: "(11) 98888-1001",
    adega: "Adega dos Altos",
    tipo: "Dono da adega",
  },
  {
    id: 2,
    responsavel: "Paula Nunes",
    email: "paula@adegaalphaville.com",
    telefone: "(11) 97777-1002",
    adega: "Adega Alphaville",
    tipo: "Operador",
  },
];

export const formatarMoeda = (valor: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
