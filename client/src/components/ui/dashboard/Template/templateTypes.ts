export interface TemplateButton {
    type: 'PHONE_NUMBER' | 'URL';
    text: string;
    phone_number?: string;
    url?: string;
    example?: string[];
  }
  
export interface TemplateComponent {
    type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
    text?: string;
    url?: string;
    items?: string[];
    style?: {
      color?: string;
      fontSize?: number;
    };
    buttons?: TemplateButton[];
  }
  
  export interface Template {
    id?: number;
    name: string;
    language: string;
    category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
    components: TemplateComponent[];
  }