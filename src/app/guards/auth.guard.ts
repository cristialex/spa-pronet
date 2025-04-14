import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
//models
import { LocalStorageKeysEnum } from '@models/local-storage.model';
import { ParentUrlEnum } from '@models/page-url.model';
//services
import { LocalStorageService } from '@root/local-storage.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router: Router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  const user = localStorageService.getLocalStorageKey(
    LocalStorageKeysEnum.User
  );

  if (user?.length > 0 && user[0]?.id) {
    return true;
  }
  router.navigate([ParentUrlEnum.Home]);
  return false;
};
