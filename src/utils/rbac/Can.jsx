import rules from "./rules";

export const check = (props) => {
  const { role, action, data } = props;
  // console.log(rules);
  const permissions = rules[role];
  if (!permissions) {
    // role is not present in the rules
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true;
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false;
    }

    return permissionCondition(data);
  }
  return false;
};

const Can = (props) => {
  return check({
    rules,
    role: props.role,
    action: props.perform,
    data: props.data,
  })
    ? props.yes()
    : props.no();
};

export default Can;
