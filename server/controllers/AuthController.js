import getPrismaInstance from '../utils/PrismaClient.js';
import { generateToken04 } from '../utils/TokenGenerator.js';

export const checkUser = async (request, response, next) => {
  try {
    const { email } = request.body;
    if (!email) {
      return response.json({ msg: 'Email is required', status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return response.json({ msg: 'User not found', status: false });
    } else
      return response.json({ msg: 'User Found', status: true, data: user });
  } catch (error) {
    next(error);
  }
};
