import {
  Box,
  Typography,
  TextField,
  FilledInput,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const index = () => {
  const [word, setWord] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedWord = word.trim().toLowerCase();

    if (!trimmedWord) return;
    if (trimmedWord && trimmedWord.split(' ').length > 1) return;

    navigate(`search/${trimmedWord}`);
  };

  return (
    <>
      <Box
        { ...theme.mixins.alignInTheCenter }
      >
        <img src='images/book.png' alt='book-svg' />
        <Typography my={1} variant='h4' color='primary'>
          Dictionary
        </Typography>
        <Typography variant='body1' color='GrayText'>
          Find meanings and save for quick reference
        </Typography>
        <Box my={4} width={{ xs: '330px', sm: '390px' }}>
          <form onSubmit={handleSubmit}>
            <FilledInput
              disableUnderline
              placeholder='Enter Word'
              fullWidth
              value={word}
              onChange={(e) => setWord(e.target.value)}
              sx={{
                borderRadius: 2,
                '& .MuiInputBase-input': { p: 2 },
                backgroundColor: 'white',
                boxShadow: '0px 10px 25px rgba(0,0,0,0.05)',
              }}
              startAdornment={<SearchIcon color='disabled' />}
            />
          </form>
        </Box>

        <IconButton
          sx={{
            background:
              'linear-gradient(138.72deg, #DC8295 0%, #DC687C 95.83%)',
            boxShadow: '0px 10px 10px rgba(221, 114, 133, 0.2)',
            color: 'white',
            p: 2,
            borderRadius: 2,
          }}
          aria-label='save'
          component={Link}
          to={'/bookmarks'}
        >
          <BookmarkIcon p={2} />
        </IconButton>
      </Box>
    </>
  );
};

export default index;
