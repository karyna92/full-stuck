const bcrypt = require("bcrypt");
const { User, RefreshToken } = require("../models");
const {  verifyRefreshToken } = require("../services/createSessionToken");
const { generateTokens } = require("../helpers/generateTokens");
const{ RefreshTokenError, ConflictError,  NotFoundError, UnauthorizedError }= require("../errors");


module.exports.registrationUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError("User already exists");
    }

    const newUser = await User.create(req.body);
    const tokens = await generateTokens(newUser);

    res.status(201).send({ message: "User created", user: newUser, tokens });
  } catch (error) {
    next(error); 
};
}


module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("cart._id");
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Incorrect password');
    }

    const tokens = await generateTokens(user);

    res.status(200).send({
      message: 'Login successful',
      user,
      tokens,
    });

  } catch (error) {
    next(error);  
  }
};


module.exports.checkAuth = async (req, res, next) => {
  try {
    const {
      tokenPayload: { userId },
    } = req;

    const foundUser = await User.findById(userId).populate("cart._id");

    if (!foundUser) {
      throw new NotFoundError('User not found');
    }
console.log({ data: foundUser });
    res.status(200).send({ data: foundUser });

  } catch (error) {
    next(error); 
  }
};

/*

    Access token
    Живе мало, багаторазовий. Саме цим токеном ми і будемо супроводжувати всі наші запити

    Refresh token
    Живе багато, одноразовий. Призначений для оновлення пари токенів.


    Приходить запит з АТ
      - АТ валідний, виконуємо запит
      - АТ невалідний
        1. Відповідаємо певним кодом помилки
        2. У відповідь на цю помилку, фронт надсилає РТ
          - Якщо РТ валідний - рефрешимо сесію, видаємо нову пару токенів
          - Якщо РТ невалідний - відправляємо користувача на аутенфікацію

    */


module.exports.refreshSession = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new RefreshTokenError("Refresh token missing"));
    }

    let payload;
    try {
      payload = await verifyRefreshToken(refreshToken);
    } catch (error) {
      return next(new RefreshTokenError("Invalid or expired refresh token"));
    }

    const user = await User.findById(payload.userId);

    const existingToken = await RefreshToken.findOne({
      token: refreshToken,
      userId: user._id,
    });

    if (!existingToken) {
      return next(new RefreshTokenError("Refresh token not recognized"));
    }

    await RefreshToken.deleteOne({ _id: existingToken._id });

    const tokens = await generateTokens(user);

    res.status(200).send({ tokens });
  } catch (error) {
    next(error); 
  }
};
