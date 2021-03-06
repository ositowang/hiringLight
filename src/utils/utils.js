/**
 * based on the user info, get the redirect to path
 *
 * @export
 * @param {*} {type,avatar}
 */
function getRedirectToPath({ type, avatar }) {
  let url = type === 'boss' ? '/boss' : '/genius';
  if (!avatar) {
    url += 'info';
  }
  return url;
}

function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_');
}

export { getRedirectToPath, getChatId };
