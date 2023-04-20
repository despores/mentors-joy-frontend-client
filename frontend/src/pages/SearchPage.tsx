import React, {useEffect, useState} from "react";
import {Box, Button, Form, FormField, Grid, Heading, Paragraph, TextInput} from "grommet";
import StudentNavBar from "../components/StudentNavBar";
import {greyButtonStyle, orangeFillButtonStyle} from "../theme";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {downloadMedia, searchTemplate} from "../services/backendClient";
import {Template, TemplateItem} from "../types/template";
import {useNavigate} from "react-router-dom";

function SearchPage() {
    const [formData, setFormData] = useState<Record<string, Object>>({});

    const {
        isLoading,
        isSuccess,
        isError,
        data: templates,
        mutate: search
    } = useMutation<Template[], AxiosError, string>(
        searchTemplate
    );

    const {
        isLoading: JSONIsDownloading,
        isSuccess: JSONIsDownloaded,
        data: JSONFile,
        mutate: downloadJSONFile,
    } = useMutation<File, AxiosError, string>(
        downloadMedia
    );

    const {
        isLoading: DOCXIsDownloading,
        isSuccess: DOCXIsDownloaded,
        data: DOCXFile,
        mutate: downloadDOCXFile,
    } = useMutation<File, AxiosError, string>(
        downloadMedia
    );

    const navigate = useNavigate();

    const handleSearchSubmit = async (formData: Record<string, Object>) => {
        await search(formData.searchString as string)
    }

    const downloadTemplateFiles = async (DOCXFileName: string, JSONFileName: string) => {
        await downloadDOCXFile(DOCXFileName)
        await downloadJSONFile(JSONFileName)
    }

    useEffect(() => {
        if(JSONIsDownloaded && DOCXIsDownloaded) {
            const reader = new FileReader();
            reader.readAsText(JSONFile);
            reader.onload = () => {
                const templateData = new Map<string, TemplateItem>();
                const json = JSON.parse(reader.result as string);
                Object.entries(json).forEach(([key, value]) => {
                    templateData.set(key, value as TemplateItem);
                });
                console.log(templateData)
                navigate('/fill_template', {state: {templateData: templateData, docxFileData: DOCXFile, redirected: "yes"}})
            };
        }
    },[JSONIsDownloaded, DOCXIsDownloaded])

    return (
        <>
            <StudentNavBar searchActive={true}/>
            <Box
                direction='column'
                alignSelf="center"
                gap='20px'
                width="100%"
                flex="grow"
                align="center"
                justify="center"
            >
                <Heading level={"2"} textAlign="center">
                    Поиск по почте руководителя
                </Heading>
                <Form
                    style={{width: "100%"}}
                    value={formData}
                    onSubmit={({value}) => handleSearchSubmit(value)}
                    onChange={data => setFormData(data)}
                >
                    <Grid
                        columns={["3/4", "1/4"]}
                        align="center"
                        gap="medium"
                        fill="horizontal"
                        style={{padding: "0 3.5%", paddingRight: "7%"}}
                    >
                        <FormField
                            style={{fontWeight: "500"}}
                            primary fill={true}
                            className="rounded"
                            name="searchString"
                            margin="0px"
                        >
                            <TextInput
                                placeholder="Введите email здесь..."
                                name="searchString"
                                style={{width: "139%", height: "50px", textAlign: "left", zIndex: "0"}}
                            />
                        </FormField>
                        <Button disabled={isLoading} label="Искать" type="submit" primary
                                style={{...orangeFillButtonStyle, height: "50px", zIndex: "10"}} fill={true}/>
                    </Grid>
                </Form>
                {(isError || templates?.length === 0) && (
                    <Paragraph color="red" margin="10px 0 -10px" textAlign="center"
                               style={{width: "100%", maxWidth: "100%"}}>Не найдено</Paragraph>
                )}
                <div style={{width: "93%"}}>
                    {isSuccess && (
                        <>
                            {templates.map((value) => (
                                <Button
                                    key={value.id}
                                    label={value.name}
                                    style={{
                                        ...greyButtonStyle,
                                        backgroundColor: "#F8F8F8",
                                        color: "#121212",
                                        display: "block",
                                        height: "60px",
                                        width: "100%",
                                        marginBottom: "10px",
                                        textAlign: "left",
                                        fontWeight: "500"
                                    }}
                                    disabled={JSONIsDownloading || DOCXIsDownloading}
                                    onClick={() => downloadTemplateFiles(value.docx_template, value.json_template)}
                                />
                            ))}
                        </>
                    )}
                </div>
            </Box>
        </>
    );
}

export default SearchPage;