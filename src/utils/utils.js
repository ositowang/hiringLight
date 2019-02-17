/**
 * based on the user info, get the redirect to path
 *
 * @export
 * @param {*} {type,avatar}
 */
export function getRedirectToPath({ type, avatar }) {
  let url = type === 'boss' ? '/boss' : '/genius';
  if (!avatar) {
    url += 'info';
  }
  return url;
}
