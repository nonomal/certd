import { domainUtils } from './util.domain.js';

function groupByDomain(options: any[], inDomains: string[]) {
  const matched = [];
  const notMatched = [];
  for (const item of options) {
    if (domainUtils.match(item.domain, inDomains)) {
      matched.push(item);
    } else {
      notMatched.push(item);
    }
  }
  return {
    matched,
    notMatched,
  };
}

function buildGroupOptions(options: any[], inDomains: string[]) {
  const grouped = groupByDomain(options, inDomains);
  const groupOptions = [];
  groupOptions.push({ value: 'matched', disabled: true, label: '----已匹配----' });
  if (grouped.matched.length === 0) {
    options.push({ value: '', disabled: true, label: '没有可以匹配的域名' });
  } else {
    for (const matched of grouped.matched) {
      groupOptions.push(matched);
    }
  }
  if (grouped.notMatched.length > 0) {
    groupOptions.push({ value: 'unmatched', disabled: true, label: '----未匹配----' });
    for (const notMatched of grouped.notMatched) {
      groupOptions.push(notMatched);
    }
  }
  return groupOptions;
}

export const optionsUtils = {
  //获取分组
  groupByDomain,
  //构建分组后的选项列表，常用
  buildGroupOptions,
};
