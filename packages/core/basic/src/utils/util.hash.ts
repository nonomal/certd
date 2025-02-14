import crypto from 'crypto';

function md5(data: string) {
  return crypto.createHash('md5').update(data).digest('hex');
}
function sha256(data: string) {
  return crypto.createHash('sha256').update(data).digest('hex');
}
export const hashUtils = {
  md5,
  sha256,
};
