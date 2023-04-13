import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    FileInput,
    Form,
    Heading,
} from "grommet";
import {TemplateItem, TemplateItems} from "../types/template";
import { orangeFillButtonStyle } from "../theme";
import { useNavigate } from "react-router-dom";
import StudentNavBar from "../components/StudentNavBar";

function StudentPage() {
    const [templateData, setTemplateData] = useState<Map<string, TemplateItem> | null>(null);
    const [docxFileData, setDocxFileData] = useState<File>();
    const [jsonFileData, setJsonFileData] = useState<File>();
    const navigate = useNavigate();


    useEffect(() => {
        if(templateData) {
            navigate('/fill_template', {state: {templateData: templateData, docxFileData: docxFileData}})
        }
    }, [templateData, docxFileData, navigate])

    const handleFileSubmit = () => {
        if (!docxFileData && !jsonFileData) {
            return;
        }
        if (jsonFileData) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const jsonData = JSON.parse(event.target?.result?.toString() || "") as TemplateItems;

                const mappedValues = new Map<string, TemplateItem>();

                for (const key in jsonData) {
                    mappedValues.set(key, jsonData[key]);
                }
                setTemplateData(mappedValues);
            };

            reader.readAsText(jsonFileData);
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement> | undefined, format: string) => {
        if (!event) {
            return;
        }
        const file = event.target.files?.[0];
        if (file) {
            if (format === ".json") {
                setJsonFileData(file);
            } else {
                setDocxFileData(file);
            }
            
        }
    }




    return (
        <>
        <StudentNavBar searchActive={false}/>
        <Box 
            direction='column'
            alignSelf="center"
            gap='20px'
            width="100%"
            flex="grow"
            align="center"
        >
            <Heading level={"2"} margin={{top: "150px"}}>
                Загрузка шаблона
            </Heading>
            <Box width="100%" style={{padding: "0 3.5%"}}>
                <Form
                    style={{width: "100%"}}
                    onSubmit={() => handleFileSubmit()}
                >
                    <Box width="100%" gap="20px">
                    <FileInput
                        name="file"
                        onChange={(event) => {handleFileUpload(event, ".json")}}
                        accept=".json"
                        messages={{
                            browse: "выбрать файл",
                            dropPrompt: "Перетащите .json файл сюда",
                            dropPromptMultiple: "Перетащите .json файлы сюда",
                            files: "файлов",
                            remove: "Удалить",
                            removeAll: "Удалить все",
                        }}
                        required
                    />
                    <FileInput
                        name="file"
                        onChange={(event) => {handleFileUpload(event, ".docx")}}
                        accept=".docx"
                        messages={{
                            browse: "выбрать файл",
                            dropPrompt: "Перетащите .docx файл сюда",
                            dropPromptMultiple: "Перетащите .docx файлы сюда",
                            files: "файлов",
                            remove: "Удалить",
                            removeAll: "Удалить все",
                        }}
                        required
                    />
                    </Box>
                    <Button label="Отправить" type="submit" margin={"medium"} primary style={{...orangeFillButtonStyle, width: "100%", height: "50px", margin: "20px 0"}}/>
                </Form>
            </Box>
        </Box>
        </>
    );
}

export default StudentPage;