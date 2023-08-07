import * as constants from './constants';

export function isValidUsername(username: string) {
  username = username.trim();
  if (
    username.length < constants.USERNAME_MIN_LENGTH ||
    username.length > constants.USERNAME_MAX_LENGTH
  ) {
    return false;
  }
  return true;
}

export function isValidEmail(email: string) {
  email = email.trim().toLowerCase();
  const regex = new RegExp(
    /^(?<address>[A-Za-z0-9_]{2,})@(?<subdomainOne>[A-Za-z0-9]{2,}\.)?(?<subdomainTwo>[A-Za-z0-9]{2,}\.)?(?<hostname>[A-Za-z0-9]{2,})\.(?<domain>[A-Za-z0-9]{2,})$/
  );
  if (
    email.length < constants.EMAIL_MIN_LENGTH ||
    email.length > constants.EMAIL_MAX_LENGTH ||
    !regex.test(email)
  ) {
    return false;
  }
  return true;
}

export function isValidPassword(password: string) {
  password = password.trim();
  if (
    password.length < constants.PASSWORD_MIN_LENGTH ||
    password.length > constants.PASSWORD_MAX_LENGTH
  ) {
    return false;
  }
  return true;
}

function arePasswordsMatching(password: string, repeatPassword: string) {
  return password === repeatPassword;
}

export function areValidLoginCredentials(username: string, password: string) {
  const errors = [];
  if (!username || !isValidUsername(username)) {
    errors.push('Invalid username.');
  }
  if (!password || !isValidPassword(password)) {
    errors.push('Invalid password.');
  }
  return errors;
}

export function areValidRegisterCredentials(
  username: string,
  password: string,
  repeatPassword: string,
  email: string
) {
  const errors = [];
  if (!username || !isValidUsername(username)) {
    errors.push('Invalid username.');
  }
  if (!password || !isValidPassword(password)) {
    errors.push('Invalid password.');
  }
  if (!repeatPassword || !isValidPassword(repeatPassword)) {
    errors.push('Invalid repeat password.');
  }
  if (!arePasswordsMatching(password, repeatPassword)) {
    errors.push('The password and repeat password do not match.');
  }
  if (!email || !isValidEmail(email)) {
    errors.push('Invalid email.');
  }
  return errors;
}
