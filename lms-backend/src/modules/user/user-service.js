import User from "./user-model.js";

//create user
export const registerUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

//get all users
export const getAllUsers = async () => {
  return User.find();
};

//get user by id
export const getUserById = async (id) => {
  return await User.findById(id);
};

// LOGIN (find user AND compare password here )
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};

//update user
export const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

//delete user
export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
