# Simple To-Do list on Vue3 with Vuex(styling by Bootstrap)

Simple Vue3 +Vuex + Bootstrap project deployed on GitHub Pages
You shoud have Vue CLI installed to use all npm scripts.

link:
http://visitorregistrationserver.s3-website.us-east-1.amazonaws.com/

## Description 

This is SPA in which you may add,remove edit task.
Task have on of state("New","In progress","Done","Paused","Canceled").
In Addition you may sort task list by status, date and task.

### Add new todo task
To add new task click on "Add todo" then fill todo and state fields and click confirm.
To confirm both fields must be filled.

### Remove todo task
To remove task select task from list by click on it and click "Remove todo" button.
Then confirm deleting in dialog.

### edit todo task
To edit task click on "edit todo" then change fields data as you need and click confirm.
To confirm both fields must be filled.


## Project setup

```
npm install

```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Deploy in production

```
--create AWS bucket:
npm run creates3
--make website from bucket
npm run makes3asweb
--grant access to policy change
npm run s3access
--change policy
npm run s3policy

--deploy from ./dist to s3 bucket
npm run deploy

```

### Lints and fixes files

```
npm run lint
```

### Customize configuration
