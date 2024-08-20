import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { ProductDto } from "../dto/product.dto";
import ApiResponse from "../../../common/response/api.response";
import { FileInterceptor } from "@nestjs/platform-express";
import { S3Service } from "../../../common/service/s3.service";
import { Product } from "@prisma/client";
import { ProductReqDto } from "../dto/product.req.dto";

@Controller('app/product')
export class ProductController {
  constructor(private readonly productService: ProductService,
              private readonly s3Sservice: S3Service
  ) {}

  @Get('/:fridgeId')
  async findAllProducts(@Param('fridgeId') fridgeId: bigint): Promise<ApiResponse<ProductDto[]>> {
    try {
        const products = await this.productService.findAllProducts(BigInt(fridgeId));
        return new ApiResponse<ProductDto[]>(products);
    } catch (error) {
      return new ApiResponse(error);
    }
  }

  @Get()
  async findProduct(@Query('productId') productId: bigint): Promise<ApiResponse<ProductDto>> {
    try {
      const product = await this.productService.findOneProduct(BigInt(productId));
      return new ApiResponse<ProductDto>(product);
    } catch (error) {
      return new ApiResponse(error);
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() product: ProductReqDto
  ): Promise<ApiResponse<string>> {
    try {
      const imageUrl = await this.productService.createProduct(product, image);
      return new ApiResponse<string>(imageUrl);
    } catch (error) {
      return new ApiResponse(error);
    }
  }

  @Put()
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() product: Product
  ): Promise<ApiResponse<string>> {
    try {
      await this.productService.updateProduct(product, image);
      return new ApiResponse<string>("상품 업데이트 완료");
    } catch (error) {
      return new ApiResponse(error);
    }
  }
}