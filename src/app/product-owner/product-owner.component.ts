import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/models/product';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-product-owner',
  templateUrl: './product-owner.component.html',
  styleUrls: ['./product-owner.component.scss']
})
export class ProductOwnerComponent implements OnInit {
  displayedColumns = ['id', 'ProductName', 'Category', 'Price', 'Stock', 'edit', 'delete']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Product>();
  product!: Product;
  constructor(private service: InteractionService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator

    })
  }
  showDetails(e: Product) {
    this.product = e;
  }
  remove(id:number) {
    this.service.removeProduct(id);
  }
  openMod(product?: Product) {
    const modalRef = this.modalService.open(EditProductComponent, {size:'xl'});
    if (product) {
      modalRef.componentInstance.selectedProduct = product;
    }
  }
}
