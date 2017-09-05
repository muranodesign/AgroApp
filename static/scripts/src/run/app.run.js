(function () {
  angular
    .module('app')
    .run(appRun);

  appRun.$inject = [
    '$rootScope',
    '$location',
    '$http',
    '$cookies',
    '$mdSidenav',
    '$mdToast',
    'DateHelper',
    'PessoaHelper'
  ];

  function appRun(
    $rootScope, 
    $location,
    $http,
    $cookies, 
    $mdSidenav, 
    $mdToast,
    DateHelper,
    PessoaHelper
  ) {

    $rootScope.$on('$routeChangeStart', function (ngEvent, next, current) {
      if (next.requireAuth && !$cookies.get('session')) {
        $location.url('/');
        ngEvent.preventDefault();
      }
      else if (!next.requireAuth && $cookies.get('session')) {
        $http.defaults.headers.common['Authorization'] = $cookies.get('session');
        $location.url('/meus-produtos');
        ngEvent.preventDefault();
      }
      else {
        $http.defaults.headers.common['Authorization'] = $cookies.get('session');
      }
    });

    $rootScope.$on('loading:progress', function() {
      $rootScope.loading = true;
    });

    $rootScope.$on('loading:finish', function() {
      $rootScope.loading = false;
    });

    $rootScope.sidenav = {
      visible: false,
      toggle: function () { $mdSidenav('main_menu').toggle(); },
      items: [
        { name: 'Produtos',  icon: 'shopping_basket', href: '#/meus-produtos' },
        { name: 'Busca',     icon: 'search',          href: '#/busca' },
        { name: 'Favoritos', icon: 'favorite',        href: '#/favoritos' }
      ]
    };

    $rootScope.showToast = function (message, duration) {
      return $mdToast
        .show({
          template: '<md-toast><div class="md-toast-content">' + message + '</div></md-toast>',
          hideDelay: duration || 1500,
          parent: document.getElementsByTagName('body')[0]
        });
    };

    $rootScope.sair = function () {
      $rootScope.sidenav.toggle();
      $cookies.remove('session');
      $location.url('/');
    };

    $rootScope.DateHelper = DateHelper;
    $rootScope.PessoaHelper = PessoaHelper;
  }
})();
