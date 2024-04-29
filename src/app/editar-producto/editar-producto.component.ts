import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../service/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  // styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {

  producto: Producto = new Producto();
  id: number;

  constructor(private productoServicio: ProductoService,
    private ruta: ActivatedRoute,
    private enrutador: Router
    ){}

  ngOnInit(){
    //obtenemos el valor del id de la ruta 
    this.id = this.ruta.snapshot.params['id'];
    //podemos obtener dos cosas datos o errores //es un observable
    this.productoServicio.obtenerProductoPorId(this.id).subscribe(
      {
        next: (datos) => this.producto = datos,
        error: (errores: any) => console.log(errores)
      }
    );
  }

  onSubmit(){
    //editar el producto
    this.guardarProducto();
  }

  guardarProducto(){
    this.productoServicio.editarProducto(this.id, this.producto).subscribe(
      {
        next: (datos) => this.irProductoLista(),
        error: (errores) => console.log(errores)
      }
    );
  }

  irProductoLista(){
    this.enrutador.navigate(['/productos']);
  }

}
