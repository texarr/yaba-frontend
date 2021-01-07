import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { icons } from './icons/icons';
import { CategoryTemplateInterface } from './models/category-template.interface';
import { CategoryTemplateOptionInterface } from './models/category-template-option.interface';
import { CategoriesApiService } from './categories-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from '../dashboard.service';
import { TranslocoService } from '@ngneat/transloco';
import { take, takeUntil } from 'rxjs/operators';
import { CategoryInterface } from './models/category.interface';
import { ChildCategoryInterface } from './models/child-category.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { NewCategoryDialogComponent } from './new-category-dialog/new-category-dialog.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesApiService, DialogService]
})
export class CategoriesComponent implements OnInit, OnDestroy {
  form: FormGroup
  icons = icons;
  templates: CategoryTemplateOptionInterface[];
  destroyed$: Subject<void>;

  constructor(
    private fb: FormBuilder,
    private categoriesApiService: CategoriesApiService,
    private dashboardService: DashboardService,
    private transloco: TranslocoService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.initMainGroup();
    this.getTemplates();
    this.destroyed$ = new Subject();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.next();
  }

  initMainGroup(templateName?: string) {
    if (this.form) {
      this.resetForm();
    }

    this.form = this.fb.group({
      templateName: this.fb.control(templateName || '', [Validators.required]),
      incomes: this.fb.array([]),
      outcomes: this.fb.array([])
    })
  }

  async getTemplates(): Promise<void> {
    this.categoriesApiService.getTemplates().pipe(take(1)).subscribe(
      (res: string[]) => {
        this.templates = res.map(template => {
          return {
            name: template.replace(/-/g,' '),
            value: template
          }
        });

        this.dashboardService.handleRequestCallbackMessage(
          'success',
          this.transloco.translate('categories.templatesFetched.message'),
          this.transloco.translate('categories.templatesFetched.detail')
        );

        this.dashboardService.clearMessages(2000);

        const templates = this.templates.filter(template => template.name !== 'newTemplate');
        if (templates.length) {
          this.getTemplateCategories(templates[0].value);
        }

        if (!templates.find(template => template.name === 'newTemplate')) {
          this.templates.push({
            name: 'create new',
            value: 'newTemplate'
          })
        }
      }, (err: HttpErrorResponse) => {
        this.templates = [];
        console.group('no templates');
        console.table(err.error);
        console.groupEnd();
        this.addNewTemplateOption();
      }
    )

    return
  }

  addNewTemplateOption(): void {
    if ((!this.templates || this.templates.length === 0)) {
      this.templates = [
        {
          name: 'create new',
          value: 'newTemplate'
        }
      ];
      if (this.templates.length === 1) {
        this.addNewTemplateCategory();
      }
    }
  }

  getTemplateCategories(templateName: string): void {
    if (templateName !== 'newTemplate') {
      this.categoriesApiService.getTemplateCategories(templateName).pipe(take(1)).subscribe(
        (res: CategoryTemplateInterface) => {
          this.initMainGroup(templateName);
          this.renderFormTemplate(res);
        }, (err: HttpErrorResponse) => {
          this.dashboardService.handleCallbackErrorMessage(err);
        }
      )
    } else {
      this.addNewTemplateCategory();
    }
  }

  addNewTemplateCategory(): void {
    const ref = this.dialogService.open(NewCategoryDialogComponent, {
      data: {
        templates: this.templates
      }
    })

    ref.onClose.pipe(take(1)).subscribe(async (data) => {
      if (data) {
        this.templates[this.templates.length - 1].value = data.newTemplateName.replace(/\s/g, '-');
        this.templates[this.templates.length - 1].name = data.newTemplateName;
        this.templates[this.templates.length - 1].isNew = data.isNew;

        if (data.templateToExtend) {
          if (data.templateToExtend !== 'newTemplate') {
            await this.categoriesApiService.getTemplateCategoriesP(data.templateToExtend).then(
              (res: CategoryTemplateInterface) => {
                this.renderFormTemplate(res);
              }
            )
          } else {
            this.resetForm();
          }
        }

        this.form.removeControl('templateId');
        this.form.get('templateName').patchValue(data.newTemplateName.replace(/\s/g, '-'));
      }
    })
  }

  renderFormTemplate(formData: CategoryTemplateInterface, templateName?: string): void {
    const incomesFormArray = this.getFormArray('incomes');
    const outcomesFormArray = this.getFormArray('outcomes');

    this.form.get('templateName').patchValue(templateName || formData.templateName)
    if (!templateName) {
      this.form.addControl('templateId', this.fb.control(formData.templateId));
    }

    /* Fill incomes category fields */
    formData.incomes.forEach((incomeCategory, i) => {
      this.addMainCategory(incomesFormArray, incomeCategory);
      const selectedIcon = this.icons.find(icon => icon.name === incomeCategory.icon)
      if (selectedIcon) {
        incomesFormArray.controls[i].get('icon').patchValue(selectedIcon.name);
      }

      /* Fill child category fields */
      incomeCategory.childCategories.forEach((childCategory) => {
        this.addChildCategory(incomesFormArray.controls[i], childCategory)
      })
    })

    /* Fill outcomes category fields */
    formData.outcomes.forEach((outcomeCategory, i) => {
      this.addMainCategory(outcomesFormArray, outcomeCategory);
      const selectedIcon = this.icons.find(icon => icon.name === outcomeCategory.icon)
      if (selectedIcon) {
        outcomesFormArray.controls[i].get('icon').patchValue(selectedIcon.name);
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

  async saveCategory(): Promise<void> {
    const payload: CategoryTemplateInterface = this.form.value;

    await this.categoriesApiService.saveCategoryTemplate(payload).then(
      (res) => {
        this.dashboardService.handleRequestCallbackMessage(
          'success',
          this.transloco.translate('messages.message.categoryTemplateSaved.title'),
          this.transloco.translate('messages.message.categoryTemplateSaved.message')
        )
        this.dashboardService.clearMessages(2000);
      }, (err: HttpErrorResponse) => {
        this.dashboardService.handleCallbackErrorMessage(err);
      }
    )

    this.resetForm();
    await this.getTemplates();
  }

  resetForm(): void {
    const incomesArray = this.getFormArray('incomes');
    const outcomesArray = this.getFormArray('outcomes');

    incomesArray.value.forEach(() => {
      this.removeCategory(incomesArray, 0);
    })
    outcomesArray.value.forEach(() => {
      this.removeCategory(outcomesArray, 0);
    })
  }

  async deleteTemplate(): Promise<void> {
    const templateId = this.form.value.templateId;

    await this.categoriesApiService.removeCategoryTemplate(templateId).then(
      () => {
        this.dashboardService.handleRequestCallbackMessage(
          'success',
          this.transloco.translate('messages.message.categoryTemplateRemoved.title'),
          this.transloco.translate('messages.message.categoryTemplateRemoved.message')
        )
        this.resetForm();
        this.getTemplates();
        this.dashboardService.clearMessages(2000);
      }, (err: HttpErrorResponse) => {
        this.dashboardService.handleCallbackErrorMessage(err);
      }
    )

    await this.getTemplates();
  }
}
