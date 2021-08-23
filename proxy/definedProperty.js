let myInfo = {
  name: "wangfpp",
  age: 18,
  hobbys: ["gril", "study", "game"]
};

let proxy = Object.defineProperty(myInfo, "name", {
  configurable: true,
  enumerable: true,
  get: function() {
    console.log(111111111)
    return "1111111";
  },
  set: function(value) {
    this.name = value;
  }
});
proxy.name;
proxy.name = 20;
proxy.weight = 70;
console.log(proxy, myInfo);