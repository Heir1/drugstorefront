// utils/noopStorage.ts
const noopStorage = {
    getItem: (_key: string) => null,
    setItem: (_key: string, _value: string) => {},
    removeItem: (_key: string) => {},
  };
  
  export default noopStorage;