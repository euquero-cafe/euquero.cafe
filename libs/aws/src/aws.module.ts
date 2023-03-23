import { Textract } from "@aws-sdk/client-textract";
import { DynamicModule, Provider } from "@nestjs/common";
import { AwsModuleOptions, defaultAwsModuleOptions } from "./aws.config";

function getCredentials(config: AwsModuleOptions, service: keyof AwsModuleOptions) {
  const element = config[service];
  // true is defaut
  if (element === true) {
    return config.identities.default;
  }

  // string is a key to identities
  if (typeof element === "string") {
    return config.identities[element] ?? config.identities.default;
  }
}

export class AwsModule {
  static register(options: AwsModuleOptions): DynamicModule {
    const config = {
      ...defaultAwsModuleOptions,
      ...options,
      identities: {
        ...defaultAwsModuleOptions.identities,
        ...options.identities
      }
    };

    // provide the config
    const providers: Provider[] = [{ provide: AwsModuleOptions, useValue: config }];
    const exports = [];

    if (config.textract) {
      const credentials = getCredentials(config, "textract");
      providers.push({ provide: Textract, useFactory: () => new Textract({ credentials }) });
      exports.push(Textract);
    }

    return {
      module: AwsModule,
      global: true,
      providers,
      exports
    };
  }
}
