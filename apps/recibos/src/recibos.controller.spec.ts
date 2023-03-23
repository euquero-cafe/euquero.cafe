import { Test, TestingModule } from '@nestjs/testing';
import { RecibosController } from './recibos.controller';
import { RecibosService } from './recibos.service';

describe('RecibosController', () => {
  let recibosController: RecibosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecibosController],
      providers: [RecibosService],
    }).compile();

    recibosController = app.get<RecibosController>(RecibosController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(recibosController.getHello()).toBe('Hello World!');
    });
  });
});
