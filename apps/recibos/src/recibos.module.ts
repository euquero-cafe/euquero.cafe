import { fromIni } from "@aws-sdk/credential-provider-ini";
import { AwsModule } from "@euquero.cafe/aws";
import { Module } from "@nestjs/common";
import { RecibosController } from "./recibos.controller";
import { RecibosService } from "./recibos.service";

@Module({
  imports: [AwsModule.register({
    identities: {
      local: fromIni({ profile: "pulpo" })
    },
    textract: "local"
  })],
  controllers: [RecibosController],
  providers: [RecibosService]
})
export class RecibosModule {}
