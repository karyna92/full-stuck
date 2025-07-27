const User = require("../models/User");

async function findOrCreateUserByFirebase(decodedToken) {
  const { uid, email, name, picture } = decodedToken;

  let user = await User.findOne({ firebaseUid: uid });

  if (user) return user;
 
  if (email) {
    user = await User.findOne({ email });
  }

  if (user) {

    if (!user.firebaseUid) {
      user.firebaseUid = uid;
      await user.save();
    }
    return user;
  }


  const newUser = new User({
    firebaseUid: uid,
    email,
    firstName: name?.split(" ")[0] || "",
    lastName: name?.split(" ")[1] || "",
    avatar: picture,
    password: "", 
  });

  await newUser.save();

  return newUser;
}

module.exports = { findOrCreateUserByFirebase };
