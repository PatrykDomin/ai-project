import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Pet as PetModel, useStore, _axios } from '../../store/store';
import { Pet } from '../Pet';
import { AddCircle } from '@material-ui/icons';

export const Home: React.FC = () => {
  const { user } = useStore((state) => state);

  const [pets, setPets] = useState<PetModel[]>([]);

  const [showDialog, setShowDialog] = useState(false);

  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petBreed, setPetBreed] = useState('');

  const getUserPets = useCallback(async () => {
    user.token &&
      (await _axios
        .get('/userPets', {
          headers: {
            'auth-token': `${user.token}`,
          },
        })
        .then((res) => {
          setPets(res.data);
        }));
  }, [user.token]);

  const addPet = useCallback(async () => {
    user.token &&
      petType &&
      petName &&
      (await _axios
        .post(
          '/addPet',
          {
            name: petName,
            petType,
            petBreed: petBreed ?? '',
          },
          {
            headers: {
              'auth-token': `${user.token}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data);
          setPetName('');
          setPetType('');
          setPetBreed('');
        })
        .finally(() => {
          getUserPets();
          setShowDialog(false);
        }));
  }, [
    user.token,
    petName,
    petBreed,
    petType,
    setPetName,
    setPetType,
    getUserPets,
    setPetBreed,
    setShowDialog,
  ]);

  useEffect(() => {
    user.token && getUserPets();
  }, [user.token, getUserPets]);

  return (
    <div className="flex flex-col justify-center h-full w-full mt-4">
      <div className="flex flex-col items-center w-full h-full">
        <Typography variant="h4" style={{ margin: 16 }}>
          Moje zwierzaki
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pets.map((pet) => (
            <Pet key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
      <AddCircle
        className="cursor-pointer"
        style={{
          width: 44,
          height: 44,
          position: 'fixed',
          bottom: 16,
          right: 16,
          color: 'turquoise',
        }}
        onClick={() => setShowDialog(true)}
      />
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle id="form-dialog-title">Dodaj zwierzaka</DialogTitle>
        <DialogContent className="flex flex-col">
          <TextField
            value={petName}
            label="Imię zwierzaka"
            onChange={(e) => setPetName(e.target.value)}
            style={{ marginBottom: 12 }}
          />
          <TextField
            value={petType}
            label="Typ zwierzaka"
            onChange={(e) => setPetType(e.target.value)}
            style={{ marginBottom: 12 }}
          />
          <TextField
            value={petBreed}
            label="Rasa (opcjonalnie)"
            onChange={(e) => setPetBreed(e.target.value)}
            style={{ marginBottom: 12 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Zamknij</Button>
          <Button disabled={!petName || !petType} onClick={() => addPet()}>
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
