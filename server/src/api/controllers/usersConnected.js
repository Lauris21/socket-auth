// Gestionamos usuarios conectados
let users = [];

const getterUsers = () => {
  return users;
};

const setterUsers = (data) => {
  users = data;
};

const pushUsers = (data) => {
  const findUser = users.some((user) => user?.user?.email == data?.user?.email);

  if (!findUser) {
    users.push(data);
  }
};

const deleteUser = (data) => {
  users = users.filter((user) => user.user.email !== data.email);
};

let messages = [];

const getterMessage = () => {
  return messages;
};

const createMessage = (id, name, message) => {
  return {
    id: id,
    name: name,
    message: message,
  };
};

const last10Messages = () => {
  return messages.slice(0, 10);
};

// const usersArray = () => {
//   console.log("Useeerrrrrrrrrs", Object.values(users));
//   return Object.values(users);
// };

const sendMessage = (id, name, message) => {
  messages.unshift(createMessage(id, name, message));
};

module.exports = {
  getterUsers,
  setterUsers,
  pushUsers,
  deleteUser,
  getterMessage,
  createMessage,
  last10Messages,
  sendMessage,
};
