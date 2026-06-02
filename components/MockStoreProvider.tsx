"use client";

import {
  adegas as adegasIniciais,
  pedidos as pedidosIniciais,
  produtos as produtosIniciais,
  usuarios as usuariosIniciais,
  type Adega,
  type Pedido,
  type Produto,
  type OrderStatus,
  type StoreStatus,
  type Usuario,
} from "@/src/data/mock";
import {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";

type NovaAdegaInput = {
  nome: string;
  whatsapp: string;
  endereco: string;
  bairro: string;
  cidade: string;
  horario: string;
  pix: string;
  documento: string;
  status: StoreStatus;
};

type NovoProdutoInput = {
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  ativo: boolean;
  emoji: string;
  imageUrl: string;
};

type CriarPedidoInput = {
  cliente: string;
  telefone: string;
  endereco: string;
  pagamento: string;
};

type CarrinhoItem = {
  produto: Produto;
  quantidade: number;
};

type MockStoreContextValue = {
  adegas: Adega[];
  produtos: Produto[];
  pedidos: Pedido[];
  usuarios: Usuario[];
  carrinho: CarrinhoItem[];
  ultimoPedido: Pedido | null;
  adicionarAdega: (adega: NovaAdegaInput) => Adega;
  adicionarProduto: (produto: NovoProdutoInput) => Produto;
  removerProduto: (produtoId: number) => void;
  adicionarAoCarrinho: (produtoId: number) => void;
  removerDoCarrinho: (produtoId: number) => void;
  limparCarrinho: () => void;
  criarPedido: (pedido: CriarPedidoInput) => Pedido;
  atualizarStatusPedido: (numero: string, status: OrderStatus) => void;
};

const MockStoreContext = createContext<MockStoreContextValue | null>(null);

export function MockStoreProvider({ children }: { children: ReactNode }) {
  const [adegas, setAdegas] = useState<Adega[]>(adegasIniciais);
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais);
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciais);
  const [usuarios] = useState<Usuario[]>(usuariosIniciais);
  const [carrinhoProdutos, setCarrinhoProdutos] = useState<
    { produtoId: number; quantidade: number }[]
  >([]);
  const [ultimoPedido, setUltimoPedido] = useState<Pedido | null>(null);

  const adicionarAdega = (novaAdega: NovaAdegaInput) => {
    const adega: Adega = {
      id: Date.now(),
      nome: novaAdega.nome,
      bairro: novaAdega.bairro,
      cidade: novaAdega.cidade,
      whatsapp: novaAdega.whatsapp,
      status: novaAdega.status,
      avaliacao: "5,0",
      entrega: "30 min",
    };

    setAdegas((atuais) => [adega, ...atuais]);
    return adega;
  };

  const adicionarProduto = (novoProduto: NovoProdutoInput) => {
    const produto: Produto = {
      id: Date.now(),
      ...novoProduto,
    };

    setProdutos((atuais) => [produto, ...atuais]);
    return produto;
  };

  const removerProduto = (produtoId: number) => {
    setProdutos((atuais) => atuais.filter((produto) => produto.id !== produtoId));
    setCarrinhoProdutos((atuais) =>
      atuais.filter((item) => item.produtoId !== produtoId),
    );
  };

  const adicionarAoCarrinho = (produtoId: number) => {
    setCarrinhoProdutos((atuais) => {
      const itemExistente = atuais.find((item) => item.produtoId === produtoId);

      if (itemExistente) {
        return atuais.map((item) =>
          item.produtoId === produtoId
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...atuais, { produtoId, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (produtoId: number) => {
    setCarrinhoProdutos((atuais) =>
      atuais
        .map((item) =>
          item.produtoId === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  };

  const limparCarrinho = () => {
    setCarrinhoProdutos([]);
  };

  const criarPedido = (novoPedido: CriarPedidoInput) => {
    const carrinho = carrinhoProdutos
      .map((item) => {
        const produto = produtos.find((produto) => produto.id === item.produtoId);
        return produto ? { produto, quantidade: item.quantidade } : null;
      })
      .filter((item): item is CarrinhoItem => item !== null);

    const valor = carrinho.reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0,
    );

    const pedido: Pedido = {
      numero: `#${1000 + pedidos.length + 1}`,
      cliente: novoPedido.cliente,
      telefone: novoPedido.telefone,
      endereco: novoPedido.endereco,
      adega: adegas[0]?.nome ?? "Adega Saideira",
      itens: carrinho.map(
        (item) => `${item.quantidade}x ${item.produto.nome}`,
      ),
      valor,
      pagamento: novoPedido.pagamento,
      status: "Novo",
      data: new Intl.DateTimeFormat("pt-BR").format(new Date()),
    };

    setPedidos((atuais) => [pedido, ...atuais]);
    setUltimoPedido(pedido);
    limparCarrinho();
    return pedido;
  };

  const atualizarStatusPedido = (numero: string, status: OrderStatus) => {
    setPedidos((atuais) =>
      atuais.map((pedido) =>
        pedido.numero === numero ? { ...pedido, status } : pedido,
      ),
    );
    setUltimoPedido((pedido) =>
      pedido?.numero === numero ? { ...pedido, status } : pedido,
    );
  };

  const carrinho = carrinhoProdutos
    .map((item) => {
      const produto = produtos.find((produto) => produto.id === item.produtoId);
      return produto ? { produto, quantidade: item.quantidade } : null;
    })
    .filter((item): item is CarrinhoItem => item !== null);

  const value = {
    adegas,
    produtos,
    pedidos,
    usuarios,
    carrinho,
    ultimoPedido,
    adicionarAdega,
    adicionarProduto,
    removerProduto,
    adicionarAoCarrinho,
    removerDoCarrinho,
    limparCarrinho,
    criarPedido,
    atualizarStatusPedido,
  };

  return (
    <MockStoreContext.Provider value={value}>
      {children}
    </MockStoreContext.Provider>
  );
}

export function useMockStore() {
  const context = useContext(MockStoreContext);

  if (!context) {
    throw new Error("useMockStore deve ser usado dentro de MockStoreProvider");
  }

  return context;
}
