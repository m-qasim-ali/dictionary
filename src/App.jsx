import { ThemeProvider } from '@emotion/react';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import theme from './theme';
import { CssBaseline, Grid } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/index';
import Bookmarks from './components/Bookmarks/index';
import Defination, { loader } from './components/Defination/index';
import AppLayout from './ui/AppLayout';

const initialState = JSON.parse(localStorage.getItem('bookmarks')) || {};

const reducer = (state, action) => {
  switch (action.type) {
    case 'addBookmark': {
      const updatedBookmarks = {
        ...state,
        [action.payload.word]: action.payload.definition,
      };
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    }
    case 'removeBookmark': {
      const updatedBookmarks = { ...state };
      delete updatedBookmarks[action.payload.word];
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    }
  }
};

export const BookmarkContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/bookmarks',
          element: <Bookmarks />,
        },
        {
          path: '/search/:word',
          element: <Defination />,
          loader: loader,
        },
      ],
    },
  ]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BookmarkContext.Provider value={{ dispatch, state }}>
          <RouterProvider router={router}></RouterProvider>
        </BookmarkContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
