// useUserProvider.js
'use client'
import { useContext } from 'react';
import {UserContext} from '@/context/UserContext'; // Adjust the path based on your project structure

function useUserProvider() {
  return useContext(UserContext);
}

export default useUserProvider;
