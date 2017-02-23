/**
 *  Logger actions
 */
export const LOG = 'logger/log';

export function log(target, message) {
  return { type: LOG, target, message };
}
