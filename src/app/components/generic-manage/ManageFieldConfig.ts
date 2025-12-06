export interface ManageFieldConfig {
  name: string;             // 'email'
  label: string;            // 'Correo electrónico'
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date' | 'password' | 'checkbox' | 'radio' | 'select';
  
  required?: boolean;
  disabled?: boolean;

  placeholder?: string;

  min?: number;
  max?: number;

  options?: any[];          // Para select y radio
  optionLabel?: string;     // Ej: 'name'
  optionValue?: string;     // Ej: 'id'

  inline?: boolean;         // Para radios inline
}
