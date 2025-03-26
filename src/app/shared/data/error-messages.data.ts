// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ErrorMessages = Record<string, (param?: any) => string>;
type Error = Record<string, unknown>;

export const UTIL_ERRORS_FN = (errorKey: string, errorValue: Error, errorMessages?: ErrorMessages): string => {
  const param = errorValue?.[`requiredLength`] ?? errorValue?.[`min`] ?? errorValue?.[`max`];
  const errorMessageFn = ERROR_MESSAGES?.[errorKey] ?? errorMessages?.[errorKey];

  return errorMessageFn ? errorMessageFn(param) : '';
};

export const ERROR_MESSAGES: ErrorMessages = {
  required: () => 'This field is required',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  min: (min?: any) => `This data is more greater than ${min} value`,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  max: (max?: any) => `This data is more lowest than ${max} value`,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  maxlength: (minLength?: any) => `The field's length is greater than ${minLength} characters`,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  minlength: (maxLength?: any) => `The field's length is lowest than ${maxLength} characters`
};
