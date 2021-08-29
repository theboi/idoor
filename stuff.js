function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded .split('; ');
  let res;
  cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res;
}

const users = {
  "Ryan-hahasecurepassword": "admin",
  "Joe-Mama": "wait",
  "Daksh-daksh123": "auth",
  "XuanHan-xhxhxh": "auth"
}

function login(form) {
  username = document.getElementById('user').value
  password = document.getElementById('pass').value

  authLevel = users[`${username}-${password}`]

  if (authLevel === undefined) {
    alert("Incorrect username or password.")
    return false
  }

  const isAdmin = authLevel === "admin"
  const isAuth = authLevel === "auth" || isAdmin
  const isWait = authLevel === "wait" || isAuth

  setCookie("isAuth", isAuth, 30)
  setCookie("isAdmin", isAdmin, 30)
  setCookie("isWait", isWait, 30)

  if (isAdmin) {
    form.action = "admin.html";
  } else if (isAuth) {
    form.action = "picnic.html"
  } else {
    form.action = "waiting.html"
  }

  return true;
}

function checkAuth(level) {
  if (getCookie(level) === "false") {
    alert("Not authorized")
    location.pathname = "/"
  }
}