import React from "react";
import {Route, Routes} from "react-router-dom";
import StudentPage from "../pages/StudentPage";
import AcademicPage from "../pages/AcademicPage";
import SearchPage from '../pages/SearchPage';
import CreateTemplatePage from "../pages/CreateTemplatePage";
import LoginAcademicPage from '../pages/LoginAcademicPage';
import FillTemplatePage from "../pages/FillTemplatePage";
import StartPage from '../pages/StartPage';
import SuccessPage from '../pages/SuccessPage';
import {AuthRoute} from "./AuthRoute";


function PageRoutes() {

    return (
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/academic" element={
                <AuthRoute>
                    <AcademicPage />
                </AuthRoute>
            } />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/create_template" element={<CreateTemplatePage />} />
            <Route path="/login_academic" element={<LoginAcademicPage />} />
            <Route path="/fill_template" element={<FillTemplatePage />} />
            <Route path="/success" element={<SuccessPage />} />
        </Routes>
    );
}

export default PageRoutes;