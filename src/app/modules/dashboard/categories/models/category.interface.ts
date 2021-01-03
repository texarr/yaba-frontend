import { ChildCategoryInterface } from './child-category.interface';

export interface CategoryInterface {
  icon: string; // IconInterface;
  name: string;
  childCategories: ChildCategoryInterface[];
}
