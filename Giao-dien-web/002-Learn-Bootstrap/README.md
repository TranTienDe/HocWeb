1. Link guide install bootstrap into angular:
https://medium.com/codingthesmartway-com-blog/using-bootstrap-with-angular-c83c3cee3f4a

2. Link bootstrap docs:
https://getbootstrap.com/docs/5.1/getting-started/contents/

3. Link ng-bootstrap docs:
https://ng-bootstrap.github.io/#/home

4. Add bootstrap and Jquery
1. npm install bootstrap jquery --save
2. add within file angular.json
"styles": [
    "styles.css",
    "./node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  "scripts": [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js"
  ],


