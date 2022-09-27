/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["redux"] = factory();
	else
		root["redux"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/applyMiddleware.js":
/*!********************************!*\
  !*** ./src/applyMiddleware.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ applyMiddleware)\n/* harmony export */ });\n/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compose */ \"./src/compose.js\");\n\nfunction applyMiddleware(...middlewares) {\n  return (createStore) => (...args) => {\n    const store = createStore(...args)\n    \n    const middlewareAPI = {\n      getState: store.getState,\n      dispatch: store.dispatch,\n    }\n\n    const chain = middlewares.map((middleware) => middleware(middlewareAPI))\n    const dispatch = (0,_compose__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(...chain)(store.dispatch)\n\n    return {\n      ...store,\n      dispatch,\n    }\n  }\n}\n\n//# sourceURL=webpack://redux/./src/applyMiddleware.js?");

/***/ }),

/***/ "./src/combineReducers.js":
/*!********************************!*\
  !*** ./src/combineReducers.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction combineReducers(reducers) {\n  return function combination(state = {}, action) {\n    const reducersKeys = Object.keys(reducers)\n    const nextState = {}\n    for(let i = 0; i < reducersKeys.length; i++) {\n      const key = reducersKeys[i]\n      const previousStateForKey = state[key]\n      const reducer = reducers[key]\n      const nextStateForKey = reducer(previousStateForKey, action)\n      nextState[key] = nextStateForKey\n    }\n    return nextState\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (combineReducers);\n\n//# sourceURL=webpack://redux/./src/combineReducers.js?");

/***/ }),

/***/ "./src/compose.js":
/*!************************!*\
  !*** ./src/compose.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ compose)\n/* harmony export */ });\nfunction compose(...funcs) {\n  if (funcs.length === 0) {\n    return (arg) => arg\n  }\n\n  if (funcs.length === 1) {\n    return funcs[0]\n  }\n\n  return funcs.reduce((pre, cur) => (...args) => pre(cur(...args)))\n}\n\n//# sourceURL=webpack://redux/./src/compose.js?");

/***/ }),

/***/ "./src/createStore.js":
/*!****************************!*\
  !*** ./src/createStore.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction createStore(reducer, preloadedState, enhancer) {\n  let state = preloadedState\n  const listeners = []\n\n  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {\n    enhancer = preloadedState\n    preloadedState = undefined\n  }\n\n  if (enhancer) {\n    return enhancer(createStore)(reducer, preloadedState)\n  }\n\n  function getState() {\n    return state\n  }\n\n  function subscribe(listener) {\n    listeners.push(listener)\n\n    return function unsubscribe() {\n      listeners.splice(listeners.indexOf(listener), 1)\n    }\n  }\n\n  function dispatch(action) {\n    state = reducer(state, action)\n    for(let i = 0; i < listeners.length; i++) {\n      listeners[i]()\n    }\n  }\n\n  dispatch({ type: `@redux/INIT${Math.random().toString(36)}`})\n\n  return {\n    getState,\n    dispatch,\n    subscribe,\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStore);\n\n//# sourceURL=webpack://redux/./src/createStore.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"applyMiddleware\": () => (/* reexport safe */ _applyMiddleware__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   \"combineReducers\": () => (/* reexport safe */ _combineReducers__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   \"createStore\": () => (/* reexport safe */ _createStore__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"reduxLogger\": () => (/* reexport safe */ _redux_logger__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   \"reduxThunk\": () => (/* reexport safe */ _redux_thunk__WEBPACK_IMPORTED_MODULE_3__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _createStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createStore */ \"./src/createStore.js\");\n/* harmony import */ var _combineReducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./combineReducers */ \"./src/combineReducers.js\");\n/* harmony import */ var _applyMiddleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./applyMiddleware */ \"./src/applyMiddleware.js\");\n/* harmony import */ var _redux_thunk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./redux-thunk */ \"./src/redux-thunk/index.js\");\n/* harmony import */ var _redux_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./redux-logger */ \"./src/redux-logger/index.js\");\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://redux/./src/index.js?");

/***/ }),

/***/ "./src/redux-logger/index.js":
/*!***********************************!*\
  !*** ./src/redux-logger/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ reduxLogger)\n/* harmony export */ });\nfunction reduxLogger(middlewareAPI) {\n  const { dispatch, getState } = middlewareAPI\n\n  return (nextDispatch) => {\n    return (action) => {\n      const preState = getState()\n      nextDispatch(action)\n      const curtate = getState()\n\n      console.log('pre state', preState)\n      console.log(action)\n      console.log('cur state', curtate)\n    }\n  }\n}\n\n//# sourceURL=webpack://redux/./src/redux-logger/index.js?");

/***/ }),

/***/ "./src/redux-thunk/index.js":
/*!**********************************!*\
  !*** ./src/redux-thunk/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ reduxThunk)\n/* harmony export */ });\nfunction reduxThunk(middlewareAPI) {\n  const { dispatch, getState } = middlewareAPI\n  return (nextDispatch) => {\n    return (action) => {\n      if (typeof action === 'function') {\n        action(nextDispatch, getState)\n      }\n\n      nextDispatch(action)\n    }\n  }\n}\n\n//# sourceURL=webpack://redux/./src/redux-thunk/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});