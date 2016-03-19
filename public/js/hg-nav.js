(function() {
  this.HugeNav = function() {

    this.overlay = null;

    var defaults = {
      openedMenuClass: 'opened',
      jsonDataUrl: '/api/nav.json'
    };

    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }
  };

  function initializeMenuEvent(){
    
  }

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }
}());