import axios, {AxiosResponse} from "axios";
import {TemplateKeys} from "../types/template";

const BASE_URL = 'http://127.0.0.1:8000/'

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

export async function sendStudentData(student_data: {data: Record<string, Object>, file: File}) {
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