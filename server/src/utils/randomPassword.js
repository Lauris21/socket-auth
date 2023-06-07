const randomPassword = () => {
  const numberString = "123456789";
  const randomIndex = Math.floor(Math.random() * 10);
  const randomNumber = numberString[randomIndex];
  const randomString = "*@!=&$";
  const passwordSecure = `${randomNumber}${Math.random()
    .toString(36)
    .slice(-4)}${randomString[Math.floor(Math.random() * 5)]}${
    randomString[Math.floor(Math.random() * 5)]
  }${Math.random().toString(36).slice(-4).toUpperCase()}${
    randomString[Math.floor(Math.random() * 5)]
  }${randomString[Math.floor(Math.random() * 5)]}`;

  return passwordSecure;
};

module.exports = randomPassword;
