export type Message = string | object | null;

export enum FieldType {
  numeric = 'numeric',
  string = 'string',
  array = 'array',
}

export interface ValidatableRule {
  name: string;
  message: Message;
  parameters: Array<string | number>;
}

export interface RawFieldOptions {
  name?: string;
  rules?: Array<string> | string;
  optional?: boolean;
  messages?: object;
  type?: FieldType;
  defaultValue?: any;
}

export interface FieldOptions {
  name?: string;
  rules: Array<ValidatableRule>;
  type: FieldType;
  defaultValue: any;
  optional: boolean;
}

export interface ValidationResult {
  error: string | null;
  isValid: boolean;
}
