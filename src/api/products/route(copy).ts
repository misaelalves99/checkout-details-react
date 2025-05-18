// app/api/products/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Product } from "@/app/types/product";

const prisma = new PrismaClient();

// 03-Arrays - Produtos simulados para fallback e mocks
const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: 1499.90,
    description: 'Smartphone com tela OLED, 6GB de RAM e 128GB de armazenamento.',
    imageUrl: 'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
    ],
    category: 'electronics',
    oldPrice: 1699.90,
  },
  {
    id: 2,
    name: 'Camiseta Estilosa',
    price: 59.90,
    description: 'Camiseta 100% algodão, disponível em várias cores.',
    imageUrl: 'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
      'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
      'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
    ],
    category: 'clothing',
    oldPrice: 69.90,
  },
  {
    id: 3,
    name: 'Fone de Ouvido Bluetooth',
    price: 299.90,
    description: 'Fone de ouvido sem fio com excelente qualidade de som.',
    imageUrl: 'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
      'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
      'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
    ],
    category: 'electronics',
    oldPrice: 399.90,
  },
  {
    id: 4,
    name: 'Relógio de Pulso',
    price: 249.90,
    description: 'Relógio masculino com design moderno e resistente à água.',
    imageUrl: 'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
      'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
      'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
    ],
    category: 'accessories',
    oldPrice: 269.90,
  },
  {
    id: 5,
    name: 'Jaqueta Casual',
    price: 399.90,
    description: 'Jaqueta estilosa para dias frios.',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
    ],
    category: 'clothing',
    oldPrice: 499.90,
  },
];

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: 1499.90,
    description: 'Smartphone com tela OLED, 6GB de RAM e 128GB de armazenamento.',
    imageUrl: 'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg',
    ],
    category: 'electronics',
    oldPrice: 1699.90,
  },
  {
    id: 2,
    name: 'Camiseta Estilosa',
    price: 59.90,
    description: 'Camiseta 100% algodão, disponível em várias cores.',
    imageUrl: 'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
      'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
      'https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg',
    ],
    category: 'clothing',
    oldPrice: 69.90,
  },
  {
    id: 3,
    name: 'Fone de Ouvido Bluetooth',
    price: 299.90,
    description: 'Fone de ouvido sem fio com excelente qualidade de som.',
    imageUrl: 'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
      'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
      'https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg',
    ],
    category: 'electronics',
    oldPrice: 399.90,
  },
  {
    id: 4,
    name: 'Relógio de Pulso',
    price: 249.90,
    description: 'Relógio masculino com design moderno e resistente à água.',
    imageUrl: 'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
      'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
      'https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg',
    ],
    category: 'accessories',
    oldPrice: 269.90,
  },
  {
    id: 5,
    name: 'Jaqueta Casual',
    price: 399.90,
    description: 'Jaqueta estilosa para dias frios.',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
    images: [
      'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg',
    ],
    category: 'clothing',
    oldPrice: 499.90,
  },
];

// 02-Funções utilitárias para mocks
const getAllMockProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...fallbackProducts, ...mockProducts]), 500));
};

const getProductById = async (id: number): Promise<Product | null> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve([...fallbackProducts, ...mockProducts].find((p) => p.id === id) || null), 500)
  );
};

// 08-API HANDLERS

// GET: Lista todos os produtos
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos no banco:", error);
    const fallback = await getAllMockProducts();
    return NextResponse.json(fallback, { status: 200 });
  }
}

// Novo GET: Obtém um produto específico pelo ID
export async function GET_SINGLE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID do produto é necessário" }, { status: 400 });
  }

  try {
    const product = await getProductById(Number(id));
    if (!product) {
      return NextResponse.json({ message: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return NextResponse.json({ message: "Erro ao buscar produto", error: error instanceof Error ? error.message : "Erro desconhecido" }, { status: 500 });
  }
}

// POST: Cria um novo produto
export async function POST(req: Request) {
  const body = await req.json();
  try {
    const newProduct = await prisma.product.create({ data: body });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json({
      message: "Erro ao criar produto",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }, { status: 500 });
  }
}

// PUT: Atualiza um produto existente
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...data } = body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json({
      message: "Erro ao atualizar produto",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }, { status: 500 });
  }
}

// DELETE: Remove um produto pelo ID
export async function DELETE(req: Request) {
  const { productId } = await req.json();
  try {
    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    return NextResponse.json({
      message: "Erro ao excluir produto",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }, { status: 500 });
  }
}

// 01-Estruturas e Tratamento -
// 02-Funções e Métodos -
// 03-Arrays -
// 04-Objetos -
// 08-Api -