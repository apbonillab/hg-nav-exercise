(function() {
  this.HugeNav = function() {

    this.overlay = null;

    var defaults = {
      openedMenuClass: 'opened',
      jsonDataUrl: '/api/nav.json'
    };

    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }else{
      this.options = defaults;
    }

    loadMenuFromJson(this.options.jsonDataUrl);
  };

  function loadMenuFromJson(jsonUrl){
    var req = new XMLHttpRequest();
    req.onload = function (e) {
      buildMenu(e.target.response);
    };
    req.open('GET', jsonUrl, true);
    req.responseType = 'json';
    req.send();
  }

  function buildMenu(menuObj){
    console.log(menuObj);
  }

  function initializeMenuEvent(){

  }

  function extendDefaults(source, properties) {
    var property;
    for (property in poperties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }
}());