import React from 'react';

import RootStore from '../Stores/RootStore';

export const store = new RootStore();

export const storeContext = React.createContext(store);
