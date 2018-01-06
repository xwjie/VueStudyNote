console.log("start----");

var snabbdom = require('snabbdom');
var patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);

var h = require('snabbdom/h').default; // helper function for creating vnodes


var someFn= function(){
	console.log('someFn', arguments);
}

var anotherEventHandler = function(){
	console.log('anotherEventHandler', arguments);
}


var vnode = h('div#container.two.classes', {on: {click: someFn}}, [
  h('span', {style: {fontWeight: 'bold'}}, 'This is bold'),
  ' and this is just normal text',
  h('a', {props: {href: '/foo'}}, 'I\'ll take you places!')
]);

console.log('vnode', vnode);

var newVnode = h('div#container.two.classes', {on: {click: anotherEventHandler}}, [
  h('span', {style: {fontWeight: 'normal', fontStyle: 'italic'}}, 'This is now italic type'),
  ' and this is still just normal text',
  h('a', {props: {href: '/bar'}}, 'I\'ll take you places!')
]);

console.log('newVnode', newVnode);

// Patch into empty DOM element ¨C this modifies the DOM as a side effect

function patchNew(vnode, newVnode)
{
	// Second `patch` invocation
	patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
}

window.addEventListener('DOMContentLoaded', () => {
  var container = document.getElementById('container');
  
  vnode = patch(container, vnode);
  
  // cannot setTimeout( 'patchNew(vnode)', 2000);
  setTimeout( function(){patchNew(vnode, newVnode)}, 2000);
});