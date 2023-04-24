import {Button, Container, IconButton, InputAdornment} from "@mui/material";
import {useState} from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {StyledInput } from "./LoginStyles";
import {LoginForm} from "../../containers/LoginContainer";

type Props = {
    loginForm: LoginForm,
    errors: LoginForm,
    handleInputChange: (field: string, value: string) => void;
    handleLogin: () => void;
}
const Login = ({loginForm, handleLogin, handleInputChange, errors} : Props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show : boolean) => !show);

    return (
        <Container>
            <StyledInput onChange={(event : any) => handleInputChange('username', event.target.value)}
                         notched={false}
                         id="email"
                         color="primary"
                         fullWidth
                         value={loginForm.username}
                         error={errors.username.length > 0}
                         label="Email"
                         placeholder="Please enter your email" />
            <StyledInput onChange={(event : any) => handleInputChange('password', event.target.value)}
                         notched={false}
                         fullWidth
                         label="Password" type={showPassword ? 'text' : 'password'} id="password"
                         endAdornment={
                           <InputAdornment position="end">
                               <IconButton
                                   aria-label="toggle password visibility"
                                   onClick={handleClickShowPassword}
                                   edge="end"
                                   color="primary"
                               >
                                   {showPassword ? <VisibilityOff /> : <Visibility />}
                               </IconButton>
                           </InputAdornment>}
                         value={loginForm.password}
                         error={errors.password.length > 0}
                         placeholder="Please enter your password" />
            <Button onClick={handleLogin} fullWidth sx={{marginTop: "2%"}} variant="contained" color="primary">Login</Button>
        </Container>
    )
}
export default Login;