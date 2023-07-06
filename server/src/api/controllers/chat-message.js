const createMessage = (id, name, message) => {
  return {
    id: id,
    name: name,
    message: message,
  };
};

let messages = [];
let users = [];

const getterUsers = () => {
  return users;
};

const setterUsers = (data) => {
  users = data;
};

const pushUsers = (data) => {
  const findUser = users.some((user) => user?.user?.email == data.user.email);
  console.log("UUUSSSEEEEEERRRRRRSSSSSS", users);
  console.log("DAAATAAAAAA", data);
  console.log("Usuario encontrado", findUser);
  if (!findUser) {
    users.push(data);
    console.log("entro", users);
  }
};

const createChatMessage = () => {
  const last10Messages = () => {
    return messages.slice(0, 10);
  };

  const usersArray = () => {
    // console.log("Useeerrrrrrrrrs", Object.values(users));
    return Object.values(users);
  };

  const sendMessage = (id, name, message) => {
    messages.unshift(createMessage(id, name, message));
  };

  const userConnect = (user) => {
    users[user.id] = user;
  };

  const userDisconnect = (id) => {
    delete users[id];
  };

  return {
    last10Messages,
    usersArray,
    sendMessage,
    userConnect,
    userDisconnect,
  };
};

module.exports = { createChatMessage, getterUsers, setterUsers, pushUsers };
