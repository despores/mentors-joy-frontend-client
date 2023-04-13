import React from "react";
import { 
    Box, 
    Heading, 
    Form, 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    FormField,
    TextInput,
    TextArea,
    Button,
    Tag } from "grommet";
import { useLocation, useNavigate } from "react-router-dom";
import { TemplateKeys, TemplateItems } from "../types/template";
import { saveJSON } from "../utils";
import { orangeFillButtonStyle, greyButtonStyle } from "../theme";
import { FormPrevious } from "grommet-icons";


function CreateTemplatePage() {
    const [formData, setFormData] = React.useState<Record<string, string>>({});

    const location = useLocation();
    const navigate = useNavigate();

    const templateData: TemplateKeys = location.state.templateData;
    const filename: string = location.state.filename;

    
    const handleSubmit = (data: Record<string, string>) => {
        const items = {} as TemplateItems

        for (const key in data) {
            const split_values = key.split(separator);
            const item_key = split_values[0]
            const item_field = split_values[1];
            if (!items[item_key]) {
                items[item_key] = {name: '', comment: ''};
            }
            if (item_field === "name"){
                items[item_key].name = data[key]
            } else {
                items[item_key].comment = data[key]
            }
        }

        saveJSON(items, `${filename}.json`)
        navigate('/success', {state: {to: '/academic'}});
    }

    const separator = ":::";

    return (
        <>
             <Box
                //border={{color: "black"}}
                height="50px"
                width="100%"
                align='start'
                pad={{left: "3.5%", top: "3.5%"}}
            >
                <Button
                    icon={<FormPrevious color="#AFAFAF"/>}
                    style={{...greyButtonStyle, height: "5.25%", width: "5.25%"}}
                    onClick={() => navigate("/academic")}
                />
            </Box>
            <Box
                flex="grow"
                width="100%"
                align="center"

            >
                <Heading level={"2"} style={{ marginBottom: '5px' }}>
                    Отправка шаблона
                </Heading>
                <Form
                    style={{width: "100%"}}
                    value={formData}
                    onChange={data => setFormData(data)}
                    onReset={() => setFormData({})}
                    onSubmit={({ value }) => handleSubmit(value)}
                >

                    {templateData.variables.map((field, index) => (
                        <Card key={field} background="light-1" pad={"medium"} margin={"medium"} style={{paddingBottom: "15px"}}>
                            <CardHeader width={"100%"} style={{display: "block"}}>
                                <FormField name={field} style={{fontWeight: "500"}} >
                                    <TextInput required name={`${field}${separator}name`} placeholder="Название"/>
                                </FormField>
                            </CardHeader>
                            <CardBody>
                                <FormField name={field} style={{fontWeight: "500"}} >
                                    <TextArea required name={`${field}${separator}comment`} style={{height: "45px"}} placeholder="Комментарий"/>
                                </FormField>
                            </CardBody>
                            <CardFooter>
                                    <Box direction="row-reverse" width="100%" style={{padding: "10px 0 0"}}>
                                            <Tag value={field} size="small" />
                                    </Box>
                            </CardFooter>
                        </Card>
                    ))}

                    <Button label="Скачать" type="submit" margin={"medium"} primary style={{...orangeFillButtonStyle, paddingTop: "0", width: "93%", height: "50px"}}/>

                </Form>
            </Box>
        </>
    );
}


export default CreateTemplatePage;