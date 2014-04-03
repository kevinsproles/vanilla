'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: HomeCtrl', function() {

  beforeEach(module('volusionApp'));

  var controller;
  var scope;
  var api;
  var mockData = {
    data: [
      { foo: 'foo' },
      { bar: 'bar' },
      { baz: 'baz' }
    ]
  };

  beforeEach(inject(function($controller, $rootScope, _api_) {
    api = _api_;
    sinon.stub(api.slider, 'get', function() {
      return {
        then : function(cb) {
          cb(mockData);
        }
      };
    });

    scope = $rootScope.$new();
    controller = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  afterEach(function(){
    api.slider.get.restore();
  });

  it('calls slider API and populates slides', function(){
    expect(scope.slider).to.deep.equal(mockData.data);
  });

});
