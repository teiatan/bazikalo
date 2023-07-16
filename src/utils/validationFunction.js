export const validate = async (value, schema) => {
    let isValid;
    let firstError;
    await schema
      .validate(value)
      .then(() => (isValid = true))
      .catch(error => {
        isValid = false;
        firstError = error.message;
      });
    return { isValid, error: firstError };
  };