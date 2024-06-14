//INICIALIZAÇÃO DO F7 QUANDO DISPOSITIVO ESTÁ PRONTO
document.addEventListener('deviceready', onDeviceReady, false);
var app = new Framework7({
  // App root element
  el: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: true,
  },
  dialog: {
    buttonOk: 'Sim',
    buttonCancel: 'Cancelar',
  },
  // Add default routes
  routes: [
    {
      path: '/index/',
      url: 'index.html',
      options: {
        transition: 'f7-circle',
      },
      on: {
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
          if (page.route.path !== '/detalhes/' && page.route.path !== '/carrinho/') {
            $("#menuPrincipal").show();
          }
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
          // app.views.main.router.navigate('/carrinho/');
          $.getScript('js/index.js');

          var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: true,
            delay:3000,
            loop: true,
            breakpoints: {
              50:{
                slidesPerView:1,
                spaceBetween: 30
              },
              640:{
                slidesPerView:2,
                spaceBetween: 30
              },
              992:{
                slidesPerView:3,
                spaceBetween: 30
              },
              1200:{
                slidesPerView:4,
                spaceBetween: 30
              },
            }
          });

          var swiper2 = new Swiper(".categorias", {
            slidesPerView: 3,
            spaceBetween: 10,
            breakpoints: {
              50:{
                slidesPerView:3,
                spaceBetween: 10
              },
              640:{
                slidesPerView:6,
                spaceBetween: 10
              },
              992:{
                slidesPerView:8,
                spaceBetween: 10
              },
              1200:{
                slidesPerView:12,
                spaceBetween: 10
              },
            }
          });
        },
      }
    },
    {
      path: '/link2/',
      url: 'link2.html',
      animate: false,
      on: {
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
        },
      }
    },
    {
      path: '/link3/',
      url: 'link3.html',
      animate: false,
      on: {
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
        },
      }
    },
    {
      path: '/link4/',
      url: 'link4.html',
      animate: false,
      on: {
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
        },
      }
    },
    {
      path: '/detalhes/',
      url: 'detalhes.html',
      animate: false,
      on: {
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
          $("#menuPrincipal").hide();
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
          $.getScript('js/detalhes.js');
        },
      }
    },
    {
      path: '/carrinho/',
      url: 'carrinho.html',
      options: {
        transition: 'f7-push',
      },
      on: {
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
          $("#menuPrincipal").hide();
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
          $.getScript('js/carrinho.js');
        },
      }
    },
  ],
  // ... other parameters
});

//Para testes direto no navegador
var mainView = app.views.create('.view-main', { url: '/index/' });

//EVENTO PARA SABER O ITEM DO MENU ATUAL
app.on('routeChange', function (route) {
  var currentRoute = route.url;
  console.log(currentRoute);
  document.querySelectorAll('.tab-link').forEach(function (el) {
    el.classList.remove('active');
  });
  var targetEl = document.querySelector('.tab-link[href="' + currentRoute + '"]');
  if (targetEl) {
    targetEl.classList.add('active');
  }
});

function onDeviceReady() {
  //Quando estiver rodando no celular
  var mainView = app.views.create('.view-main', { url: '/index/' });

  //COMANDO PARA "OUVIR" O BOTAO VOLTAR NATIVO DO ANDROID 	
  document.addEventListener("backbutton", function (e) {

    if (mainView.router.currentRoute.path === '/index/') {
      e.preventDefault();
      app.dialog.confirm('Deseja sair do aplicativo?', function () {
        navigator.app.exitApp();
      });
    } else {
      e.preventDefault();
      mainView.router.back({ force: true });
    }
  }, false);
}
