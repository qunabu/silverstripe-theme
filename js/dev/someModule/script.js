"use strict";

import {someFunction} from './submodule/index';

function Foo() {
	let someVar = "Hello";
	let someObj = {
		a: 1,
		b: 2,
		c: 3,
		d: 4
	};
	let someArr = [...someObj];

	console.log(someVar);

	someFunction();
}

module.exports = {Foo};