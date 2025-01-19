import { Body, Controller, Inject, Post, Provide } from '@midwayjs/core';
import { BaseController } from '@certd/lib-server';
import { Constants } from '@certd/lib-server';
import { EmailService } from '../../../modules/basic/service/email-service.js';

/**
 */
@Provide()
@Controller('/api/mine/email')
export class EmailController extends BaseController {
  @Inject()
  emailService: EmailService;

  @Post('/test', { summary: Constants.per.authOnly })
  public async test(@Body('receiver') receiver) {
    const userId = super.getUserId();
    await this.emailService.test(userId, receiver);
    return this.ok({});
  }
}
