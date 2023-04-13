import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    FileInput,
    Form,
    FormField,
    Heading,
    Paragraph,
    TextArea,
    TextInput,
    Grid
} from "grommet";
import {TemplateItem, TemplateItems} from "../types/template";
import {useMutation} from "react-query";
import {sendStudentData} from "../services/backendClient";
import {saveFile} from "../utils";
import StudentNavBar from "../components/StudentNavBar";
import { orangeFillButtonStyle } from "../theme";

function SearchPage() {
    const [templateData, setTemplateData] = useState<Map<string, TemplateItem> | null>(null);
    const [formData, setFormData] = useState<Record<string, Object>>({});
    const [filename, setFilename] = useState<string>("");
    const [readyTemplates, setReadyTemplates] = useState<File[]>();
    const [email, setEmail] = useState<string>("");
    const [bad, setBad] = useState<boolean>(false)

    const {isLoading, isSuccess, data: pdf_file, mutate: sendForm} = useMutation(
        sendStudentData
    );

    useEffect(() => {
        if (pdf_file) {
            saveFile(pdf_file, `${filename}.pdf`);
        }
    }, [filename, pdf_file])

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
        if (!event) {
            return;
        }
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const jsonData = JSON.parse(event.target?.result?.toString() || "") as TemplateItems;

                const mappedValues = new Map<string, TemplateItem>();

                for (const key in jsonData) {
                    mappedValues.set(key, jsonData[key]);
                }
                setTemplateData(mappedValues)
            };

            reader.readAsText(file);
        }
    };


    const handleFormSubmit = (value: Record<string, Object>) => {
        const files = value?.docx_file as File[]
        delete value.docx_file
        sendForm({
            data: value,
            file: files[0],
        })
    };

    const handleSearchSubmit = (searchText: string) => {

    }


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
        >
                <Heading level={"2"} textAlign="center">
                    Поиск по почте руководителя
                </Heading>
                <Form
                    style={{width: "100%"}}
                    value={email}
                    onChange={text => setEmail(text)}
                    onSubmit={test => setBad(!bad)}
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
                            >
                            <TextInput 
                                placeholder="Введите email здесь..." 
                                style={{height: "50px"}} 
                            />
                        </FormField>
                        <Button label="Искать" type="submit" primary style={{...orangeFillButtonStyle, height: "50px"}} fill={true}/>
                    </Grid>
                </Form>
                {bad && (
                    <Paragraph color="red" margin="10px 0 -10px" textAlign="center" style={{width: "100%", maxWidth: "100%"}}>Не найдено</Paragraph>
                )}
                {readyTemplates && (
                <>
                    {readyTemplates.map((file: File) => (
                        <Button 
                            key={file.name}
                        >
                        </Button>
                    ))}
                </>
                )}
        </Box>
        </>
    );
}

export default SearchPage;