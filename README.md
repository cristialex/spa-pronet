# SpaPronet

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Additional used technologies
Angular Material for design
Ngrx for state management
crypto-js for local storage encryption

## Start App
Run npm i
Run npm run start or ng serve
Run npx json-server db.json 

## Details
The application features a homepage with a basic login system.
To log in, please use the following credentials:
Email: test@user.com
Password: Must be 6–30 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., TestTest123!).
Upon successful login, users are redirected to the Cars page. This page displays a list of cars, including both favorite and non-favorite entries. Users can mark or unmark cars as favorites.
Each car listing includes a "See More" icon, which navigates to a detailed view of the selected car.
Clicking the Favorites button will navigate to the Favorites page, where only favorite cars are displayed. From here, users can also unmark cars as favorites.
Additionally, users can search for cars by model using the search functionality.
A Logout icon is available, which clears local storage and redirects users back to the homepage.