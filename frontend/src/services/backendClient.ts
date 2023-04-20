import axios, {AxiosResponse} from "axios";
import {Template, TemplateCreationData, TemplateKeys} from "../types/template";
import {User, UserRegistrationData, UserToken} from "../types/user";

const BASE_URL = 'http://193.124.112.36:8000'

export async function convertFileToTemplate(file: File) {
    const formData = new FormData();
    formData.append("file_uploaded", file);
    const response: AxiosResponse<TemplateKeys> = await axios.post(`${BASE_URL}/api/validate-file/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export async function sendStudentData(student_data: { data: Record<string, Object>, file: File }) {
    const formData = new FormData();
    // const jsonData = new Blob([JSON.stringify(student_data.data)], { type: "application/json" });
    formData.append("keys", JSON.stringify(student_data.data));
    formData.append("file_uploaded", student_data.file);
    const response: AxiosResponse<TemplateKeys> = await axios.post(`${BASE_URL}/api/generate-file/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
    })
    return response.data;
}

export async function loginUser(user: User): Promise<UserToken> {
    const response: AxiosResponse<UserToken> = await axios.post(
        `${BASE_URL}/dj-rest-auth/login/`,
        user,
    )
    return response.data;
}

export async function createTemplate(requestData: { templateData: TemplateCreationData, authToken: string }) {
    const formData = new FormData();
    formData.append("name", requestData.templateData.name);
    formData.append("docx_template", requestData.templateData.docx_template);
    formData.append("json_template", requestData.templateData.json_template);
    const response: AxiosResponse<TemplateKeys> = await axios.post(`${BASE_URL}/api/upload-template-created-by-advisor/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${requestData.authToken}`,
        },
        responseType: 'blob'
    })
    return response.data;
}

export async function searchTemplate(searchString: string): Promise<Template[]> {
    const response: AxiosResponse<Template[]> = await axios.get(
        `${BASE_URL}/api/get-templates-uploaded-by-advisor/`,
        {params: {"search": searchString}},
    )
    return response.data;
}

export async function downloadMedia(url: string): Promise<File> {
    const response: AxiosResponse<File> = await axios.get(`${url}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            responseType: 'blob'
        }
    )
    return response.data;
}