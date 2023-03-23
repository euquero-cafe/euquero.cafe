import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { RecibosService } from "./recibos.service";

@Controller()
export class RecibosController {
  constructor(private readonly recibosService: RecibosService) {
  }

  @Post("/detect")
  @UseInterceptors(FileInterceptor("image"))
  async detectTotalAmount(@UploadedFile() file: any) {
    return await this.recibosService.detectTotalAmount(file.buffer);
  }
}
