import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { icons } from './icons/icons';
import { CategoryTemplateInterface } from './models/category-template.interface';
import { CategoryTemplateOptionInterface } from './models/category-template-option.interface';
import { CategoriesApiService } from './categories-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from '../dashboard.service';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs/operators';
import { CategoryInterface } from './models/category.interface';
import { ChildCategoryInterface } from './models/child-category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesApiService]
})
export class CategoriesComponent implements OnInit {
  form: FormGroup
  icons = icons;
  templates: CategoryTemplateOptionInterface[];

  constructor(
    private fb: FormBuilder,
    private categoriesApiService: CategoriesApiService,
    private dashboardService: DashboardService,
    private transloco: TranslocoService
  ) { }

  ngOnInit(): void {
    this.initMainGroup();
    this.getTemplates();
  }

  initMainGroup(templateName?: string) {
    this.form = this.fb.group({
      templateName: this.fb.control('', [Validators.required]),
      incomes: this.fb.array([]),
      outcomes: this.fb.array([])
    })
  }

  getTemplates(): void {
    this.categoriesApiService.getTemplates().pipe(take(1)).subscribe(
      (res: string[]) => {
        this.templates = res.map(template => {
          return {
            name: template.replace(/-/g,' '),
            value: template
          }
        });

        this.templates.push({
          name: 'create new',
          value: null
        })

        this.dashboardService.handleRequestCallbackMessage(
          'success',
          this.transloco.translate('categories.templatesFetched.message'),
          this.transloco.translate('categories.templatesFetched.detail')
        );

        this.dashboardService.clearMessages(2000);

        this.getTemplateCategories(this.templates[0].value);
      }, (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
  }

  getTemplateCategories(templateName: string): void {
    if (templateName) {
      this.categoriesApiService.getTemplateCategories(templateName).pipe(take(1)).subscribe(
        (res: CategoryTemplateInterface) => {
          this.initMainGroup();
          this.renderFormTemplate(res);
        }, (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    } else {
      this.addNewTemplateCategory();
    }
  }

  addNewTemplateCategory(): void {
    // todo: message with template name field
    // todo: select with existing template fields to import

    // patch value with written name

    // init new empty form or extended from existing template form
  }

  renderFormTemplate(formData: CategoryTemplateInterface): void {
    const incomesFormArray = this.getFormArray('incomes');
    const outcomesFormArray = this.getFormArray('outcomes');

    this.form.get('templateName').patchValue(formData.templateName)
    this.form.addControl('templateId', this.fb.control(formData.templateId));

    /* Fill incomes category fields */
    formData.incomes.forEach((incomeCategory, i) => {
      this.addMainCategory(incomesFormArray, incomeCategory);
      const selectedIcon = this.icons.find(icon => icon.name === 'pi-' + incomeCategory.icon)
      if (selectedIcon) {
        incomesFormArray.controls[i].get('icon').patchValue(selectedIcon);
      }

      /* Fill child category fields */
      incomeCategory.childCategories.forEach((childCategory) => {
        this.addChildCategory(incomesFormArray.controls[i], childCategory)
      })
    })

    /* Fill outcomes category fields */
    formData.outcomes.forEach((outcomeCategory, i) => {
      this.addMainCategory(outcomesFormArray, outcomeCategory);
      const selectedIcon = this.icons.find(icon => icon.name === 'pi-' + outcomeCategory.icon)
      if (selectedIcon) {
        outcomesFormArray.controls[i].get('icon').patchValue(selectedIcon);
      }

      /* Fill child category fields */
      outcomeCategory.childCategories.forEach((childCategory) => {
        this.addChildCategory(outcomesFormArray.controls[i], childCategory)
      })
    })
  }

  addMainCategory(formArray: FormArray, data?: CategoryInterface): void {
    formArray.push(
      this.fb.group({
        icon: this.fb.control(data?.icon || ''),
        name: this.fb.control(data?.name || '', [Validators.required]),
        childCategories: this.fb.array([])
      })
    )
  }

  addChildCategory(control: AbstractControl, data?: ChildCategoryInterface): void {
    const formArray = control.get('childCategories') as FormArray;

    formArray.push(
      this.fb.group({
        name: this.fb.control(data?.name || '', [Validators.required])
      })
    )
  }

  removeCategory(from: FormArray, index: number) {
    from.removeAt(index);
  }

  getFormArray(formArrayName: string): FormArray {
    return this.form.get(formArrayName) as FormArray;
  }

  getChildCategories(formGroup: AbstractControl): FormArray {
    return formGroup.get('childCategories') as FormArray;
  }

  saveExistingCategory(): void {
    const payload: CategoryTemplateInterface = this.form.value;
    console.log(payload);
    // todo: implement request when backend ready
  }

  resetForm(): void {
    const { templateName } = this.form.value;
    const incomesArray = this.getFormArray('incomes');
    const outcomesArray = this.getFormArray('outcomes');

    incomesArray.value.forEach(() => {
      this.removeCategory(incomesArray, 0);
    })
    outcomesArray.value.forEach(() => {
      this.removeCategory(outcomesArray, 0);
    })

    if (templateName !== '') {
      this.getTemplateCategories(templateName);
    }
  }

  saveAs(): void {
    const payload: CategoryTemplateInterface = this.form.value;
    console.log(payload);
    // todo: implement save new categories when backend ready
  }

}
