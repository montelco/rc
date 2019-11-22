export function setCookieValue(cookiename, value, time=7) {
  let cname = cookiename + "=";
  let date = new Date();
  date.setTime(date.getTime()+(time*24*60*60*1000));
  let expires = "; expires="+date.toGMTString();
  let cookieValue = cname + value + expires + ";path=/";
  return document.cookie = cookieValue;
}