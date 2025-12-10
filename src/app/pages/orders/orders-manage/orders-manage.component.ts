import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { AddressService } from "src/app/services/address.service";
import { CustomerService } from "src/app/services/customer.service";
import { MenuService } from "src/app/services/menu.service";
import { Router } from "@angular/router";
import { GenericManageComponent } from "src/app/components/generic-manage/generic-manage.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-orders-manage",
  standalone: true,
  imports: [CommonModule, FormsModule, GenericManageComponent],
  templateUrl: "./orders-manage.component.html"
})
export class OrdersManageComponent implements OnInit {

  title = "Crear Orden";
  order: any = { quantity: 1 };

  customers: any[] = [];
  menus: any[] = [];
  addresses: any[] = [];

  fields = [
    { name: "customer_id", label: "Cliente", type: "select", required: true, options: [], optionLabel: "name", optionValue: "id" },

    { name: "menu_id", label: "Producto / Menú", type: "select", required: true, options: [], optionLabel: "product_name", optionValue: "id" },

    { name: "address_id", label: "Dirección", type: "select", required: true, options: [], optionLabel: "street", optionValue: "id" },

    { name: "quantity", label: "Cantidad", type: "number", required: true }
  ];

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private menuService: MenuService,
    private addressService: AddressService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ============================
    // CLIENTES
    // ============================
    this.customerService.getAll().subscribe(res => {
      this.customers = res;
      this.fields.find(f => f.name === "customer_id")!.options = res;
      this.fields = [...this.fields];
    });

    // ============================
    // MENÚS / PRODUCTOS
    // ============================
    this.menuService.getAll().subscribe(res => {
      const menuMapped = res.map((m: any) => ({
        id: m.id,
        product_name: m.product?.name || "Producto",
      }));

      this.menus = menuMapped;
      this.fields.find(f => f.name === "menu_id")!.options = menuMapped;
      this.fields = [...this.fields];
    });

    // ============================
    // DIRECCIONES
    // ============================
    this.addressService.getAll().subscribe(res => {

      const addressesMapped = res.map((a: any) => ({
        id: a.id,
        street: `${a.street} (${a.city})`,
      }));

      this.addresses = addressesMapped;
      this.fields.find(f => f.name === "address_id")!.options = addressesMapped;
      this.fields = [...this.fields];
    });
  }

  onSave(data: any) {
    this.orderService.create(data).subscribe(() =>
      this.router.navigate(['/orders/list'])
    );
  }

  onCancel() {
    this.router.navigate(['/orders/list']);
  }
}
