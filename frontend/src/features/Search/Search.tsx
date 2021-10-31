import { TextField } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Pet as PetModel, User, useStore, _axios } from '../../store/store';
import { Pet } from '../Pet';

export const Search: React.FC = () => {
  const { user } = useStore((state) => state);

  const [search, setSearch] = useState('');

  const [pets, setPets] = useState<(PetModel & { user: User })[]>([]);

  const getAllPets = useCallback(
    async (search: String) => {
      await _axios
        .get('/allPets', {
          params: { search },
          headers: {
            'auth-token': `${user.token}`,
          },
        })
        .then((res) => {
          setPets(res.data);
        });
    },
    [user.token]
  );

  useEffect(() => {
    getAllPets(search);
  }, [search, getAllPets]);

  return (
    <div className="flex flex-col justify-center h-full w-full mt-4">
      <div className="flex flex-col items-center w-full h-full">
        <TextField
          value={search}
          label="Szukaj zwierzaków"
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pets.map((pet) => (
            <Pet key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};
