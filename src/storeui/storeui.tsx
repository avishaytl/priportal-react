import React from 'react'
import { createStore, TStore } from './createStore'
import { useLocalStore } from 'mobx-react' // 6.x or mobx-react-lite@1.4.0

const StoreContext = React.createContext<TStore | null>(null)

export const StoreProvider = ({ children }: any) => {
  const store = useLocalStore(createStore)
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const store = React.useContext(StoreContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}