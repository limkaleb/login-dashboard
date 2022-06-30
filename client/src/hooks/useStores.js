import { useContext } from 'react'

import { StoreContext } from '~/contexts'

export const useStores = () => {
  return useContext(StoreContext)
}
