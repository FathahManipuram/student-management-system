import bcrypt from "bcrypt";

export const comparePassword = async (
  passWord: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(passWord, hashedPassword);
};
