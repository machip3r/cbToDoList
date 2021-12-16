const getIDUser = async (user) => {
  try {
    let id_user = await axios.get("/api/getIDUser/" + user);

    return id_user.data[0]["id_user"];
  } catch (e) {
    console.log(e.message);
  }
};

const checkUser = async (user, password) => {
  try {
    /* const body = {
      user: user,
      password: password,
    }; */

    //let countUser = await axios.post("/api/countUser/", body);
    let dataCountUser = await axios.get("/api/countUser/" + user);
    if (dataCountUser.data[0]["existsUser"] == 0) return -1;

    //let checkPassword = await axios.post("/api/checkUser", body);
    let dataCheckPassword = await axios.get(
      "/api/checkUser/" + user + "/" + password
    );
    if (dataCheckPassword.data[0]["existsUser"] != 0) {
      sessionStorage.setItem("id_user", dataCheckPassword.data[0]["id_user"]);
      sessionStorage.setItem("name", dataCheckPassword.data[0]["u_name"]);
      return 1;
    }

    return 0;
  } catch (e) {
    console.log(e.message);
  }
};

const createUser = async (name, user, password) => {
  try {
    let dataCountUser = await axios.get("/api/countUser/" + user);
    if (dataCountUser.data[0]["existsUser"] > 1) return 0;

    await axios.get("/api/createUser/" + name + "/" + user + "/" + password);

    let id_user = await getIDUser(user);

    sessionStorage.setItem("id_user", id_user);
    sessionStorage.setItem("name", name);

    return 1;
  } catch (e) {
    console.log(e.message);
  }
};
