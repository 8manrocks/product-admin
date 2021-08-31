import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Product } from 'src/models/product';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @Input() selectedProduct!: Product
  show = false;
  imgChangeEvt: any = '';
  cropImgPreview: any = '';
  savedImg: any;
  productForm!: FormGroup;
  constructor(private fb: FormBuilder, private service: InteractionService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: [null, Validators.required],
      productId: [null, Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
      category: [null, Validators.required],
      subCategory:  [null, Validators.required],
      brand:  [null, Validators.required],
      description:  [null, Validators.required],
      imageUrl:  [null, Validators.required]  
    })
    if (this.selectedProduct) {
      this.productForm.patchValue(this.selectedProduct)
      this.savedImg = this.selectedProduct.imageUrl;
    }
  }
  upload(e: any) {
    const files = e.target.files;
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert("Only images are supported.");
      return;
    }
    this.imgChangeEvt = e;
  }
  setImg() {
    this.imgChangeEvt = '';
    this.savedImg = this.cropImgPreview;
    this.productForm.controls.imageUrl.setValue(this.savedImg);

  }
  cropImg(e: ImageCroppedEvent) {
      this.cropImgPreview = e.base64;
  }
  setDesc(e: any) {
    this.productForm.controls.description.setValue(e.target.value);
  }

  get description():string {
    return this.productForm.controls.description.value;
  }
  submit() {
    const res = [];
    res.push(this.productForm.value)
    console.log(res, 'ress')
    this.service.setProducts(res);
    this.show = true;
    setTimeout(()=> {
      this.show = false;
    }, 3000)
  }
}
