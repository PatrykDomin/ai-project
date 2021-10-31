import React, { useCallback } from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { PetPost, useStore, _axios } from '../../store/store';

import { Favorite, FavoriteBorder } from '@material-ui/icons';

import { toast } from 'react-toastify';

export const Post: React.FC<{ post: PetPost; refresh: () => Promise<void> }> = ({
  post,
  refresh,
}) => {
  const { user } = useStore((state) => state);

  const { reactions } = post;

  const addReaction = useCallback(async () => {
    await _axios
      .post(
        '/addReaction',
        { postId: post.id },
        {
          headers: {
            'auth-token': `${user.token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data);
      })
      .finally(() => {
        refresh();
      });
  }, [user.token, post.id, refresh]);

  const deletePost = useCallback(async () => {
    await _axios
      .delete('/deletePost', {
        params: { postId: post.id },
        headers: {
          'auth-token': `${user.token}`,
        },
      })
      .then((res) => {
        toast.success(res.data);
      })
      .finally(() => {
        refresh();
      });
  }, [post.id, user.token, refresh]);

  return (
    <Paper elevation={3} style={{ margin: 16, minWidth: 200 }}>
      <div className="flex flex-col justify-between p-4 h-full">
        <Typography variant="h6">{post.title}</Typography>
        <Typography style={{ marginBottom: 12 }} variant="body1">
          {post.content}
        </Typography>
        <div className="flex flex-col">
          <div className="flex flex-row">
            {reactions.find((el) => el.userId === user.id) ? (
              <Favorite style={{ color: 'red' }} />
            ) : (
              <FavoriteBorder
                onClick={addReaction}
                style={{ color: 'red', cursor: 'pointer' }}
              />
            )}
            <Typography style={{ marginLeft: 4 }}>{reactions.length}</Typography>
          </div>
          {(user.role === 'ADMIN' || post.userId === user.id) && (
            <Button style={{ marginTop: 8 }} onClick={() => deletePost()}>
              Usuń post
            </Button>
          )}
        </div>
      </div>
    </Paper>
  );
};
