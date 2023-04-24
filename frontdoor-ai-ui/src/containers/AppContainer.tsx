
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {Button} from "@mui/material";
import SummaryContainer from "./SummaryContainer";
import {createContext, useEffect, useState} from "react";
import LoginContainer from "./LoginContainer";
import SignupContainer from "./SignupContainer";
import {QueryClient, QueryClientProvider} from "react-query";
export type UserInfo = {
    id?: string;
    accessToken?: string;

    refreshToken?: string
}
export type AppContextType = {
    userInfo: UserInfo;
    updateUserInfo: (userInfo: UserInfo) => void;
};
export const AppContext = createContext<AppContextType | null>(null);
export const queryClient = new QueryClient()
const AppContainer = () => {
    const [showLoginView, setShowLoginView] = useState<boolean>(false)
    const [showSignupView, setShowSignupView] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserInfo>({
        id: undefined,
        accessToken: undefined,
        refreshToken: undefined
    })
    const showLoginViewHandler = () => {
        setShowLoginView(!showLoginView)
        setShowSignupView(false)
    }
    const showSignupViewHandler = () => {
        setShowLoginView(false)
        setShowSignupView(!showSignupView)
    }
    const updateUserInfo = (value: UserInfo) => {
        setUserInfo(value)
    }
    useEffect(() => {
        if(userInfo.id) {
            setShowLoginView(false)
            setShowSignupView(false)
        }
    },[userInfo])
    const userInfoFromLocalStorage = localStorage.getItem('userInfo')
    if(userInfoFromLocalStorage) {
        if(!userInfo.id) {
            setUserInfo(JSON.parse(userInfoFromLocalStorage))
        }
    }
  return (
      <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{userInfo, updateUserInfo }}>
          {!userInfo.id && <Grid container spacing={2}>
          <Grid xs={6}>
              <Button onClick={showLoginViewHandler} variant='contained'>{showLoginView ? 'Back' : 'Login'}</Button>
          </Grid>
          <Grid xs={6}>
              <Button onClick={showSignupViewHandler} color="secondary" variant='contained'>{showSignupView ? 'Back' : 'Signup'}</Button>
          </Grid>
      </Grid> }
          {!showLoginView && !showSignupView && <SummaryContainer />}
          {showLoginView && <LoginContainer />}
          {showSignupView && <SignupContainer />}
      </AppContext.Provider>
      </QueryClientProvider>
  )
}
export default AppContainer;