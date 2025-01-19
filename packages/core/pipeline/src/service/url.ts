export interface IUrlService {
  getPipelineDetailUrl(pipelineId: number, historyId: number): Promise<string>;
}
