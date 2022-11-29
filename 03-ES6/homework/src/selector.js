const { arrayReplaceAt } = require("markdown-it/lib/common/utils");

var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)) resultSet.push(startEl)

  for(let i =0; i<arrayReplaceAt.length;i++){
    let res = traverseDomAndCollectElements(matchFunc, startEl.children[i])
  //                  true o false 
  resultSet =[...resultSet, ...res] // genero una copia de result y una copia de res
  }
  return resultSet
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if(selector[0] === "#") return "id"
  if(selector [0 === "."]) return "class" 
  if(selector.split(".").length === 2) return "tag.clase"// cuando haya split lo parta en 2
return "tag"
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  const selectorType = selectorTypeMatcher(selector);
  let matchFunction;
  if (selectorType === "id") { 
    matchFunctionMaker=function(elem){
      return "#"+elem.id ===selector
      // id two            #idTwo
    }
  } else if (selectorType === "class") {// <div className "classOne classRandom"
    matchFunctionMaker=function(elem){
      for(const clase of elem.classList) {
        if("." + clase === selector) return true;
        
      } 
      return false 
      }
  } else if (selectorType === "tag.class") {
    matchFunctionMaker=function(elem){
      return elem.tagName === selector.toUpperCase()// si tu DIV es igual a mi DIV haceme tal cosa
      }
  } else if (selectorType === "tag") {// div.classOne o h1.classRanadome, agarrame un arreglo y dividime en dos primera parte A y segunda B 
    matchFunctionMaker=function(elem){
      let [tag,clase] = selector.split(".")
      return matchFunctionMaker(tag)(elem) &&matchFunctionMaker(clase)(elem)
      //ejecutame matchfunctionmaker que sea con h1 o div
      }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
