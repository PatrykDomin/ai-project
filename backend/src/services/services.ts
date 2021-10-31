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
    include: {
      pets: true,
    },
  });
  return user;
};

const addUserPet = async (
  userId: number,
  name: string,
  petType: string,
  petBreed: string
) => {
  await prisma.pet.create({
    data: {
      name,
      petType,
      petBreed,
      userId,
    },
  });
};

const getPetById = async (id: number) => {
  const pet = await prisma.pet.findUnique({
    where: {
      id,
    },
    include: {
      petPosts: { include: { reactions: true } },
      user: true,
    },
  });
  return pet;
};

const addUserPetPost = async (
  userId: number,
  title: string,
  content: string,
  petId: number
) => {
  await prisma.petPost.create({
    data: {
      title,
      content,
      createdAt: new Date(),
      petId,
      userId,
    },
  });
};

const addReaction = async (userId: number, postId: number) => {
  await prisma.reaction.create({
    data: {
      userId,
      petPostId: postId,
    },
  });
};

const getAllPets = async (search: string) => {
  const pets = await prisma.pet.findMany({
    where: {
      OR: [{ name: { contains: search } }],
    },
    include: {
      user: true,
    },
  });
  return pets;
};

const deletePost = async (postId: number) => {
  await prisma.petPost.delete({
    where: {
      id: postId,
    },
  });
};

export {
  addUser,
  getUser,
  getUserById,
  addUserPet,
  getPetById,
  addUserPetPost,
  addReaction,
  getAllPets,
  deletePost,
};
