import { AbstractAccess, IAccessService } from "../../src";
import { aliyunSecret } from "../user.secret";
export class AccessServiceTest implements IAccessService {
  async getById(id: any): Promise<AbstractAccess> {
    return {
      ...aliyunSecret,
    } as any;
  }
}
