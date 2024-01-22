import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryModel } from 'src/app/dashboard/Models/ICategoryModel';
import { IProductModel } from 'src/app/dashboard/Models/IProductModel';
import { CategoryService } from 'src/app/dashboard/services/category.service';
import { SubcategoryService } from 'src/app/dashboard/services/subcategory.service';

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
  categoryList: ICategoryModel[];
  subcategoryList: ICategoryModel[];


  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private subCategoryService: SubcategoryService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.productModelInput != undefined) {
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
        organizationId: 0
      };
    }

    this.productForm = this.fb.group({
      productName: [this.productModel.productName, Validators.required],
      categoryId: [this.productModel.categoryId, Validators.required],
      categoryName: [this.productModel.categoryName, Validators.required],
      subcategoryId: [this.productModel.subcategoryId, Validators.required],
      purchasePrice: [this.productModel.purchasePrice, Validators.required],
      retailPrice: [this.productModel.retailPrice],
    });

    this.productForm.valueChanges.subscribe((value) => {
      this.productModel.productName = value.productName;
      this.productModel.categoryId = value.categoryId;
      this.productModel.subcategoryId = value.subcategoryId;
      this.productModel.purchasePrice = value.purchasePrice;
      this.productModel.retailPrice = value.retailPrice;
    });

    this.categoryService.getCategoriesUnderOrganization(this.selectedBusinessId)
      .subscribe((categories) => {
        this.categoryList = categories;
      });

    this.subCategoryService.getSubcategoriesUnderCategoryId(this.productModel.categoryId)
      .subscribe((categories) => {
        this.subcategoryList = categories;
      });

    this.changeDetectorRef.detectChanges();
  }

  save() {
    this.saveMethod(this.productModel);
  }

  loadSubCategories(event: any){
    console.log('event', event);
    this.subCategoryService.getSubcategoriesUnderCategoryId(this.productModel.categoryId)
      .subscribe((categories) => {
        this.subcategoryList = categories;
      });
  }
}

