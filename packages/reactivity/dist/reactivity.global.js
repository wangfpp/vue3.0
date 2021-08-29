var VueReactivity = (function (exports) {
  'use strict';

  const shared = {};

  console.log(111, shared);
  const Reactivity = {
      shared: shared
  };

  exports.Reactivity = Reactivity;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=reactivity.global.js.map
