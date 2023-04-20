export interface TemplateItem {
    name: string | number;
    comment: string | number;
}

export interface TemplateItems {
    [keys: string]: TemplateItem
}

export interface TemplateKeys {
    variables: [string];
}

export interface TemplateCreationData {
    name: string
    docx_template: File
    json_template: File
}

export interface Template {
    id: number
    name: string
    docx_template: string
    json_template: string
    advisor: {
        email: string
        username: string
        firstname: string
        lastname: string
    }
}