import bcrypt from "bcrypt";

export const comparePassword = async (password: string, hash: string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error(error.message);
  }
};
