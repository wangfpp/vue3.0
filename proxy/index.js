let myInfo = {
  name: "wangfpp",
  age: 18,
  hobbys: ["gril", "study", "game"]
};

let handler = {
  get: function(target, property, receiver) {
    if(Reflect.has(target, property)) {
      return target[property];
    }
    return undefined;
  },
  set: function(target, property, value) {
    if (Reflect.get(target, property) !== value) {
      Reflect.set(target, property, value);
    }
  }
};
let proxyObj = new Proxy(myInfo, handler);