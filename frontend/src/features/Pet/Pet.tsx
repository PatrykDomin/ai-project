import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Pet as PetModel } from '../../store/store';
import { Link } from 'react-router-dom';

export const Pet: React.FC<{ pet: PetModel; hideLink?: boolean }> = ({ pet, hideLink }) => {
  return (
    <Paper elevation={3} style={{ margin: 16, minWidth: 200 }}>
      <div className="flex flex-col justify-between p-4 h-full">
        <div>
          <Typography variant="h6">Imię: {pet.name}</Typography>
          <Typography variant="h6">Typ: {pet.petType}</Typography>
          {pet.petBreed && <Typography variant="h6">Rasa: {pet.petBreed}</Typography>}
          {pet?.user?.name && (
            <Typography variant="body1">Właściciel: {pet.user.name}</Typography>
          )}
        </div>
        {!hideLink ? (
          <Link style={{ marginTop: 12 }} to={`/${pet.userId}/pets/${pet.id}`}>
            Zobacz posty zwierzaka
          </Link>
        ) : null}
      </div>
    </Paper>
  );
};
