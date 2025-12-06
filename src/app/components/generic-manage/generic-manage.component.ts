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
export class GenericManageComponent implements OnInit, OnChanges  {

  @Input() title: string = '';
  @Input() singular: string = 'Elemento';
  @Input() fields: ManageFieldConfig[] = [];
  @Input() initialValue: any = null;
  @Input() mode: 'create' | 'update' | 'delete' = 'create';

  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  submitted: boolean = false;
  files: { [key: string]: File | null } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    if (this.mode === 'delete') return;

    const group: any = {};

    this.fields.forEach(f => {
      group[f.name] = [
        this.initialValue ? this.initialValue[f.name] : '',
        f.required ? Validators.required : null
      ];
    });

    this.form = this.fb.group(group);
  }

  onCurrencyInput(event: any, fieldName: string) {
    const raw = event.target.value.replace(/\D+/g, ""); // solo números

    const numericValue = Number(raw);
    this.form.get(fieldName)?.setValue(numericValue);

    // formatear como pesos
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue'] && this.initialValue && this.form) {
      this.form.patchValue(this.initialValue);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const data = { ...this.form.value };

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value as any));

    Object.keys(this.files).forEach(key => {
      if (this.files[key]) {
        formData.append(key, this.files[key]!, this.files[key]!.name);
      }
    });

    const hasFiles = Object.keys(this.files).length > 0;
    this.save.emit(hasFiles ? formData : this.form.value);
  }

  onDelete() {
    this.delete.emit();
  }
}
