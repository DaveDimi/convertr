# Dimitar Intro

In this project, I have implemented some best practices including Angular's latest features such as Signals. The application is tested using advanced tools such as Jest, Jasmine-Marbles, and Spectator. Additionally, Prettier is configured to enforce consistent code formatting automatically.

I chose NgRx for state management due to its robustness and scalability. Within the advertisers module, I managed local state to handle operations such as fetching and mapping advertisers and addresses, as well as creating new entries for both entities. 
What I'd change for large project is to design the architecture to facilitate the easy separation of the address store into its own module, enhancing reusability and maintainability.

The form for adding new advertisers is abstracted into a separate file. This decision was made to maintain clarity and cleanliness in the dialog component's code. Furthermore, I've introduced a form-utils file, which consolidates all form validation patterns, laying a foundation for future enhancements and ensuring easy maintainability.

For future expansions, I'd consider implementing a dynamic form builder that could further streamline the development of new forms and reduce redundancy across the project.


# Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via Jest

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
