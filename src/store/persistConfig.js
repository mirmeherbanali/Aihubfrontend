import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['adminAuth', 'businessAuth', 'individualAuth', 'toggleTabs', 'moduleName'],
};

export default persistConfig;