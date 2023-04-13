import React from "react";
import { Box, Button, Form, FormField, TextInput, Heading } from "grommet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormPrevious } from "grommet-icons";
import { greyButtonStyle, orangeFillButtonStyle } from "../theme";



function RegisterAcademicPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const emailValidator: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordValidator: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const navigate = useNavigate();

    const handleRegistration = () => {
        if(password===confirmPassword) {
            navigate('/academic');
        }
    }
    
    return (
        <>
            <Box
                //border={{color: "black"}}
                height="50px"
                width="100%"
                align='start'
                pad={{left: "20px", top: "20px"}}
            >
                <Button
                    icon={<FormPrevious color="#AFAFAF"/>}
                    style={{...greyButtonStyle, height: "30px", width: "30px"}}
                    onClick={() => navigate("/login_academic")}
                />
            </Box>
            <Box
                direction='column'
                alignSelf="center"
                gap='20px'
                width="100%"
                flex="grow"
                align="center"
                //border={{color: "black"}}
            >
                <Heading level={2} margin={{top: "116px"}}>
                    Регистрация
                </Heading>
                <Form
                    style={{width: "100%"}}
                    onSubmit={() => handleRegistration}    
                >
                    <FormField
                        name={email}
                        validate={{regexp: emailValidator, message: "Введите корректную почту"}}
                        border={false}
                        round="30px"
                        margin={{horizontal: "138px", bottom: "20px"}}
                        height="47px"
                    >
                        <TextInput 
                            required name={email} 
                            onChange={(event) => setEmail(event.target.value)} 
                            placeholder="Введите email"
                        />
                    </FormField>
                    <FormField
                        name={password}
                        validate={{regexp: passwordValidator,
                            message: "Введите от 6 до 20 символов, одну цифру и по одной заглавной и строчной букве"}}
                        border={false}
                        round="30px"
                        margin={{horizontal: "138px", bottom: "20px"}}
                        height="47px"
                    >
                        <TextInput 
                            required name={password}
                            type="password"
                            onChange={(event) => setPassword(event.target.value)} 
                            placeholder="Пароль"
                        />
                    </FormField>
                    <FormField
                        name={password}
                        // validate={{regexp: passwordValidator,
                        //     message: "Введите от 6 до 20 символов, одну цифру и по одной заглавной и строчной букве"}}
                        border={false}
                        round="30px"
                        margin={{horizontal: "138px", bottom: "20px"}}
                        height="47px"
                    >
                        <TextInput 
                            required name={confirmPassword}
                            type="password"
                            onChange={(event) => setConfirmPassword(event.target.value)} 
                            placeholder="Подтвердите пароль"
                        />
                    </FormField>
                    <Button 
                        label="Зарегистрироваться" 
                        type="submit"
                        margin={{horizontal: "138px", bottom: "20px"}}
                        primary style={{...orangeFillButtonStyle, width: "374px", height: "47px"}}
                    />
                </Form>
            </Box>
        </>
    )
}

export default RegisterAcademicPage;