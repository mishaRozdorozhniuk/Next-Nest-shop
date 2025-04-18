import { Injectable } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(data: CreateProductRequest, userId: number) {
    await this.prismaService.product.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async getProducts() {
    return this.prismaService.product.findMany();
  }
}
