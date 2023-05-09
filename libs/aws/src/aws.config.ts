import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { AwsCredentialIdentityProvider } from '@aws-sdk/types';

export class AwsModuleOptions {
  identities?: Record<string, AwsCredentialIdentityProvider>;
  textract?: string | boolean;
}

export const defaultAwsModuleOptions: AwsModuleOptions = {
  identities: {
    default: defaultProvider(),
  },
};
