const hasPerm = (permissions, member, perm) => {
  const result = member.roles.cache.find(
    (role) => {
      if (permissions[role.name]) {
        if (permissions[role.name].includes(perm.name)) {
          return true;
        }
      }
      return false;
    }
  );
  return result ? true : false;
}

module.exports = hasPerm;