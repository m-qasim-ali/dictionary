import React, { Fragment, useContext } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Stack,
  IconButton,
  Typography,
  Box,
  Divider,
  Button,
} from '@mui/material';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import { BookmarkContext } from '../../App';

const index = () => {
  const { word } = useParams();
  const navigate = useNavigate();
  const { status, data } = useLoaderData();
  const theme = useTheme();
  const { state, dispatch } = useContext(BookmarkContext);
  const isBookmark = Object.keys(state).includes(word);

  if (status != 200) {
    return (
      <>
        <Box {...theme.mixins.alignInTheCenter}>
          <Typography variant='subtitle1' color='initial'>
            Word not Found!
          </Typography>
          <Button
            onClick={() => navigate(-1)}
            variant='contained'
            color='primary'
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Box>
      </>
    );
  }

  const phonetics = data[0].phonetics;
  let audio = null;
  if (phonetics.length > 0) {
    let temp = phonetics[0].audio;
    if (temp) {
      audio = new Audio(temp);
    }
  }

  return (
    <>
      <Stack
        mt={5}
        direction='row'
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <IconButton aria-label='back-button' onClick={() => navigate('/')}>
          <ArrowBackIcon sx={{ color: 'black' }} />
        </IconButton>

        <IconButton
          onClick={() =>
            isBookmark
              ? dispatch({ type: 'removeBookmark', payload: { word } })
              : dispatch({
                  type: 'addBookmark',
                  payload: { word, definition: data },
                })
          }
          aria-label='bookmark'
        >
          {isBookmark ? (
            <BookmarkIcon sx={{ color: 'black' }} />
          ) : (
            <BookmarkBorderIcon sx={{ color: 'black' }} />
          )}
        </IconButton>
      </Stack>

      <Stack
        px={5}
        py={4}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        my={4}
        sx={{
          background:
            'linear-gradient(90.17deg, #191E5D 0.14%, #0F133A 98.58%)',
          borderRadius: 3,
        }}
      >
        <Typography variant='h5' color='#fff' textTransform={'capitalize'}>
          {word}
        </Typography>
        {audio && (
          <IconButton
            aria-label='playButton'
            sx={{
              background:
                'linear-gradient(138.72deg, #DC8295 0%, #DC687C 95.83%)',
              color: 'white',
              p: 1,
              borderRadius: 2,
            }}
            onClick={() => audio.play()}
          >
            <PlayArrowIcon />
          </IconButton>
        )}
      </Stack>

      <Stack
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {data.map((definitions, index0) => (
          <Fragment key={index0}>
            {index0 != 0 && <Divider sx={{ my: 2, width: '100%' }} />}
            {definitions.meanings.map((meanings, index1) => (
              <Box
                sx={{
                  my: 1,
                  background: '#fff',
                  borderRadius: 2,
                  boxShadow: 'rgba(0,0,0,0.05)',
                  p: 2,
                  width: '100%',
                }}
                key={index1}
              >
                <Typography
                  variant='subtitle1'
                  sx={{ fontWeight: 'bold' }}
                  textTransform={'capitalize'}
                  mb={1}
                  color='GrayText'
                >
                  {meanings.partOfSpeech}
                </Typography>
                {meanings.definitions.map((definition, index2) => (
                  <Typography color='GrayText' key={index2} variant='body1'>
                    {meanings.definitions.length > 1 && `${index2 + 1}. `}
                    {definition.definition}
                  </Typography>
                ))}
              </Box>
            ))}
          </Fragment>
        ))}
      </Stack>
    </>
  );
};

export const loader = async ({ params }) => {
  const { word } = params;
  let data = null;
  let res = null;
  let storage = localStorage.getItem('bookmarks');
  if (storage) {
    data = storage[word];
  }
  try {
    if (!data) {
      res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      data = await res.data;
    }
  } catch (err) {
    return {
      status: err.response.status,
      data: '',
    };
  }
  return {
    status: res.status,
    data: data,
  };
};

export default index;
