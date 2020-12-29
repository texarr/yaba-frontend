import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { icons } from './icons/icons';
import { CategoriesInterface } from './models/categories.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  form: FormGroup
  icons = icons;
  saveAsName: string;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initMainGroup();
  }

  initMainGroup() {
    this.form = this.fb.group({
      incomes: this.fb.array([]),
      outcomes: this.fb.array([])
    })
  }

  addMainCategory(formArray: FormArray): void {
    formArray.push(
      this.fb.group({
        icon: this.fb.control(''),
        name: this.fb.control('', [Validators.required]),
        childCategories: this.fb.array([])
      })
    )
  }

  addChildCategory(control: AbstractControl): void {
    const formArray = control.get('childCategories') as FormArray;

    formArray.push(
      this.fb.group({
        name: this.fb.control('', [Validators.required])
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
    const payload: CategoriesInterface = this.form.value;
    console.log(payload);
    // todo: implement request when backend ready
  }

  cancelChanges(): void {
    // todo: implement fetch request when backend ready
  }

  saveAs(): void {
    console.log(this.saveAsName);
    const payload: CategoriesInterface = this.form.value;
    console.log(payload);
    // todo: implement save new categories when backend ready
  }

}
