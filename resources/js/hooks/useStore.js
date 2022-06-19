import React from 'react';
import { storeContext } from '../context/StoreContext';

export const useStore = () => React.useContext(storeContext);
