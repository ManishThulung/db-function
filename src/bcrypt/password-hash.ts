import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    console.error(error.message);
  }
};
