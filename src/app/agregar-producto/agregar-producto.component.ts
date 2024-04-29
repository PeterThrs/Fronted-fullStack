import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../service/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {

  producto: Producto = new Producto();

  constructor(private productoServicio: ProductoService,
      private enrutador: Router
    ){}

    onSubmit(){
      this.guardarProducto();
    }

    guardarProducto(){
      this.productoServicio.agregarProducto(this.producto).subscribe(
        {
          next: (datos) => {
            //son los datos regresados pero por el momento no se ocupan
            this.irListaProductos();
          },
          error: (error: any) => {console.log(error)} 
        }
      );
    }

    irListaProductos(){
      this.enrutador.navigate(['/productos']);
    }

}
