export function isEmail(str: string): boolean {
  if(!str) {
    return false;
  }

  return RegExp("^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+").test(str);
}

export function isPhoneNumber(str: string): boolean { 
  if(!str) {
    return false;
  }

  return RegExp("^(?:[+0][1-9])?[0-9]{10,12}$").test(str);
}