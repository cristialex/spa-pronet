import { PageUrlEnum } from '../models/page-url.model';

export interface NavigationConfig {
  title: NavigationTitleEnum;
  selected: boolean;
  url: PageUrlEnum;
}

export enum NavigationTitleEnum {
  Cars = 'Cars',
  Favorite = 'Favorite',
}
