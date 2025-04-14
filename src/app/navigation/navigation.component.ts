import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
//angular-material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
//models
import { PageUrlEnum, ParentUrlEnum } from '@models/page-url.model';
import { LocalStorageKeysEnum } from '@models/local-storage.model';
import { NavigationConfig, NavigationTitleEnum } from './navigation.model';
//services
import { LocalStorageService } from '@root/local-storage.service';
@Component({
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  imports: [MatToolbarModule, MatButtonModule, RouterOutlet, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  navigationConfig = signal<NavigationConfig[]>([
    {
      title: NavigationTitleEnum.Cars,
      selected: true,
      url: PageUrlEnum.Cars,
    },
    {
      title: NavigationTitleEnum.Favorite,
      selected: false,
      url: PageUrlEnum.FavoriteCars,
    },
  ]);

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    const savedNavigationValues = this.localStorageService.getLocalStorageKey(
      LocalStorageKeysEnum.Navigation
    );
    if (savedNavigationValues?.length > 0) {
      this.navigationConfig.set(savedNavigationValues);
      return;
    }
  }

  changeView(item: NavigationConfig) {
    this.navigationConfig.update((value) => {
      const updatedNavigationConfig = value.map((element) => {
        return {
          ...element,
          selected: element.title === item.title ? true : false,
        };
      });
      return updatedNavigationConfig;
    });

    this.router.navigate([`${ParentUrlEnum.Dashboard}/${item.url}`]);
    this.localStorageService.setLocalStorageKey(
      LocalStorageKeysEnum.Navigation,
      this.navigationConfig()
    );
  }

  logout() {
    this.localStorageService.removeAllLocalStorage();
    this.router.navigate(['/']);
  }
}
