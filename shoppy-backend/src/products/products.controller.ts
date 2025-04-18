import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductRequest } from './dto/create-product.request';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token.payload.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Body() body: CreateProductRequest,
    @CurrentUser() user: TokenPayload,
  ) {
    return await this.productService.createProduct(body, user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProducts() {
    return await this.productService.getProducts();
  }
}
