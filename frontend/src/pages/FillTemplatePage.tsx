import React from "react";
import {
    Box,
    Heading,
    Form,
    Card,
    CardHeader,
    CardBody,
    Button,
    Paragraph,
    FormField,
    TextArea
} from "grommet";
import {FormPrevious} from "grommet-icons";
import {useLocation, useNavigate, Navigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {useMutation} from "react-query";
import {TemplateItem} from "../types/template";
import {sendStudentData} from "../services/backendClient";
import {greyButtonStyle, orangeFillButtonStyle} from "../theme";
import {saveFile} from "../utils";


function FillTemplatePage() {
    const [formData, setFormData] = useState<Record<string, Object>>({});
    const navigate = useNavigate();


    const {isLoading, isSuccess, data: pdf_file, mutate: sendForm} = useMutation(
        sendStudentData
    );

    const location = useLocation();
    const templateData: Map<string, TemplateItem>= location.state?.templateData || {};
    const docxFileData: File= location.state?.docxFileData || {};
    const redirected: string = location.state?.redirected || "";

    useEffect(() => {
        if (pdf_file) {
            saveFile(pdf_file, `${docxFileData?.name}.pdf`);
        }
    }, [docxFileData, pdf_file])

    useEffect(() => {
        if (isSuccess) {
            navigate('/success', {state: {to: '/student'}})
        }
    }, [isSuccess, navigate])

    if (!redirected) {
        return <Navigate to="/" />;
    }


    const handleFormSubmit = (value: Record<string, Object>) => {
        sendForm({
            data: value,
            file: docxFileData!,
        })
    };

    return (
        <>
            <Box
                //border={{color: "black"}}
                height="50px"
                width="100%"
                align='start'
                pad={{left: "20px", top: "20px"}}
            >
                <Button
                    icon={<FormPrevious color="#AFAFAF"/>}
                    style={{...greyButtonStyle, height: "30px", width: "30px"}}
                    onClick={() => navigate("/student")}
                />
            </Box>
            <Heading level={"2"} style={{marginBottom: '5px', marginTop: '10px'}}>
                Отправка шаблона
            </Heading>
            <Form
                style={{width: "100%"}}
                value={formData}
                onChange={data => setFormData(data)}
                onSubmit={({value}) => handleFormSubmit(value)}
            >

                {Array.from(templateData.entries()).map(([key, value]) => (
                    <Card key={key} background="light-1" pad={"medium"} margin={"medium"}>
                        <CardHeader width={"100%"} style={{display: "block"}}>
                            <Heading level={"3"}>
                                {value.name}
                            </Heading>
                            <Paragraph style={{marginTop: "-10px"}}>
                                {value.comment}
                            </Paragraph>
                        </CardHeader>
                        <CardBody>
                            <FormField name={key} style={{fontWeight: "500"}}>
                                <TextArea required name={key} style={{height: "45px"}}/>
                            </FormField>
                        </CardBody>
                        <br></br>
                    </Card>
                ))}

                <Button label="Отправить" disabled={isLoading} type="submit" margin={"medium"} primary
                        style={{...orangeFillButtonStyle, width: "93%", height: "50px"}}/>
            </Form>
        </>
    );
}

export default FillTemplatePage;