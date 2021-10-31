import { Router } from 'express';
import {
  addReaction,
  addUserPet,
  addUserPetPost,
  deletePost,
  getAllPets,
  getPetById,
  getUserById,
} from '../services/services';
import { auth } from './authorization';

const routes = Router();

routes.get('/userPets', auth, async (req, res) => {
  if (req.body.user?.id) {
    await getUserById(req.body.user.id)
      .then((data) => {
        res.status(200).send(data?.pets ?? []);
      })
      .catch(() => {
        res.status(400).send('err');
      });
  } else {
    res.status(400).send('err');
  }
});

routes.post('/addPet', auth, async (req, res) => {
  if (req.body.user?.id) {
    await addUserPet(
      req.body.user.id,
      req.body.name,
      req.body.petType,
      req.body.petBreed
    ).then(() => {
      res.status(200).send('Dodano zwierzaka');
    });
  } else {
    res.status(400).send('err');
  }
});

routes.get('/pet', auth, async (req, res) => {
  if (req.body.user?.id && req.query?.petId) {
    await getPetById(Number(req.query.petId))
      .then((data) => {
        res.status(200).send(data ?? {});
      })
      .catch(() => {
        res.status(400).send('err');
      });
  } else {
    res.status(400).send('err');
  }
});

routes.post('/addPetPost', auth, async (req, res) => {
  if (req.body.user?.id) {
    await addUserPetPost(
      req.body.user.id,
      req.body.title,
      req.body.content,
      req.body.petId
    ).then(() => {
      res.status(200).send('Dodano post');
    });
  } else {
    res.status(400).send('err');
  }
});

routes.post('/addReaction', auth, async (req, res) => {
  if (req.body.user?.id) {
    await addReaction(req.body.user.id, req.body.postId).then(() => {
      res.status(200).send('Dodano reakcję');
    });
  } else {
    res.status(400).send('err');
  }
});

routes.get('/allPets', auth, async (req, res) => {
  if (req.body.user?.id) {
    await getAllPets((req.query?.search as string) ?? '').then((data) => {
      res.status(200).send(data);
    });
  } else {
    res.status(400).send('err');
  }
});

routes.delete('/deletePost', auth, async (req, res) => {
  if (req.body.user?.id) {
    await deletePost(Number(req.query.postId)).then(() => {
      res.status(200).send('Usunięto post');
    });
  } else {
    res.status(400).send('err');
  }
});

export { routes };
