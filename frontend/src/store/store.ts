import axios from 'axios';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: String;
  role: 'ADMIN' | 'USER';
  token: String;
}

type StoreState = {
  user: User;
  register: (name: String, password: String) => Promise<void>;
  login: (name: String, password: String) => Promise<void>;
};

export const _axios = axios.create({
  baseURL: 'http://localhost:4200',
  timeout: 3000,
});

export const useStore = create<StoreState>(
  persist(
    (set) => ({
      user: { name: '', role: 'USER', token: '' },
      register: async (name: String, password: String) => {
        await _axios
          .post('/register', { name, password }) //TODO: handle errors to be displayed
          .then(async () => {
            await _axios
              .post('/login', { name, password })
              .then(async (res) => {
                set(() => ({ user: res.data }));
              })
              .catch((err) => console.log('err', err.response.data));
          })
          .catch((err) => console.log('err', err.response.data));
      },
      login: async (name: String, password: String) => {
        await _axios
          .post('/login', { name, password })
          .then(async (res) => {
            set(() => ({ user: res.data }));
          })
          .catch((err) => console.log('err', err.response.data));
      },
    }),
    {
      name: 'ai-project', // unique name
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);
