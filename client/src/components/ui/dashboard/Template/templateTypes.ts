export interface TemplateButton {
    type: 'PHONE_NUMBER' | 'URL';
    text: string;
    phone_number?: string;
    url?: string;
    example?: string[];
  }
  
  export interface TemplateComponent {
    type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
    format?: 'IMAGE' | 'TEXT';
    text?: string;
    example?: {
      header_handle?: string[];
      body_text?: any[][];
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