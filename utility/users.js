const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const exist = users.find((user) => user.name === name && user.room === room);

  if (!name || !room) return { error: "Username and room is required" };
  if (exist) {
    return { error: `${name} already exist in ${room}` };
  }
  const user = {
    id,
    name,
    room,
  };
  users.push(user);
  return user;
};

const fetchUser = (id) => {
  return users.find((user) => user.id === id);
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

module.exports = {
  addUser,
  removeUser,
  fetchUser,
};
