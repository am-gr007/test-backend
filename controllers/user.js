const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/bad-request");
const { NotFoundError } = require("../errors/not-found");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort("createdAt");
  res
    .status(StatusCodes.OK)
    .json({ query: "success", users: users, count: users.length });
};

const getUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await User.findOne({ _id: userId });
    res.status(StatusCodes.OK).json({ user: user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({ user: user });
};

const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const { name, address } = req.body;

  // if (name === "" || address === "") {
  //   throw new BadRequestError("Name or Address fields cannot be empty");
  // }

  const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    runValidators: true,
    new: true,
  });

  if (user === null) {
    throw new NotFoundError(`No user exists with id: ${userId}`);
  }

  if (!user) {
    throw new NotFoundError(`The ${userId} is incorrect`);
  }

  res.status(StatusCodes.OK).json({ user: user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndRemove({ _id: id });

  res.status(StatusCodes.OK).json({ user: user });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
