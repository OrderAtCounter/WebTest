var page = require('webpage').create();

page.viewportSize = {width: 1024, height: 768};

var pages = {};
var routes = ['', 'createAccount', 'login'];

routes.forEach(function(route) {
  pages[route] = {};
  pages[route].beenVisited = false;
  if(route === '') {
    pages[route].imageName = 'landing.png';
  }
  else {
    pages[route].imageName = route + '.png';
  }
});

var renderScreen = function(imageName) {
  page.render('./images/' + imageName);
  console.log('Rendered ' + imageName);
}

pages[''].onLoadFinished = function() {
  if(!(pages[''].beenVisited)) {
    pages[''].imageName = 'orderDashboard.png';
    pages[''].beenVisited = true;
    page.evaluate(function() {
      $('#loginButton').click();
    });
  }
  else {
    page.evaluate(function() {
      $('#inputOrderNumber').val('123');
      $('#inputPhoneNumber').val('404-123-4567');
    });
    renderScreen('inputOrder.png');
    page.evaluate(function() {
      $('#createOrderButton').click();
    });
    setTimeout(function() {
      renderScreen('newOrder.png');
      phantom.exit();
    }, 3000);
  }
}

pages['login'].onLoadFinished = function() {
  page.evaluate(function() {
    $('#inputEmail').val('phantom@gmail.com');
    $('#inputPassword').val('phantom');
  });
  renderScreen('loginInputs.png');
  page.evaluate(function() {
    $('#loginButton').click();
  });
}

pages['createAccount'].onLoadFinished = function() {
}

page.onLoadFinished = function(status) {
  var url = page.evaluate(function() {
    return window.location.href;
  });
  var splitUrl = url.split('/');
  var route = splitUrl[splitUrl.length - 1];

  renderScreen(pages[route].imageName);
  pages[route].onLoadFinished();
}


page.open('http://orderatcounter.herokuapp.com', function() {});