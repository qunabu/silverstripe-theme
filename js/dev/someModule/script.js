"use strict";

import {someFunction} from './submodule/index';

function Foo() {
	let someVar = "Hello";

	console.log(someVar);

	someFunction();
}

module.exports = {Foo}