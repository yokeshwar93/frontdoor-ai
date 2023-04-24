import {StyledInput} from "../login/LoginStyles";
import {Button, Container, IconButton, InputAdornment} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {useState} from "react";
import {SignupForm} from "../../containers/SignupContainer";
type Props = {
    signupForm: SignupForm,
    errors: SignupForm,
    handleSignup: () => void;
    handleInputChange: (field: string, value: string) => void;
}
const Signup = ({signupForm, handleSignup, errors, handleInputChange} : Props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword((show : boolean) => !show);

    return (
        <Container>
            <StyledInput onChange={(event : any) => handleInputChange('name', event.target.value)}
                         notched={false} id="email"
                         color="primary"
                         fullWidth
                         label="Email"
                         value={signupForm.name}
                         error={errors.name.length > 0}
                         placeholder="Please enter your name" />
            <StyledInput onChange={(event : any) => handleInputChange('email', event.target.value)}
                         notched={false}
                         id="name"
                         color="primary"
                         fullWidth
                         label="Email"
                         error={errors.email.length > 0}
                         value={signupForm.email}
                         placeholder="Please enter your email" />
            <StyledInput onChange={(event : any) => handleInputChange('password', event.target.value)}
                         notched={false}
                         fullWidth
                         label="Password"
                         type={showPassword ? 'text' : 'password'}
                         id="password"
                         value={signupForm.password}
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
                         error={errors.password.length > 0}
                         placeholder="Please enter your password" />
            <Button onClick={handleSignup} fullWidth sx={{marginTop: "2%"}} variant="contained" color="primary">Signup</Button>
        </Container>
    )
}
export default Signup;