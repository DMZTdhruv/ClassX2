import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  if (process.env.NODE_ENV === 'development') {
    res.cookie('classX_user_token', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    });
  } else {
    res.cookie('classX_user_token', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'Strict',
      domain: '.onrender.com',
      secure: process.env.NODE_ENV !== 'development',
    });
  }
};

export default generateTokenAndSetCookie;
