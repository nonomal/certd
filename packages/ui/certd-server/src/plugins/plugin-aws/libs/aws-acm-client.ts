// 导入所需的 SDK 模块
import { AwsAccess } from '../access.js';
import { CertInfo } from '@certd/plugin-cert';

type AwsAcmClientOptions = { access: AwsAccess; region: string };

export class AwsAcmClient {
  options: AwsAcmClientOptions;
  access: AwsAccess;
  region: string;
  constructor(options: AwsAcmClientOptions) {
    this.options = options;
    this.access = options.access;
    this.region = options.region;
  }
  async importCertificate(certInfo: CertInfo) {
    // 创建 ACM 客户端
    const { ACMClient, ImportCertificateCommand } = await import('@aws-sdk/client-acm');
    const acmClient = new ACMClient({
      region: this.region, // 替换为您的 AWS 区域
      credentials: {
        accessKeyId: this.access.accessKeyId, // 从环境变量中读取
        secretAccessKey: this.access.secretAccessKey,
      },
    });

    const cert = certInfo.crt.split('-----END CERTIFICATE-----')[0] + '-----END CERTIFICATE-----';
    // 构建上传参数
    const data = await acmClient.send(
      new ImportCertificateCommand({
        Certificate: Buffer.from(cert),
        PrivateKey: Buffer.from(certInfo.key),
        // CertificateChain: certificateChain, // 可选
      })
    );
    console.log('Upload successful:', data);
    // 返回证书 ARN（Amazon Resource Name）
    return data.CertificateArn;
  }
}
