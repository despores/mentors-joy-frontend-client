import React from "react";
import { Box, Button } from "grommet";
import { Logout } from "grommet-icons";
import { greyButtonStyle, orangeButtonStyle } from "../theme";
import { useNavigate } from "react-router-dom";


export interface NavBarProps {
    searchActive: boolean
}

function StudentNavBar(studentNavBarProps: NavBarProps) {
    const navigate = useNavigate();
    const searchActive = studentNavBarProps.searchActive

    return (
        <Box
                height="50px"
                width="100%"
                align='center'
                direction="row"
                gap="10px"
                pad={{horizontal: "3.5%", top: "2.9%"}}
                className="navbar"
            >
                <div className="buttons">
                    <Button
                        label='Загрузить шаблон из файла'
                        style={{...(!searchActive ? orangeButtonStyle : greyButtonStyle),  whiteSpace: "nowrap"}}
                        onClick={() => navigate("/student")}
                    />
                    <Button
                        label='Поиск шаблона по эл.почте'
                        style={{...(searchActive ? orangeButtonStyle : greyButtonStyle),  whiteSpace: "nowrap"}}
                        onClick={() => navigate("/search")}
                    />
                </div>
                <Button
                    justify='center'
                    icon={<Logout color="#AFAFAF" size="16px" />}
                    style={{...greyButtonStyle, width: "30px"}}
                    onClick={() => navigate("/")}
                />
            </Box>
    );
}

export default StudentNavBar;