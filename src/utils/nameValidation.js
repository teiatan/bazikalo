import * as yup from 'yup';
import { validate } from './validationFunction';

const namePattern = /[A-Za-zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9]{3,20}/;
// const errorsNames = {
//     absent: 'name should not be empty',
//     long: 'length should be less than 16 characters',
//     short: 'length should be more than 3 characters',
//     wrongPattern: 'only english or ukrainian letters'
// }

const errorsNames = {
    absent: "ім'я не повинно бути порожнім",
    long: 'довжина імені повинна бути від 3 до 16 символів',
    short: 'довжина імені повинна бути від 3 до 16 символів',
    wrongPattern: 'використовуйте лише українські або англійські літери'
}

const nameSchema = () => {
    return yup
      .string()
      .trim()
      .required(errorsNames.absent)
      .min(3, errorsNames.short)
      .max(16, errorsNames.long)
      .matches(namePattern, errorsNames.wrongPattern);
  };

export const validateName = async (name) => {
    const aaa = await validate(name, nameSchema(name)).then(
        res => (res)
    );
    return aaa;
};