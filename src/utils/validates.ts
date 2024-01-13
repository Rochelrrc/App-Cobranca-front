export function emailIsValid(email: string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;

  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
}

export function handleStrongPassword(value: string) {
  if (value.length < 8) {
    return false;
  }

  if (!/[A-Z]/.test(value)) {
    return false;
  }

  if (!/[a-z]/.test(value)) {
    return false;
  }

  if (!/\d/.test(value)) {
    return false;
  }

  if (!/[!$#@%&]/.test(value)) {
    return false;
  }

  if (/\s/.test(value)) {
    return false;
  }

  return true;
}

export function handleCheckConfirmPassword(
  password: string,
  confirmPassword: string
) {
  if (password !== confirmPassword) {
    return false;
  }

  return true;
}

export function handleCheckOnlyLetters(name: string) {
  var regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

  return regex.test(name);
}
