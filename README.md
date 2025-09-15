## About

This template provides infrastructure to develop a website made with Angular 19 and Angular Material.

## How to Start
In the project, there are some required and customizable parts of the code. You can search for the keyword `NOTE:` in the entire project to find them.

After setting up everything, you can run the website locally by running the following command:

```
ng serve
```

The project also includes `i18n`. In this template, there are only English and German versions available. (The default language is English.) In order to run the website locally in German, you need to run the following command:

```
ng serve --configuration=de
```

Lastly, in order to run the tests, you need to set up the browser type in `karma.conf.js` depending on your need.

```
browsers: ['Firefox']
```

## Structure
The project uses the `app`, `features` and `shared` folder structure.
- The `app` folder is used to define the core elements of the project (e.g. singleton services).
- The `features` folder is used to store pages and apply business logic.
- The `shared` folder is used define reusable components and utilities.