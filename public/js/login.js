if (sessionStorage.getItem("id_user") != null) window.location.replace("/home");

const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");

if (btnLogin)
  btnLogin.onclick = async () => {
    let user = document.getElementById("inputUser").value;
    let password = document.getElementById("inputPassword").value;

    login = await checkUser(user, password);

    switch (login) {
      case 1:
        let id_user = await getIDUser(user);
        sessionStorage.setItem("id_user", id_user);
        window.location.replace("/home");
        break;
      case -1:
        alert("Usuario inexistente");
        break;
      case 0:
        alert("Contraseña incorrecta");
        break;
    }
  };

if (btnRegister)
  btnRegister.onclick = async () => {
    let name = document.getElementById("inputName").value;
    let user = document.getElementById("inputUser").value;
    let password = document.getElementById("inputPassword").value;

    register = await createUser(name, user, password);

    if (register) {
      let id_user = await getIDUser(user);

      sessionStorage.setItem("id_user", id_user);
      window.location.replace("/home");
    } else alert("Usuario existente");
  };
