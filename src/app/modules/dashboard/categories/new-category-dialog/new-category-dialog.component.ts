import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-new-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.scss']
})
export class NewCategoryDialogComponent implements OnInit {
  newTemplateName: string;
  templateToExtend: string;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
  }

  createNewCategory(): void {
    this.ref.close({
      newTemplateName: this.newTemplateName,
      templateToExtend: this.templateToExtend,
      isNew: true
    })
  }

  resetForm(): void {
  }
}
