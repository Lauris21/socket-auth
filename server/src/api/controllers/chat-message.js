const createMessage = (id, name, message) => {
  return {
    id: id,
    name: name,
    message: message,
  };
};

const createChatMessage = () => {
  const messages = [];
  const users = {};

  const last10Messages = () => {
    return messages.slice(0, 10);
  };

  const usersArray = () => {
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

module.exports = createChatMessage;
