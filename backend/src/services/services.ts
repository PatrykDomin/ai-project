import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addUser = async (name: string, pass: string) => {
  await prisma.user.create({
    data: {
      name,
      password: pass,
      role: 'USER',
    },
  });
};

const getUser = async (name: string) => {
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
  });
  return user;
};

const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const getAllUserPets = async (userId: number) => {
  const userPets = await prisma.pet.findMany({
    where: {
      userId,
    },
  });
  return userPets;
};

const getAllPetPosts = async (petId: number) => {
  const petPosts = await prisma.petPost.findMany({
    where: {
      petId,
    },
  });
  return petPosts;
};

const getAllUserPosts = async (userId: number) => {
  const userPosts = await prisma.petPost.findMany({
    where: {
      userId,
    },
  });
  return userPosts;
};

export { addUser, getUser, getUserById, getAllUserPets, getAllPetPosts, getAllUserPosts };
