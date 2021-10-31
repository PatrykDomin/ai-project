import axios from 'axios';
import { toast } from 'react-toastify';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  name: String;
  role: 'ADMIN' | 'USER';
  token: String;
}

export interface Pet {
  id: number;
  name: String;
  petType: String;
  petBreed: String;
  userId: number;
  user?: User;
}

export interface PetPost {
  id: number;
  title: String;
  content: String;
  userId: number;
  petId: number;
  reactions: PostReaction[];
}

export interface PostReaction {
  id: number;
  userId: number;
  postId: number;
}

type StoreState = {
  user: User;
  register: (name: String, password: String) => Promise<void>;
  login: (name: String, password: String) => Promise<void>;
  logout: () => void;
};

export const _axios = axios.create({
  baseURL: 'http://localhost:4200',
  timeout: 3000,
});

export const useStore = create<StoreState>(
  persist(
    (set) => ({
      user: { id: 0, name: '', role: 'USER', token: '' },
      register: async (name: String, password: String) => {
        await _axios
          .post('/register', { name, password })
          .then(async () => {
            await _axios
              .post('/login', { name, password })
              .then(async (res) => {
                set(() => ({ user: res.data }));
                toast.success('Zarejestrowano oraz zalogowano');
              })
              .catch((err) => {
                toast.error(err.response.data);
              });
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
      },
      login: async (name: String, password: String) => {
        await _axios
          .post('/login', { name, password })
          .then(async (res) => {
            set(() => ({ user: res.data }));
            toast.success('Zalogowano');
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
      },
      logout: () => set(() => ({ user: { id: 0, name: '', role: 'USER', token: '' } })),
    }),

    {
      name: 'ai-project', // unique name
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);
