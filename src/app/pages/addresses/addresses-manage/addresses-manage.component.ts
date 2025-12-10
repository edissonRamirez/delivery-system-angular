import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AddressService } from "src/app/services/address.service";
import { GenericManageComponent } from "src/app/components/generic-manage/generic-manage.component";
import { MapPickerComponent } from "../../../components/map-picker/map-picker.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-addresses-manage",
  standalone: true,
  imports: [CommonModule, GenericManageComponent, MapPickerComponent],
  templateUrl: "./addresses-manage.component.html"
})
export class AddressesManageComponent implements OnInit {

  @ViewChild(GenericManageComponent) formRef!: GenericManageComponent;

  title = "Crear Dirección";
  address: any = {};
  id!: number;
  mode: 'create' | 'update' | 'delete' = 'create';

  showMap = false;

  fields = [
    { name: 'street', label: 'Calle', type: 'text', required: true },
    { name: 'city', label: 'Ciudad', type: 'text', required: true },
    { name: 'state', label: 'Departamento', type: 'text', required: true },
    { name: 'postal_code', label: 'Código Postal', type: 'text' },
    { name: 'additional_info', label: 'Información Adicional', type: 'text' },

    { name: 'latitude', label: 'Latitud', type: 'number' },
    { name: 'longitude', label: 'Longitud', type: 'number' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AddressService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.mode = "update";
      this.id = Number(id);
      this.title = "Actualizar Dirección";

      this.service.getById(this.id).subscribe(res => {
        this.address = res;
      });
    }
  }

  openMapPicker() {
    this.showMap = true;
  }

  setMapLocation(coords: { lat: number; lng: number; street?: string; city?: string }) {

    // Guardar en el modelo
    this.address.latitude = coords.lat;
    this.address.longitude = coords.lng;
    if (coords.street) this.address.street = coords.street;
    if (coords.city) this.address.city = coords.city;

    // Actualizar el formulario reactivo del generic-manage
    setTimeout(() => {
      this.formRef?.form.patchValue({
        street: coords.street || '',
        city: coords.city || '',
        latitude: coords.lat,
        longitude: coords.lng
      });
    });

    this.showMap = false;
  }

  onSave(data: any) {
    if (this.mode === "create") {
      this.service.create(data).subscribe(() => this.router.navigate(['/addresses/list']));
    } else {
      this.service.update(this.id, data).subscribe(() => this.router.navigate(['/addresses/list']));
    }
  }

  onCancel() {
    this.router.navigate(['/addresses/list']);
  }
}
