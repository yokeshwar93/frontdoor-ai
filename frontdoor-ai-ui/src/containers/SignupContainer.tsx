import Signup from "../components/signup/Signup";
import {Container, Typography} from "@mui/material";
import {useContext, useState} from "react";
import callApi from "../util/apiHelper";
import {API_ROUTES, REQUEST_METHODS} from "../util/constants";
import {AppContext} from "./AppContainer";
export type SignupForm = {
    name: string;
    email: string;
    password: string;
}
const SignupContainer = () => {
    const context = useContext(AppContext)
    const [signupForm, setSignupForm] = useState<SignupForm>({
        name: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<SignupForm>({
        name: '',
        email: '',
        password: ''
    })
    const handleInputChange = (field : string, value : string) => {
        setSignupForm({
            ...signupForm,
            [field]: value
        })
    }
    const handleSignup = async () => {
        if(signupForm.email && signupForm.password && signupForm.name) {
            const response = await callApi(API_ROUTES.signup, null, REQUEST_METHODS.POST, signupForm, null)
            context?.updateUserInfo(response)
            localStorage.setItem('userInfo', JSON.stringify(response))
        } else {
            const errors = {
                email: '',
                password: '',
                name: ''
            }
            if(!signupForm.email) {
                errors.email = "Please enter email"
            }
            if(!signupForm.name) {
                errors.name = "Please enter name"
            }
            if(!signupForm.password) {
                errors.password = "Please enter password"
            }
            setErrors(errors)
        }

    }
    return (
        <Container maxWidth={"sm"}>
            <Typography color='white' mt={5} variant="h2">Signup</Typography>
            <Signup handleInputChange={handleInputChange} signupForm={signupForm} errors={errors} handleSignup={handleSignup} />
        </Container>
    )
}
export default SignupContainer;