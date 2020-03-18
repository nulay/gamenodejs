class Util{
  static getRandom(min,max){
       return min + Math.floor((max - min) * Math.random());
  }
  static addUnicAll(mainArr, additArr){
       //Array.prototype.push.apply(mainArr, additArr);
       for(const ell of additArr){
          if(!this.isElementInArray(mainArr, ell)){
             mainArr[mainArr.length] = ell;
          }
       }
  }
  static isElementInArray( arr, element){
       for(const ell of arr){
         if(ell == element){
            return true;
         }
       }
       return false;
  }
  static clear(arr){
      arr.splice(0, arr.length);
  }
  static removeElementFromArray(arr,element){
     arr.splice(arr.indexOff(element), 1);
  }
}
module.exports = Util;
