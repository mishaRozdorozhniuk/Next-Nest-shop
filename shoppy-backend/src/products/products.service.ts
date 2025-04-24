import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(data: CreateProductRequest, userId: number) {
    return this.prismaService.product.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async getProducts() {
    const products = await this.prismaService.product.findMany();

    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageExists: await this.imageExists(product.id),
      })),
    );
  }

  async deleteProduct(userId: number, productId: number) {
    const product = await this.prismaService.product.findFirst({
      where: {
        id: productId,
        userId,
      },
    });

    if (!product) {
      throw new NotFoundException(
        'Product not found or you do not have permission to delete it.',
      );
    }

    const imageExists = await this.imageExists(productId);
    if (imageExists) {
      await this.deleteProductImage(productId);
    }

    return await this.prismaService.product.delete({
      where: {
        id: productId,
      },
    });
  }

  async deleteProductImage(productId: number) {
    const imagePath = join(
      __dirname,
      '../../',
      `public/products/${productId}.jpg`,
    );

    try {
      await fs.unlink(imagePath);
    } catch (error) {
      console.error('Error deleting product image:', error);
    }
  }

  private async imageExists(productId: number) {
    try {
      await fs.access(
        join(__dirname, '../../', `public/products/${productId}.jpg`),
        fs.constants.F_OK,
      );

      return true;
    } catch (error) {
      return false;
    }
  }
}
