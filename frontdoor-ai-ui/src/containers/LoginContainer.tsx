import {Container, Typography} from "@mui/material";
import Login from "../components/login/Login";
import {useContext, useState} from "react";
import callApi from "../util/apiHelper";
import {API_ROUTES, REQUEST_METHODS} from "../util/constants";
import {AppContext, AppContextType} from "./AppContainer";
import {AxiosResponse} from "axios";

export type LoginForm = {
    username: string;
    password: string;
}
const LoginContainer = () => {
    const context = useContext(AppContext)
    const [loginForm, setLoginForm] = useState<LoginForm>({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState<LoginForm>({
        username: '',
        password: ''
    })
    const handleInputChange = (field : string, value : string) => {
        setLoginForm({
            ...loginForm,
            [field]: value
        })
    }
    const handleLogin = async () => {
        if(loginForm.username && loginForm.password) {
            const response = await callApi(API_ROUTES.login, null, REQUEST_METHODS.POST, loginForm, null)
            context?.updateUserInfo(response)
            localStorage.setItem('userInfo', JSON.stringify(response))
        } else {
            const errors = {
                username: '',
                password: '',
            }
            if(!loginForm.username) {
                errors.username = "Please enter email"
            }

            if(!loginForm.password) {
                errors.password = "Please enter password"
            }
            setErrors(errors)
        }

    }
    return (
        <Container maxWidth={"sm"}>
            <Typography color='white' mt={5} variant="h2">Login</Typography>
            <Login loginForm={loginForm} errors={errors} handleLogin={handleLogin} handleInputChange={handleInputChange} />
        </Container>
    )
}
export default LoginContainer