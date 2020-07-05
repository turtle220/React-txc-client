import PasswordValidator from 'password-validator'

export const validatePassword = (password) => {
  const schema = new PasswordValidator()

  schema
    .is().min(8)
    .is().max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()

  return schema.validate(password)
}
