import User from "../modal/User.js";

export const addUser = async (request, response) => {
  try {
    let exist = await User.findOne({ sub: request.body.sub });
    console.log("req.body.sub is : " + request.body.sub);
    console.log("value of exist is " + exist);

    if (exist) {
      response.status(200).json("user already exists");
      return;
    }

    console.log("saving new user 0: ");
    const newUser = new User(request.body);
    console.log("saving new user 1: " + newUser);
    await newUser.save();
    console.log("saving new user 2: ");
    response.status(200).json(newUser);
    console.log("saving new user 3: ");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getUser = async (request, response) => {
  try {
    const user = await User.find({});
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json(error);
  }
};
