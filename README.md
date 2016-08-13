# LuxJS
LuxJS is a JavaScript library that makes it easy to create modern and powerful user web-interfaces. It's built on top of [Bulma](https://github.com/jgthms/bulma). Written in three different versions: jQuery, AngularJS and VueJS. Crafted with love.

## Table of Contents
* [Installation](#installation)
* [Documentation](#documentation)

## Installation
Clone or download the project and include files of **dist** folder into your project. Then import the files into your HTML code.

### CSS
You can import Bulma and Lux CSS files separately or just use the combined version.
````html
<link rel="stylesheet" href="bulma.css">
<link rel="stylesheet" href="lux.css">
````
**or** just use the combined version which contains both -->
````html
<link rel="stylesheet" href="lux.combined.css">
````

### JavaScript
#### jQuery Version
````html
<script src="jquery.lux.js"></script>
````
#### AngularJS Version
````html
<script src="angular.lux.js"></script>
````
Inject Lux to your app
````javascript
angular.module('yourApp', ['Lux']);
````
#### VueJS Version
````html
<script src="vue.lux.js"></script>
````
Don't forget to install Lux before using it
````javascript
Vue.use(Lux);
````

## Documentation

### Buttons
#### jQuery Version
````html
<button id="some-button"></button>
````
````javascript
$('#some-button').button();
````
The example above will creates a really simple button
You can pass options like this:
````javascript
$('#some-button').button({
  type: 'primary',
  size: 'large',
  style: 'outlined'
});
````
Change the state of the button:
````javascript
$('#some-button').button().loading();
// or
$('#some-button').button('loading');
// and
$('#some-button').button('reset'); // after

var btn = $('#some-button').button();
btn.loading();
btn.disable();
// chaining with jQuery methods
btn.addClass('someClass').html('Awesome Button').enable();
````
Another handy feature is using a promise to change the state of the button
````javascript
var httpRequest = $.get('http://jsonplaceholder.typicode.com/posts/1');

$('#some-button').button('loading', httpRequest);
// or
$('#some-button').button().loading(httpRequest);
// or disable it
$('#some-button').button('disable', httpRequest);
````
Button will be at normal state after the request is complete