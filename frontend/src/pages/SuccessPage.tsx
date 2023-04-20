import React, { useEffect } from "react";
import { Button, Heading } from "grommet";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { orangeFillButtonStyle } from "../theme";


function SuccessPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const link: string = location.state?.to || "";
    
    if(!link) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Heading level={"2"}>
                Успешно отправлено!
            </Heading>
            <Button 
                label={"Назад"} 
                margin={"xsmall"} 
                onClick={() => {navigate(link)}} 
                primary style={{...orangeFillButtonStyle, width: "75%", height: "50px"}}
            />
        </>
    )
}

export default SuccessPage;