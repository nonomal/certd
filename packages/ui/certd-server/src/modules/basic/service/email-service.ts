import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import type { EmailSend } from '@certd/pipeline';
import { IEmailService } from '@certd/pipeline';

import { logger } from '@certd/basic';
import { isComm, isPlus } from '@certd/plus-core';

import nodemailer from 'nodemailer';
import type SMTPConnection from 'nodemailer/lib/smtp-connection';
import { UserSettingsService } from '../../mine/service/user-settings-service.js';
import { PlusService, SysSettingsService, SysSiteInfo } from '@certd/lib-server';
import { getEmailSettings } from '../../sys/settings/fix.js';

export type EmailConfig = {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  secure: boolean; // use TLS
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: boolean;
  };
  sender: string;
  usePlus?: boolean;
} & SMTPConnection.Options;
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class EmailService implements IEmailService {
  @Inject()
  settingsService: UserSettingsService;

  @Inject()
  sysSettingsService: SysSettingsService;
  @Inject()
  plusService: PlusService;

  async sendByPlus(email: EmailSend) {
    if (!isPlus()) {
      throw new Error('plus not enabled');
    }

    /**
     *  userId: number;
     *   subject: string;
     *   content: string;
     *   receivers: string[];
     */

    await this.plusService.sendEmail(email);
  }

  /**
   */
  async send(email: EmailSend) {
    logger.info('sendEmail', email);

    if (!email.receivers || email.receivers.length === 0) {
      throw new Error('收件人不能为空');
    }

    const emailConf = await getEmailSettings(this.sysSettingsService, this.settingsService);

    if (!emailConf.host && emailConf.usePlus == null) {
      if (isPlus()) {
        //自动使用plus发邮件
        return await this.sendByPlus(email);
      }
      throw new Error('邮件服务器还未设置');
    }

    if (emailConf.usePlus && isPlus()) {
      return await this.sendByPlus(email);
    }
    await this.sendByCustom(emailConf, email);
    logger.info('sendEmail complete: ', email);
  }

  private async sendByCustom(emailConfig: EmailConfig, email: EmailSend) {
    const transporter = nodemailer.createTransport(emailConfig);

    let sysTitle = 'Certd';
    if (isComm()) {
      const siteInfo = await this.sysSettingsService.getSetting<SysSiteInfo>(SysSiteInfo);
      if (siteInfo) {
        sysTitle = siteInfo.title || sysTitle;
      }
    }
    let subject = email.subject;
    if (!subject.includes(`【${sysTitle}】`)) {
      subject = `【${sysTitle}】${subject}`;
    }
    const mailOptions = {
      from: `${sysTitle} <${emailConfig.sender}>`,
      to: email.receivers.join(', '), // list of receivers
      subject: subject,
      text: email.content,
    };
    await transporter.sendMail(mailOptions);
  }

  async test(userId: number, receiver: string) {
    await this.send({
      receivers: [receiver],
      subject: '测试邮件,from certd',
      content: '测试邮件,from certd',
    });
  }
}
