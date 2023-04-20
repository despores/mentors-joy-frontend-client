import React, {useEffect} from 'react';
import {
    Box,
    Button,
    FileInput,
    Form,
    Grid,
    Heading,
    Paragraph,
} from "grommet";
import {useMutation} from "react-query";
import {convertFileToTemplate} from "../services/backendClient";
import {downloadTemplate} from "../utils";
import {useNavigate} from 'react-router-dom';
import {Attachment, Logout} from 'grommet-icons';
import {greyButtonStyle, orangeFillButtonStyle} from '../theme';

function AcademicPage() {
    const [fileData, setFileData] = React.useState<File>();
    const [filename, setFilename] = React.useState<string>();

    const navigate = useNavigate();


    const readyTemplates = ["Пояснительная записка.docx",
        "Программа и методика испытаний.docx",
        "Руководство оператора.docx",
        "Руководство программиста.docx",
        "Текст программы.docx",
        "Техническое задание.docx"]

    const {isLoading, isError, data: templateData, mutate: convertDOCX} = useMutation(
        convertFileToTemplate
    );

    function sendDOCX(file: File | undefined) {
        if (!file) {
            return;
        }
        try {
            convertDOCX(file);
        } catch (err) {
            console.log(err);
        }
    }


    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
        if (!event) {
            return;
        }
        const file = event.target.files?.[0];
        if (file) {
            setFileData(file);
            setFilename(file.name.split('.').slice(0, -1).join('.'));
        }
    }

    useEffect(() => {
        if (templateData && filename) {
            navigate('/create_template', {state: {docx_file: fileData, templateData: templateData, filename: filename}})
        }
    }, [templateData, filename, navigate])

    return (
        <>
            <Box
                //border={{color: "black"}}
                height="50px"
                width="100%"
                align='end'
                pad={{right: "20px", top: "20px"}}
            >
                <Button
                    justify='center'
                    icon={<Logout color="#AFAFAF"/>}
                    style={{...greyButtonStyle, height: "30px", width: "30px"}}
                    onClick={() => navigate("/")}
                />
            </Box>
            <Box
                height="100%"
                width="100%"
                align="center"
                direction="column"
                className="gridButtons"
                //border={{color: "black"}}
            >
                <Heading level={"5"} color="#6A6A6A">
                    Готовые шаблоны
                </Heading>
                <Grid
                    rows={["60px", "60px", "60px"]}
                    columns={["297px", "297px"]}
                    gap="10px"
                    margin={{vertical: "23px", top: "10px"}}
                >
                    {readyTemplates.map((name: string) => (
                        <Button
                            label={name.split('.')[0]}
                            style={{...greyButtonStyle, backgroundColor: "#F8F8F8", color: "#121212"}}
                            onClick={() => downloadTemplate(name)}
                        />
                    ))}
                </Grid>
            </Box>
            <Box
                direction="column"
                width="100%"
                flex="grow"
                align="center"
            >
                <Heading level={"2"}>
                    Загрузка шаблона
                </Heading>
                <Box width="100%" style={{padding: "0 3.5%"}}>
                    <Form
                        style={{width: "100%"}}
                        onSubmit={({value}) => sendDOCX(fileData)}
                    >
                        <div style={{position: "relative"}}>
                            <Attachment size="medium" style={{
                                position: "absolute",
                                right: "14px",
                                top: "22%",
                                transform: "scale(-1, 1) rotate(180deg)",
                                width: "30px",
                                height: "30px",
                                fill: "#AFAFAF",
                                stroke: "#AFAFAF"
                            }}/>
                            <FileInput
                                name="file"
                                onChange={(event) => {
                                    handleFileUpload(event)
                                }}
                                accept=".docx"
                                messages={{
                                    browse: "     ",
                                    dropPrompt: "Перетащите .docx файл сюда",
                                    dropPromptMultiple: "Перетащите .docx файлы сюда",
                                    files: "файлов",
                                    remove: "Удалить",
                                    removeAll: "Удалить все",
                                }}
                                required
                            />
                        </div>
                        {isError && <Paragraph color="red" margin="10px 0 -10px" textAlign="center"
                                               style={{width: "100%", maxWidth: "100%"}}>Ошибка загрузки
                            файла</Paragraph>}
                        <Button disabled={isLoading} label="Отправить" type="submit" margin={"medium"} primary
                                style={{...orangeFillButtonStyle, width: "100%", height: "50px", margin: "24px 0"}}/>
                    </Form>
                </Box>
            </Box>
        </>
    );
}

export default AcademicPage;