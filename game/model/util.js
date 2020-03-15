class Util{
  static getRandom(min,max){
       return min + Math.floor((max - min) * Math.random());
  }
}
module.exports = Util;
