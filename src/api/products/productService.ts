// app/api/products/productService.ts

import { PrismaClient } from "@prisma/client";
import { Product } from "@/app/types/product";

const prisma = new PrismaClient();

// 02-Funções e Métodos - Funções utilitárias para mocks
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

// 02-Funções e Métodos - Funções para manipulação de produtos

export const getProductsFromDb = async (): Promise<Product[]> => {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    console.error("Erro ao buscar produtos no banco:", error);
    // Retorna mock em caso de erro
    return [...fallbackProducts, ...mockProducts];
  }
};

export const getProductByIdFromDb = async (id: number): Promise<Product | null> => {
  try {
    return await prisma.product.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Erro ao buscar produto pelo ID no banco:", error);
    return null;
  }
};

export const createProductInDb = async (data: Product): Promise<Product> => {
  try {
    return await prisma.product.create({
      data,
    });
  } catch (error) {
    console.error("Erro ao criar produto no banco:", error);
    throw new Error("Erro ao criar produto");
  }
};

export const updateProductInDb = async (id: number, data: Partial<Product>): Promise<Product> => {
  try {
    return await prisma.product.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Erro ao atualizar produto no banco:", error);
    throw new Error("Erro ao atualizar produto");
  }
};

export const deleteProductFromDb = async (id: number): Promise<void> => {
  try {
    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Erro ao excluir produto no banco:", error);
    throw new Error("Erro ao excluir produto");
  }
};

// 04-Objetos - Retorno dos produtos ou erro
export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...fallbackProducts, ...mockProducts]), 500));
};

export const getProductById = async (id: number): Promise<Product | null> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve([...fallbackProducts, ...mockProducts].find((p) => p.id === id) || null), 500)
  );
};
