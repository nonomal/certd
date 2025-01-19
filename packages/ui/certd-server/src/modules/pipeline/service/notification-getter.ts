import { INotificationService, NotificationSendReq } from '@certd/pipeline';
import { NotificationService } from './notification-service.js';

export class NotificationGetter implements INotificationService {
  userId: number;
  notificationService: NotificationService;

  constructor(userId: number, notificationService: NotificationService) {
    this.userId = userId;
    this.notificationService = notificationService;
  }

  async getDefault() {
    return await this.notificationService.getDefault(this.userId);
  }

  async getById(id: any) {
    return await this.notificationService.getById(id, this.userId);
  }

  async send(req: NotificationSendReq): Promise<void> {
    return await this.notificationService.send(req, this.userId);
  }
}
