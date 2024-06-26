import React, { useState } from 'react'

const initialState = {
  modal: false
}

export const AppContext = React.createContext(initialState)

const AppState = ({ children }) => {
  const [state, setState] = useState(initialState)

  const toggleModal = id => {
    if (id) {
      setState({ ...state, modal: id })
    } else {
      setState({ ...state, modal: '' })
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleModal: toggleModal
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const withAppState = Component => props => (
  <AppContext.Consumer>
    {context => (
      <Component {...props}
        appContext={context}
      />
    )}
  </AppContext.Consumer>
)

export default AppState
