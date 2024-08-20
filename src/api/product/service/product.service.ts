import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/service/prisma.service";
import { Product } from "@prisma/client";
import ApiResponseStatus from "../../../common/response/api.response.status";
import { ProductDto } from "../dto/product.dto";
import { ProductReqDto } from "../dto/product.req.dto";
import { S3Service } from "../../../common/service/s3.service";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService, private readonly s3Service: S3Service) {}

  async findAllProducts(fridgeId: bigint): Promise<ProductDto[]> {
    try {
      const products = await this.prisma.product.findMany({
        select: {
          productId: true,
          productName: true,
          productImg: true,
          date: true,
          description: true
        },
        where: {
          fridgeId: fridgeId,
        }
      })
      return products;
    } catch (error) {
      console.log(error);
      throw ApiResponseStatus.DATABASE_ERROR;
    }
  }

  async createProduct(product: ProductReqDto, image: Express.Multer.File): Promise<string> {
    try {
      let imageUrl: string = '';
      await this.prisma.$transaction(async (prisma)=> {
        const newProduct: Product = await prisma.product.create({
          data: {
            fridgeId: BigInt(product.fridgeId),
            productName: product.productName,
            date: product.date,
            description: product.description,
          }
        });
        if (image!=null) {
          imageUrl = await this.s3Service.uploadFile(image);
          await prisma.product.update({
            where: {productId: newProduct.productId},
            data: {productImg: imageUrl}
          })
        }
      })
      return imageUrl;
    } catch (error) {
      throw ApiResponseStatus.DATABASE_ERROR;
    }
  }

  async findOneProduct(productId: bigint): Promise<ProductDto> {
    try {
      const product = await this.prisma.product.findUnique({
        select: {
          productId: true,
          productName: true,
          productImg: true,
          date: true,
          description: true
        },
        where: {
          productId: productId
        }
      });

      return product;
    } catch (error) {
      throw ApiResponseStatus.DATABASE_ERROR;
    }
  }

  async deleteProduct(productId: bigint): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: {
          productId: productId
        }
      })
    } catch (error) {
      throw ApiResponseStatus.DATABASE_ERROR;
    }
  }

  async updateProduct(product: Product, image: Express.Multer.File): Promise<void> {
    try {
      await this.prisma.$transaction(async (prisma)=>{
        const imageUrl = await this.s3Service.uploadFile(image);
        await prisma.product.update({
          where: {
            productId: product.productId
          },
          data: {
            productName:product.productName,
            description: product.description,
            date: product.date,
            productImg: imageUrl
          }
        })
      });
    } catch (error) {
      throw ApiResponseStatus.DATABASE_ERROR;
    }
  }
}