import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { CategoryModel } from 'src/app/dashboard/Models/category.model';
import { ICommonAttribute } from 'src/app/dashboard/Models/ICommonAttribute';
import { IProductModel } from 'src/app/dashboard/Models/IProductModel';
import { CategoryService } from 'src/app/dashboard/services/category.service';
import { CommonAttributeService } from 'src/app/dashboard/services/common-attribute.service';
import { SubcategoryService } from 'src/app/dashboard/services/subcategory.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-products-details-form',
  templateUrl: './products-details-form.component.html',
  styleUrls: ['./products-details-form.component.scss']
})
export class ProductsDetailsFormComponent {
  @Input() productModelInput: IProductModel | undefined = undefined;
  @Input() selectedBusinessId: number;
  @Input() saveMethod: (productModel: IProductModel) => void;

  productForm: FormGroup;
  productModel: IProductModel;
  categoryList: Array<CategoryModel>;
  subcategoryList: Array<CategoryModel>;
  quantityAttributes: Array<ICommonAttribute>;
  brandAttributes: Array<ICommonAttribute>;
  loaderContainer: HTMLElement| null;

  constructor(
    private fb: FormBuilder,
    private toasterService: NbToastrService,
    private categoryService: CategoryService,
    private subCategoryService: SubcategoryService,
    private commonAttributeService: CommonAttributeService,
    private dialogRef: NbDialogRef<ProductsDetailsFormComponent>
  ) {
    // On Init shall remove this loading screen forcing to update the DOM.
    // Thus, change detector will work properly on page load
    this.loaderContainer = document.getElementById('LoadingScreen');
    if(this.loaderContainer && this.loaderContainer.classList.contains('d-none')){
      this.loaderContainer.classList.remove('d-none');
      this.loaderContainer.classList.add('d-block');
    }
  }

  ngOnInit() {
    if (this.productModelInput != undefined) {
      this.subCategoryService.getSubcategoriesUnderCategoryId(this.productModelInput.categoryId)
        .subscribe((subcategories: Array<CategoryModel>) => {
            this.subcategoryList = subcategories;
          });
      this.productModel = this.productModelInput;
    } else {
      this.productModel = {
        productId: 0,
        productName: '',
        categoryId: 0,
        subcategoryId: 0,
        purchasePrice: 0,
        retailPrice: 0,
        categoryName: '',
        quantity: 0,
        subcategoryName: '',
        organizationId: 0,
        quantityTypeId: 0,
        brandAttributeId: 0
      };
    }

    this.loaderContainer = document.getElementById('LoadingScreen');

    setTimeout(() => {
      this.categoryService.getCategoriesUnderOrganization(this.selectedBusinessId)
        .subscribe((categories) => {
          this.categoryList = categories;
        });

      this.commonAttributeService.getAttributes(environment.attributeTypes.quantity)
        .subscribe((attributes) => {
          this.quantityAttributes = attributes;
        });

      this.commonAttributeService.getAttributes(environment.attributeTypes.brands)
        .subscribe((attributes) => {
          this.brandAttributes = attributes;
        });

      if(this.loaderContainer && this.loaderContainer.classList.contains('d-block')){
        this.loaderContainer.classList.remove('d-block');
        this.loaderContainer.classList.add('d-none');
      }
    }, 1.5 * 1000);

    this.productForm = this.fb.group({
      productName: [this.productModel.productName, Validators.required],
      categoryId: [this.productModel.categoryId, [Validators.required, Validators.min(1)]],
      subcategoryId: [this.productModel.subcategoryId, [Validators.required, Validators.min(1)]],
      quantityTypeId: [this.productModel.quantityTypeId, [Validators.required, Validators.min(1)]],
      brandAttributeId: [this.productModel.brandAttributeId, [Validators.required, Validators.min(1)]],
    });

    this.productForm.valueChanges.subscribe((value) => {
      this.productModel.productName = value.productName;
      this.productModel.categoryId = value.categoryId;
      this.productModel.subcategoryId = value.subcategoryId;
      this.productModel.quantityTypeId = value.quantityTypeId;
    });
  }

  save() {
    if (this.productForm.valid) {
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

