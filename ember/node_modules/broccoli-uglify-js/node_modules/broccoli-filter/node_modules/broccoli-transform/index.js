var quickTemp = require('quick-temp')

module.exports = Transform
function Transform (inputTree) {
  this.inputTree = inputTree
}

Transform.prototype.read = function (readTree) {
  var self = this

  quickTemp.makeOrRemake(this, '_tmpDestDir')

  return readTree(this.inputTree)
    .then(function (dir) {
      return self.transform(dir, self._tmpDestDir)
    })
    .then(function () {
      return self._tmpDestDir
    })
}

Transform.prototype.cleanup = function () {
  quickTemp.remove(this, '_tmpDestDir')
}
