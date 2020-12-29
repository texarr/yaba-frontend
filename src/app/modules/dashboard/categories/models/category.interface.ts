import { IconInterface } from './icon.interface';
import { ChildCategoryInterface } from './child-category.interface';

export interface CategoryInterface {
  icon: IconInterface;
  name: string;
  childCategories: ChildCategoryInterface[];
}
