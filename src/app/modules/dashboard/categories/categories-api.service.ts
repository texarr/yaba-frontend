import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryTemplateInterface } from './models/category-template.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  apiBase = environment.apiBase;

  constructor(private http: HttpClient) {}

  getTemplates(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiBase}/dashboard/templates`);
  }

  getTemplateCategories(
    templateName: string
  ): Observable<CategoryTemplateInterface> {
    return this.http.get<CategoryTemplateInterface>(
      `${this.apiBase}/dashboard/categories/${templateName}`
    );
  }

  async getTemplateCategoriesP(
    templateName: string
  ): Promise<CategoryTemplateInterface> {
    return this.http
      .get<CategoryTemplateInterface>(
        `${this.apiBase}/dashboard/categories/${templateName}`
      )
      .toPromise();
  }

  async saveCategoryTemplate(
    payload: CategoryTemplateInterface
  ): Promise<CategoryTemplateInterface> {
    return this.http
      .post<CategoryTemplateInterface>(
        `${this.apiBase}/dashboard/categoryTemplate`,
        payload
      )
      .toPromise();
  }

  async removeCategoryTemplate(id: string): Promise<void> {
    return this.http
      .delete<void>(`${this.apiBase}/dashboard/template/${id}`)
      .toPromise();
  }
}
