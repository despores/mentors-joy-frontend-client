import React, { useState } from "react";
import { Box, Heading, Button, Form, FormField, TextInput, Anchor } from "grommet";
import { useNavigate } from "react-router-dom";
import { FormPrevious } from "grommet-icons";
import { greyButtonStyle, orangeFillButtonStyle } from "../theme";


function LoginAcademicPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // const emailValidator: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // const passwordValidator: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const navigate = useNavigate();
    
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
                    onClick={() => navigate("/")}
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
                <Heading level={2} margin={{top: "130px"}}>
                    Войти
                </Heading>
                <Form
                    style={{width: "100%"}}
                    onSubmit={() => navigate('/academic')}    
                >
                    <FormField
                        name={email}
                        //validate={{regexp: emailValidator, message: "Введите корректную почту", error: "help2"}}
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
                        //validate={{regexp: passwordValidator}}
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
                    <Button 
                        label="Войти" 
                        type="submit"
                        margin={{horizontal: "138px", bottom: "20px"}}
                        primary style={{...orangeFillButtonStyle, width: "374px", height: "47px"}}
                    />
                </Form>
                <Anchor
                    href="/register_academic"
                    label="Нет аккаунта? Регистрация"
                    color="#AFAFAF"
                    size="16px"
                />
            </Box>
        </>
    )
}

export default LoginAcademicPage;