import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { CategoryModel } from 'src/app/dashboard/Models/category.model';
import { ICommonAttribute } from 'src/app/dashboard/Models/ICommonAttribute';
import { ProductModel } from 'src/app/dashboard/Models/product.model';
import { CategoryService } from 'src/app/dashboard/services/category.service';
import { CommonAttributeService } from 'src/app/dashboard/services/common-attribute.service';
import { SubcategoryService } from 'src/app/dashboard/services/subcategory.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-products-details-form',
  templateUrl: './products-details-form.component.html',
  styleUrls: ['./products-details-form.component.scss']
})
export class ProductsDetailsFormComponent implements OnInit {
  @Input() productModelInput: ProductModel | undefined = undefined;
  @Input() selectedBusinessId: number;
  @Input() saveMethod: (productModel: ProductModel) => void;

  productForm: FormGroup;
  productModel: ProductModel;
  categoryList: Array<CategoryModel>;
  subcategoryList: Array<CategoryModel>;
  quantityAttributes: Array<ICommonAttribute>;
  brandAttributes: Array<ICommonAttribute>;

  constructor(
    private fb: FormBuilder,
    private toasterService: NbToastrService,
    private categoryService: CategoryService,
    private subCategoryService: SubcategoryService,
    private commonAttributeService: CommonAttributeService,
    private dialogRef: NbDialogRef<ProductsDetailsFormComponent>
  ) { }

  ngOnInit() {
    if (this.productModelInput != undefined) {
      this.subCategoryService.getSubcategoriesUnderCategoryId(this.productModelInput.categoryId)
        .subscribe((subcategories: Array<CategoryModel>) => {
            this.subcategoryList = subcategories;
          });
      this.productModel = this.productModelInput;
    } else {
      this.productModel = new ProductModel();
    }
    
    this.categoryService.getCategoriesUnderOrganization(this.selectedBusinessId)
      .subscribe((categories) => {
        this.categoryList = categories;
        
        this.commonAttributeService.getAttributes(environment.attributeTypes.quantity)
          .subscribe((attributes) => {
            this.quantityAttributes = attributes;
            
            this.commonAttributeService.getAttributes(environment.attributeTypes.brands)
              .subscribe((attributes) => {
                this.brandAttributes = attributes;
              });
          });
      });

    this.productForm = this.fb.group({
      productName: [this.productModel.productName, Validators.required],
      categoryId: [this.productModel.categoryId, [Validators.required, Validators.min(1)]],
      subcategoryId: [this.productModel.subcategoryId, [Validators.required, Validators.min(1)]],
      quantityTypeId: [this.productModel.quantityTypeId, [Validators.required, Validators.min(1)]],
      brandId: [this.productModel.brandId, [Validators.required, Validators.min(1)]],
    });

    this.productForm.valueChanges.subscribe((value) => {
      this.productModel.productName = value.productName;
      this.productModel.categoryId = value.categoryId;
      this.productModel.subcategoryId = value.subcategoryId;
      this.productModel.quantityTypeId = value.quantityTypeId;
      this.productModel.brandId = value.brandId;
    });
  }

  save() {
    if (this.productForm.valid) {
      let selectedBrand = this.brandAttributes.find(brand => brand.attributeId == this.productModel.brandId);
      this.productModel.brandName = selectedBrand? selectedBrand.attributeName: '';
      this.saveMethod(this.productModel);
      this.dialogRef.close();
    }
    else this.toasterService.danger('Please fill all required fields.', 'Error');
  }

  loadSubCategories(selectedCategoryId: number){
    if(selectedCategoryId <= 0) return;
    this.productModel.categoryId = selectedCategoryId;
    this.subCategoryService.getSubcategoriesUnderCategoryId(this.productModel.categoryId)
      .subscribe((categories) => {
        this.subcategoryList = categories;
      });
  }
}

