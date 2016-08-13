# LuxJS
LuxJS is a JavaScript library that makes it easy to create modern and powerful user web-interfaces. It's built on top of [Bulma](https://github.com/jgthms/bulma). Written in three different versions: jQuery, AngularJS and VueJS. Crafted with love.

## Installation
Clone or download the project and include files of **dist** folder into your project. Then import the files into your HTML code.

#### CSS
You can import Bulma and Lux CSS files separately or just use the combined version.
````html
<link rel="stylesheet" href="bulma.css">
<link rel="stylesheet" href="lux.css">
````
**or** just use the combined version which contains both -->
````html
<link rel="stylesheet" href="lux.combined.css">
````

#### JavaScript
##### jQuery Version
````html
<script src="jquery.lux.js"></script>
````
 
##### AngularJS Version
````html
<script src="angular.lux.js"></script>
````

##### VueJS Version
````html
<script src="vue.lux.js"></script>
````
Don't forget to install Lux before using it
````javascript
Vue.use(Lux);
````