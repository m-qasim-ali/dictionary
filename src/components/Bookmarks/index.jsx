import { Box, IconButton, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BookmarkContext } from '../../App';

const index = () => {
  const navigate = useNavigate();
  const { state } = useContext(BookmarkContext);
  const bookmarks = Object.keys(state);

  return (
    <>
      <Stack mt={5} direction='row' alignItems={'center'}>
        <IconButton aria-label='back-button' onClick={() => navigate('/')}>
          <ArrowBackIcon sx={{ color: 'black' }} />
        </IconButton>

        <Typography variant='subtitle1' ml={2} color='initial'>
          Bookmarks
        </Typography>
      </Stack>

      {bookmarks.length === 0 && (
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          mt={5}
        >
          <Typography variant='h6' color='initial'>
            No Data Found
          </Typography>
        </Stack>
      )}

      <Stack direction={'column'} alignItems={'center'} sx={{ mb: 5 }}>
        {bookmarks.map((el, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                p: 2,
                mt: 2,
                borderRadius: 2,
                cursor: 'pointer',
                width: '100%',
                textDecoration: 'none',
              }}
              component={Link}
              to={`/search/${el}`}
            >
              <Typography sx={{ fontWeight: 600 }} variant='h6' color='initial'>
                {el}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </>
  );
};

export default index;
