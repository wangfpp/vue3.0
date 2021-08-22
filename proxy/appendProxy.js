/**
 * @description 把对象转化为字符串 针对Style对象
 * @param { Object } obj style样式对象
 */ 
function mapObjectString(obj) {
  if(Reflect.toString.call(obj) !== "[object Object]"){
    return obj;
  }
  let objStr = "";
  for (const key in obj) {
    objStr += `${key}: ${obj[key]};`
  }
  return objStr;
}

/**
 * @description 判读对象是否是HTML元素
 * @param { Any } obj 传入的对象
 */ 
function isHTMLElement(obj){
  var d = document.createElement("div");
  try{
    d.appendChild(obj.cloneNode(true));
    d = null;
    return obj.nodeType==1?true:false;
  }catch(e){
    return false;
  }
}

const handler = {
  get: function(target, prop) {
    return function(attrs, ...childrens) {
      let allAttrs = Reflect.ownKeys(attrs);
      let element = document.createElement(prop);
      // 赋值所有的属性
      for (const key of allAttrs) {
        let attrValues = attrs[key];
        let attrValueType = Reflect.toString.call(attrValues); 
        if (attrValueType === "[object Array]") {
          element.setAttribute(key, attrValues.join(" "));
        } else if(attrValueType === "[object Object]"){
          element.setAttribute(key, mapObjectString(attrs[key]));
        } else {
          element.setAttribute(key, attrs[key]);
        }
      }
      // 创建文本节点
      for(let text of childrens) {
        let nodeType = Reflect.toString.call(text);
        if(nodeType === "[object String]" || nodeType === "[object Number]") {
          let textTag = document.createTextNode(text);
          element.appendChild(textTag);
        } else if(isHTMLElement(text)) {
          element.appendChild(text);
        }
      }
      return element;
    }
  }
};
let domProxy = new Proxy({}, handler);
let divTag = domProxy.div(
  {id: "box", class: ["green", "textRed"], style: {border: "2px solid #f00", margin: "0 auto", "border-top": "none"}}, "Something show", "出现了啊",
  domProxy.ul({class: "ul_container"},
  domProxy.li(
    {class: ["li", "li_item"]},
    domProxy.input({class: "input", disabled: true, placeholder: "被禁用的input"})
  ),
  domProxy.li({class: ["li", "li_item"]}, 1111111111),
  domProxy.li({class: ["li", "li_item"]}, 222222222222))
);
document.body.appendChild(divTag)