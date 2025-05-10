"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var args = process.argv.slice(2);
var name = args[0] || 'World';
console.log("Hello, ".concat(name, "!"));
