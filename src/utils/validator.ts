const validationRules: Record<string, RegExp> = {
  login: /^[0-9a-zA-Z\-_]{3,}/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
  phone: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/,
  email: /^[^\s@]+@[^\s@]+\.[\S]{2,}$/,
  name: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
  message: /.+/,
};

export function isValid(element: HTMLInputElement): boolean {
  const eValidationType = element.dataset.validation;

  if (!eValidationType || !(eValidationType in validationRules)) {
    return true;
  }

  const rule = validationRules[eValidationType];

  if (element.value && element.value.search(rule) !== -1) {
    return true;
  }
  return false;
}
