module.exports = {

  getTemplateArray: function getTemplateArray(length, value) {
    value = value || 0;
    var retVal = [];
    for(var i = 0; i< length; i++) {
      retVal.push(value);
    }
    return retVal;
  },

  compareItemsRatiosDesc: function compareItemsRatiosDesc(a, b) {
    return b.ratio - a.ratio;
  }

};
