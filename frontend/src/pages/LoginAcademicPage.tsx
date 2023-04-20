import React, {useEffect, useState} from "react";
import {Anchor, Box, Button, Form, FormField, Heading, Paragraph, TextInput} from "grommet";
import {useNavigate} from "react-router-dom";
import {FormPrevious} from "grommet-icons";
import {greyButtonStyle, orangeFillButtonStyle} from "../theme";
import {User, UserRegistrationData, UserToken} from "../types/user";
import {useMutation} from "react-query";
import {AxiosError} from "axios/index";
import {loginUser} from "../services/backendClient";
import {getAuthToken, setAuthToken} from "../services/authentication";


function LoginAcademicPage() {
    const [formData, setFormData] = useState<Record<string, Object>>({});
    const {
        isLoading,
        isSuccess,
        isError,
        error: errorResponse,
        data: loginResponse,
        mutate: login
    } = useMutation<UserToken, AxiosError, User>(
        loginUser
    );

    const navigate = useNavigate();
    const accessToken = getAuthToken();

    useEffect(() => {
        if (accessToken) {
            navigate('/academic')
        }
    }, [accessToken, navigate])


    const emailValidator: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // const passwordValidator: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;


    const handleLogin = async (value: Record<string, Object>) => {
        console.log(value)
        await login(value as unknown as User)
    }

    useEffect(() => {
        if (isSuccess) {
            setAuthToken(loginResponse?.key)
            navigate('/academic')
        }
    }, [isSuccess]);
    
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
                justify="center"
                //border={{color: "black"}}
            >
                <Heading level={2}>
                    Войти
                </Heading>
                <Form
                    value={formData}
                    onSubmit={({value}) => handleLogin(value)}
                    onChange={data => setFormData(data)}
                    style={{width: "100%", textAlign: "center"}}
                    className="loginForm"
                >
                    <FormField
                        name="email"
                        validate={{regexp: emailValidator, message: "Введите корректную почту", error: "help2"}}
                        border={false}
                        round="30px"
                        margin={{bottom: "20px"}}
                        min-height="47px"
                        className="rounded"
                    >
                        <TextInput 
                            required name="email"
                            placeholder="Введите email"
                            width="57%"
                        />
                    </FormField>
                    <FormField
                        name="username"
                        border={false}
                        round="30px"
                        margin={{bottom: "20px"}}
                        min-height="47px"
                        className="rounded"
                    >
                        <TextInput
                            required name="username"
                            placeholder="Введите юзернейм"
                            width="57%"
                        />
                    </FormField>
                    <FormField
                        name="password"
                        //validate={{regexp: passwordValidator}}
                        border={false}
                        round="30px"
                        margin={{bottom: "20px"}}
                        min-height="47px"
                        className="rounded"
                    >
                        <TextInput 
                            required name="password"
                            type="password"
                            placeholder="Пароль"
                            width="57%"
                        />
                    </FormField>
                    <Button 
                        label="Войти" 
                        type="submit"
                        margin={{bottom: "20px"}}
                        primary style={{...orangeFillButtonStyle, width: "57%", height: "47px"}}
                    />
                    {isError &&
                        <div>
                            {Object.values(errorResponse.response?.data || {"error": ["Ошибка!"]}).flatMap(msg => Array.isArray(msg) ? msg : [msg]).map((msg, index) => (
                                <Paragraph key={index} color="rgb(255, 64, 129)" margin="10px 0 -10px" textAlign="center" style={{width: "100%", maxWidth: "100%"}}>{msg}</Paragraph>
                            ))}
                        </div>
                    }
                </Form>
            </Box>
        </>
    )
}

export default LoginAcademicPage;