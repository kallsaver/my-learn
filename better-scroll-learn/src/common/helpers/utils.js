import _ from 'lodash';

export function isEmpty(value) {
  if (value === false || value == null) {
    return false;
  } else {
    return _.isEmpty(value);
  }
};
