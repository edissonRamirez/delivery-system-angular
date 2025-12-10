import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface ManageFieldConfig {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-generic-manage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './generic-manage.component.html',
})
export class GenericManageComponent implements OnInit, OnChanges {

  @Input() title: string = '';
  @Input() singular: string = 'Elemento';
  @Input() fields: ManageFieldConfig[] = [];
  @Input() initialValue: any = null;
  @Input() mode: 'create' | 'update' | 'delete' = 'create';

  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  submitted = false;
  files: Record<string, File | null> = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.mode !== 'delete') {
      this.buildForm();
    }
  }

  /** Construye el formulario dinámico */
  private buildForm() {
    const group: any = {};

    this.fields.forEach(f => {
      group[f.name] = [
        this.initialValue ? this.initialValue[f.name] : '',
        f.required ? Validators.required : null
      ];
    });

    this.form = this.fb.group(group);
  }

  /** Detecta cambios en fields o initialValue */
  ngOnChanges(changes: SimpleChanges): void {

    // Reconstruir formulario al cambiar fields
    if (changes['fields'] && !changes['fields'].firstChange) {
      this.buildForm();
    }

    // Actualizar valores al cambiar initialValue
    if (changes['initialValue'] && this.initialValue && this.form) {
      this.form.patchValue(this.initialValue);
    }
  }

  /** Controlador de inputs tipo moneda */
  onCurrencyInput(event: any, fieldName: string) {
    const raw = event.target.value.replace(/\D+/g, '');
    const numericValue = Number(raw);
    this.form.get(fieldName)?.setValue(numericValue);

    event.target.value = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(numericValue);
  }

  onFileSelected(event: any, fieldName: string) {
    const file = event.target.files[0];
    this.files[fieldName] = file;
  }

  /** Submit final */
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const data = { ...this.form.value };

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value as any));

    Object.entries(this.files).forEach(([key, file]) => {
      if (file) formData.append(key, file, file.name);
    });

    const hasFiles = Object.keys(this.files).length > 0;
    this.save.emit(hasFiles ? formData : data);
  }

  onDelete() {
    this.delete.emit();
  }
}
