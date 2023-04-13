import React from "react";
import { Box, Button, Heading } from "grommet";
import { useNavigate } from "react-router-dom";
import { greyButtonStyle } from "../theme";


function StartPage() {

    const navigate = useNavigate();

    function handleNavigation(nav: string) {
        navigate(nav);
    }

    return (
        <Box
            direction='column'
            align='center'
            alignSelf="center"
            gap='20px'
            justify="center"
        >
            <Heading level={2} margin={{bottom: '40px'}}>
                Войти как
            </Heading>
            <Button
                label='Научный руководитель'
                style={greyButtonStyle}
                onClick={() => handleNavigation('/login_academic')}
            />
            <Button
                label='Студент'
                style={greyButtonStyle}
                onClick={() => handleNavigation('/student')}
            />
        </Box>
    )
}

export default StartPage;