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

export interface CreateTemplateProps {
    templateData: TemplateKeys | undefined;
    filename: string
}
