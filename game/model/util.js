class Util{
  static getRandom(min,max){
       return min + Math.floor((max - min) * Math.random());
  }
  static addUnicAll(mainArr, additArr){
       //Array.prototype.push.apply(mainArr, additArr);
       for(const ell : additArr){
          if(!isElementInArray(ell, mainArr){
             mainArr[mainArr.length] = ell;
          }
       }
  }
  static isElementInArray(element, arr){
       for(const ell : arr){
         if(ell == element){
            return true;
         }
       }
       return false;
  }
}
module.exports = Util;
