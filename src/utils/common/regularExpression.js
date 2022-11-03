// regex phone
export const REGEX_PHONE = new RegExp(/^(09|03|08|07|05)+([0-9]{8})$/);
export const REGEX_YEAR = new RegExp(/^(19|20)+([0-9]{2})$/);
export const REGEX_DAY_MONTH_YEAR = new RegExp(
  /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
);