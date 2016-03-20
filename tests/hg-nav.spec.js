var assert = chai.assert,
    nav = null,
    server = null;

    menuMock = {
      items: [{
        label: "Work",
        url: "#/work",
        items: [ ]
        },
        {
          label: "About",
          url: "#/about",
          items: [
            {
              label: "What we do",
              url: "#/about/what-we-do"
            },
            {
              label: "How we work",
              url: "#/about/how-we-work"
            },
            {
              label: "Leadership",
              url: "#/about/leadership"
            }
          ]
        }
      ]
    };

describe('hg-nav tests...', function() {

  beforeEach(function() {
    var hgNav = document.createElement('nav');
    hgNav.setAttribute('id', 'hg-nav');
    document.body.appendChild(hgNav);

    server = sinon.fakeServer.create();
    server.autoRespond = true;
    server.respondWith("GET", "/api/nav.json",
      [200, { "Content-Type": "application/json" }, JSON.stringify(menuMock)]);
  });

  afterEach(function () {
    var hgNav = document.getElementById('hg-nav');
    while(hgNav.firstChild) hgNav.removeChild(hgNav.firstChild);
    server.restore();
  });

  describe('Testing if is creating DOM elements by Json properly', function () {
    it('should DOM has been processed inside afterRender function', function (done) {
      nav = new HugeNav({ navElement: 'hg-nav', afterRender: function(){
        console.log(document.getElementById('hg-nav').innerHTML);
        done();
      } });
    });
  });
});