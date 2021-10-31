import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Pet as PetModel, PetPost, useStore, _axios } from '../../store/store';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { Pet } from '../Pet';
import { toast } from 'react-toastify';
import { Post } from '../Post';

export const SinglePet: React.FC = () => {
  const { user } = useStore((state) => state);
  const { petId } = useParams<{ petId?: string }>();

  const [showDialog, setShowDialog] = useState(false);

  const [petData, setPetData] = useState<PetModel | null>(null);
  const [petPosts, setPetPosts] = useState<PetPost[]>([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const getPetData = useCallback(async () => {
    await _axios
      .get('/pet', {
        params: { petId },
        headers: {
          'auth-token': `${user.token}`,
        },
      })
      .then((res) => {
        const { petPosts, ...petData } = res.data;
        setPetData(petData);
        setPetPosts(petPosts);
      });
  }, [petId, user.token]);

  const addPost = useCallback(async () => {
    await _axios
      .post(
        '/addPetPost',
        { title, content, petId: Number(petId) },
        {
          headers: {
            'auth-token': `${user.token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data);
        setTitle('');
        setContent('');
      })
      .finally(() => {
        getPetData();
        setShowDialog(false);
      });
  }, [title, content, petId, user.token, getPetData]);

  useEffect(() => {
    user.token && petId && getPetData();
  }, [user.token, petId, getPetData]);

  return (
    <div className="flex flex-col justify-center h-full w-full mt-4">
      {petData && (
        <div className="flex flex-col px-4">
          <div className="flex flex-col items-center w-full h-full mb-4">
            <Pet pet={petData} hideLink />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {petPosts.length ? (
              petPosts.map((post) => (
                <Post key={post.id} post={post} refresh={getPetData} />
              ))
            ) : (
              <div className="mx-auto">Brak postów</div>
            )}
          </div>
        </div>
      )}

      {user.id === petData?.userId && (
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
      )}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle id="form-dialog-title">Dodaj post</DialogTitle>
        <DialogContent className="flex flex-col">
          <TextField
            value={title}
            label="Tytuł"
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: 12 }}
          />
          <TextField
            value={content}
            label="Treść"
            onChange={(e) => setContent(e.target.value)}
            style={{ marginBottom: 12 }}
            multiline
            rows={5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Zamknij</Button>
          <Button disabled={!title || !content} onClick={() => addPost()}>
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
