//  write navbar component here
import React from 'react';

import {Button, Header, Nav} from 'grommet';
import {NavLink, useLocation} from "react-router-dom";

export function Navbar() {

    const location = useLocation()

    return (
        <Header pad="small" background={"brand"} style={{height: "70px", marginBottom: "20px", borderBottom: "1px solid rgba(0, 0, 0, .2)"}}>
            {location.pathname !== "/academic" && (
                <Nav alignContent="center" direction="row" pad="xsmall" margin={"auto"}>
                    <NavLink to="/">
                        {({ isActive }) => (
                            (isActive ? <Button primary label="Загрузка своего шаблона" /> : <Button secondary label="Загрузка своего шаблона" /> )
                        )}
                    </NavLink>
                    <NavLink to="/search">
                        {({ isActive }) => (
                            (isActive ? <Button primary label="Поиск шаблона по научному руководителю" /> : <Button secondary label="Поиск шаблона по научному руководителю" />  )
                        )}
                    </NavLink>
                </Nav>
            )}
        </Header>
    )
}
