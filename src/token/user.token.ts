import jwt from "jsonwebtoken";

export const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN as string, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.REFRESH_ToKEN as string, {
    expiresIn: "1y",
  });
};
