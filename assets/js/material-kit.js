

materialKit = {
  misc: {
    navbar_menu_visible: 0,
    window_width: 0,
    transparent: true,
    colored_shadows: true,
    fixedTop: false,
    navbar_initialized: false,
    isWindow: document.documentMode || /Edge/.test(navigator.userAgent)
  },

  checkScrollForParallax: function() {
    oVal = ($(window).scrollTop() / 3);
    big_image.css({
      'transform': 'translate3d(0,' + oVal + 'px,0)',
      '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
    });
  },

  initFormExtendedDatetimepickers: function() {
    $('.datetimepicker').datetimepicker({
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });

    $('.datepicker').datetimepicker({
      format: 'MM/DD/YYYY',
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });

    $('.timepicker').datetimepicker({
      //          format: 'H:mm',    // use this format if you want the 24hours timepicker
      format: 'h:mm A', //use this format if you want the 12hours timpiecker with AM/PM toggle
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });
  },


  initSliders: function() {
    // Sliders for demo purpose
    var slider = document.getElementById('sliderRegular');

    noUiSlider.create(slider, {
      start: 40,
      connect: [true, false],
      range: {
        min: 0,
        max: 100
      }
    });

    var slider2 = document.getElementById('sliderDouble');

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  },


  initColoredShadows: function() {
    if (materialKit.misc.colored_shadows == true) {
      if (!(BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 12)) {
        $('.card:not([data-colored-shadow="false"]) .card-header-image').each(function() {
          $card_img = $(this);

          is_on_dark_screen = $(this).closest('.section-dark, .section-image').length;

          // we block the generator of the colored shadows on dark sections, because they are not natural
          if (is_on_dark_screen == 0) {
            var img_source = $card_img.find('img').attr('src');
            var is_rotating = $card_img.closest('.card-rotate').length == 1 ? true : false;
            var $append_div = $card_img;

            var colored_shadow_div = $('<div class="colored-shadow"/>');

            if (is_rotating) {
              var card_image_height = $card_img.height();
              var card_image_width = $card_img.width();

              $(this).find('.back').css({
                'height': card_image_height + 'px',
                'width': card_image_width + 'px'
              });
              $append_div = $card_img.find('.front');
            }

            colored_shadow_div.css({
              'background-image': 'url(' + img_source + ')'
            }).appendTo($append_div);

            if ($card_img.width() > 700) {
              colored_shadow_div.addClass('colored-shadow-big');
            }

            setTimeout(function() {
              colored_shadow_div.css('opacity', 1);
            }, 200);
          }

        });
      }
    }
  },

  initRotateCard: debounce(function() {
    $('.rotating-card-container .card-rotate').each(function() {
      var $this = $(this);

      var card_width = $(this).parent().width();
      var card_height = $(this).find('.front .card-body').outerHeight();

      $this.parent().css({
        'margin-bottom': 30 + 'px'
      });

      $this.find('.front').css({
        'width': card_width + 'px',
      });

      $this.find('.back').css({
        'width': card_width + 'px',
      });
    });
  }, 50),

  checkScrollForTransparentNavbar: debounce(function() {
    if ($(document).scrollTop() > scroll_distance) {
      if (materialKit.misc.transparent) {
        materialKit.misc.transparent = false;
        $('.navbar-color-on-scroll').removeClass('navbar-transparent');
      }
    } else {
      if (!materialKit.misc.transparent) {
        materialKit.misc.transparent = true;
        $('.navbar-color-on-scroll').addClass('navbar-transparent');
      }
    }
  }, 17)
};

var big_image;

$(document).ready(function() {
  BrowserDetect.init();

  // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
  $('body').bootstrapMaterialDesign();

  window_width = $(window).width();

  $navbar = $('.navbar[color-on-scroll]');
  scroll_distance = $navbar.attr('color-on-scroll') || 500;

  $navbar_collapse = $('.navbar').find('.navbar-collapse');

  // Multilevel Dropdown menu

  $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    var $el = $(this);
    var $parent = $(this).offsetParent(".dropdown-menu");
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');

    $(this).closest("a").toggleClass('open');

    $(this).parents('a.dropdown-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-menu .show').removeClass("show");
    });

    if (!$parent.parent().hasClass('navbar-nav')) {
      $el.next().css({
        "top": $el[0].offsetTop,
        "left": $parent.outerWidth() - 4
      });
    }

    return false;
  });

  //  Activate the Tooltips
  $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

  // FileInput
  $('.form-file-simple .inputFileVisible').click(function() {
    $(this).siblings('.inputFileHidden').trigger('click');
  });

  $('.form-file-simple .inputFileHidden').change(function() {
    var filename = $(this).val().replace(/C:\\fakepath\\/i, '');
    $(this).siblings('.inputFileVisible').val(filename);
  });

  $('.form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn').click(function() {
    $(this).parent().parent().find('.inputFileHidden').trigger('click');
    $(this).parent().parent().addClass('is-focused');
  });

  $('.form-file-multiple .inputFileHidden').change(function() {
    var names = '';
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
      if (i < $(this).get(0).files.length - 1) {
        names += $(this).get(0).files.item(i).name + ',';
      } else {
        names += $(this).get(0).files.item(i).name;
      }
    }
    $(this).siblings('.input-group').find('.inputFileVisible').val(names);
  });

  $('.form-file-multiple .btn').on('focus', function() {
    $(this).parent().siblings().trigger('focus');
  });

  $('.form-file-multiple .btn').on('focusout', function() {
    $(this).parent().siblings().trigger('focusout');
  });

  // Activate bootstrap-select
  if ($(".selectpicker").length != 0) {
    $(".selectpicker").selectpicker();
  }

  // Activate Popovers
  $('[data-toggle="popover"]').popover();

  // Active Carousel
  $('.carousel').carousel();

  //Activate tags
  // we style the badges with our colors
  var tagClass = $('.tagsinput').data('color');

  if ($(".tagsinput").length != 0) {
    $('.tagsinput').tagsinput();
  }

  $('.bootstrap-tagsinput').addClass('' + tagClass + '-badge');

  if ($('.navbar-color-on-scroll').length != 0) {
    $(window).on('scroll', materialKit.checkScrollForTransparentNavbar);
  }

  materialKit.checkScrollForTransparentNavbar();

  if (window_width >= 768) {
    big_image = $('.page-header[data-parallax="true"]');
    if (big_image.length != 0) {
      $(window).on('scroll', materialKit.checkScrollForParallax);
    }

  }

  //initialise rotating cards
  materialKit.initRotateCard();

  //initialise colored shadow
  materialKit.initColoredShadows();
});

$(window).on('resize', function() {
  materialKit.initRotateCard();
});

$(document).on('click', '.card-rotate .btn-rotate', function() {
  var $rotating_card_container = $(this).closest('.rotating-card-container');

  if ($rotating_card_container.hasClass('hover')) {
    $rotating_card_container.removeClass('hover');
  } else {
    $rotating_card_container.addClass('hover');
  }
});

$(document).on('click', '.navbar-toggler', function() {
  $toggle = $(this);

  if (materialKit.misc.navbar_menu_visible == 1) {
    $('html').removeClass('nav-open');
    materialKit.misc.navbar_menu_visible = 0;
    $('#bodyClick').remove();
    setTimeout(function() {
      $toggle.removeClass('toggled');
    }, 550);

    $('html').removeClass('nav-open-absolute');
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 580);


    div = '<div id="bodyClick"></div>';
    $(div).appendTo("body").click(function() {
      $('html').removeClass('nav-open');

      if ($('nav').hasClass('navbar-absolute')) {
        $('html').removeClass('nav-open-absolute');
      }
      materialKit.misc.navbar_menu_visible = 0;
      $('#bodyClick').remove();
      setTimeout(function() {
        $toggle.removeClass('toggled');
      }, 550);
    });

    if ($('nav').hasClass('navbar-absolute')) {
      $('html').addClass('nav-open-absolute');
    }

    $('html').addClass('nav-open');
    materialKit.misc.navbar_menu_visible = 1;
  }
});

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

var BrowserDetect = {
  init: function() {
    this.browser = this.searchString(this.dataBrowser) || "Other";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
  },
  searchString: function(data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      this.versionSearchString = data[i].subString;

      if (dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      }
    }
  },
  searchVersion: function(dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index === -1) {
      return;
    }

    var rv = dataString.indexOf("rv:");
    if (this.versionSearchString === "Trident" && rv !== -1) {
      return parseFloat(dataString.substring(rv + 3));
    } else {
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    }
  },

  dataBrowser: [{
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer"
    },
    {
      string: navigator.userAgent,
      subString: "Trident",
      identity: "Explorer"
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    },
    {
      string: navigator.userAgent,
      subString: "Safari",
      identity: "Safari"
    },
    {
      string: navigator.userAgent,
      subString: "Opera",
      identity: "Opera"
    }
  ]

};

$(document).ready(function() {

  $('.counter').each(function () {
$(this).prop('Counter',0).animate({
  Counter: $(this).text()
}, {
  
  duration: 25000,
  easing: 'swing',
  step: function (now) {
      $(this).text(Math.ceil(now));
  }
});
});

});  


// scroll to top
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/**
   * Easy on scroll event listener 
   */
const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener)
}

  /**
   * Animation on scroll
   */
window.addEventListener('load', () => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  })
});

// Map
// var map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();


// Initialize and add the map
// Google Map
function initMap() {
  // The location of puertoRico
const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 2,
  center: { lat: 18.376, lng: -65.937 },
});

    const locations = [
      [{ lat: 18.376, lng: -65.937 }, "The Island serves as Indusa's corporate headquarters and main operating center for communications, commercial, and logistics support. Operating within three facilities, in San Juan, Carolina and Ponce, all strategically designed for the benefit of Island and regional clients. Indusa's presence in the market spans over 20 years, with principals ingrained in the industry for over 60 years. Puerto Rico produces 25% of the world's pharmaceutical products, and Indusa is a key player in servicing all levels of the pharmaceutical industry needs. Moreover, Indusa provides full service support on behalf of the power companies, food and beverage, chemical, mechanical ,World Wide Trade, commercial and industrial segments of the market."],
        [{ lat: -33.456, lng: -70.655 }, "Indusa's 4th operating facility and main South American office is located in Santiago, Chile's capital. The company boasts dedicated and committed full-service employees and market coordinators in order to support the needs of clients within the mining, power, chemical, food and beverage, commercial, WWT, gas distribution and processing industries, among others. Furthermore, true to its focus of providing fluid management solutions, Indusa has been active in supporting the needs of engineering and design firms via educational and technical support."],
        [{ lat: -12.047, lng: -77.048 }, "Indusa was selected by a market-leading multinational engineering firm to partner in the expedited sourcing of critical polypropylene pipe and fittings needed for pressure use of in an upstart mining enterprise. Based on Indusa's commitment and successful efforts, said firm placed its trust on Indusa to source its specialty industrial diaphragm valves, a list comprised of over 150 valves manufactured on an expedited basis with continuous partial deliveries and logistics´schedules. Thereafter, Indusa was honored to serve the entire needs for all valve requirements for one of the region's single largest mining endeavors, including knife, gate, globe, check, ball and butterfly valves. Consequently, and at the specific request of numerous clients, Indusa has established a full service regional office in Lima to attend to the needs of our exponentially growing customer base in the market."],
        [{ lat: 8.965, lng: -79.53 }, "For over seven years, Indusa has actively supported the needs of numerous Panama markets and strategic clients. The company has had a formal active local presence operating from our regional office in Panama City since 2007 and continues to support projects in the petrochemical, WWT, refinery, power, food and beverage, construction, industrial and institutional markets. including our active and continued support of the Panama Canal expansion project. Indusa's current role in the Panamanian market has evolved into servicing a wide contractor base as well as a laudable group of local and multinational end-users."],
        [{ lat: 10.6577, lng: -61.509 }, "Due to Trinidad's highly industrialized economic platform, Indusa has been servicing the fluid management needs of various local and multinational clients established and operating in Trinindad & Tobago. The company has been active in sourcing specialty high pressure piping systems for petrochemical plants in Trinidad, and has successfully sourced projects including high-end alloys, such as 20, Duplex Stainless Steel Chrome Moly, C-22, and B2/B3 for said users."],
        [{ lat: 5.826, lng: -55.202 }, "In consideration of Indusa's role and efforts throughout Latin America, several of its clients have looked to Indusa to support their sourcing needs in territorially removed Suriname. Given how Indusa's relationships with cargo and transport agencies allow the company to service these clients' needs in a timely and efficient manner, entities such as BHP Billiton and others in the extrusion of alumina, have sought out Indusa to further their in-market efforts, which makes the company take pride in the quality of their work."],
        [{ lat: 4.699, lng: -74.065 }, "Indusa´s presence in Colombia spans clients from Bogotá to Medellín and other cities. Indusa supports the needs of local OEM's, refineries, mining operations, petrochemical plants as well as food and beverage consortiums. Recently, Indusa started to actively support the needs of an upstart coal mining operation in the region, after having successfully participated in multinational requisitions for HDPE pipe, fittings and equipment, as well as ancillary fluid management solutions. Indusa has now established a formal local entity in Bogota, expected to expand to provide full service operational, market support and trade efforts in the market, including Cartagena, Medellin and Cali."],
        [{ lat: 6.22, lng: -75.573 }, "Indusa´s presence in Colombia spans clients from Bogotá to Medellín and other cities. Indusa supports the needs of local OEM's, refineries, mining operations, petrochemical plants as well as food and beverage consortiums. Recently, Indusa started to actively support the needs of an upstart coal mining operation in the region, after having successfully participated in multinational requisitions for HDPE pipe, fittings and equipment, as well as ancillary fluid management solutions. Indusa has now established a formal local entity in Bogota, expected to expand to provide full service operational, market support and trade efforts in the market, including Cartagena, Medellin and Cali."],
        [{ lat: 14.60, lng: -90.48 }, "Indusa has served as consultant and full service provider of valves and piping equipment for local entities, including a multination Coal Based Power Plant. Additionally, Indusa actively supports the needs of Guatemala-based chemical and pharmaceutical plants."],
        [{ lat: 17.729, lng: -64.8174 }, "The US Virgin Islands´ client base is atop the list of Indusa's priorities. Servicing markets in the WWT, Power Company, government and tourism infrastructure markets, Indusa actively supports the needs of numerous entities in the Islands. In particular, Indusa has supported grass root efforts geared towards establishing new, alternate fuel co-power generating facilities in the Islands."],
        [{ lat: 18.49, lng: -69.865 }, "Indusa boasts a permanent presence in the Dominican Republic via an in-market support representative. Indusa´s foray into the Dominican market spans over a multitude of clients, including mining, food and beverage, pharmaceutical plants, power, tourism development and others. Additionally, Indusa actively services the needs of apparel and clothing entities as well as major infrastructure projects through multinational contractors."],
        [{ lat: 9.937, lng: -83.97 }, "Indusa has been an integral participant in several of Costa Rica's infrastructure projects, including participating as member of a multi-national consortium in a venture to provide HDPE pipe and equipment to the local water treatment authority. Indusa has also provided active technical and engineering support to engineering firms that service the local government."],
        [{ lat: 18.433, lng: -64.618 }, "Considering the fact that a substantial portion of the materials needed within windward and leeward Islands from its main operating center in Puerto Rico, Indusa has endeavored to support the multiple fluid management needs of Puerto Rico's neighboring British Virgin Islands. From HDPE pipes for water and gas transfer, to thermal fusion equipment, desalinization plants and reverse osmosis filtering equipment, Indusa has secured a leading role in supporting the fluid management needs of these British territories."],
        [{ lat: 0.233, lng: -78.48 }, "Ecuador boasts one of the world´s richest territorial expanses. As Ecuador endeavors to leverage and capitalize on the commercial exploitation of its abundant oil and mineral ore deposits, Indusa strives to employ its institutional expertise, sophistication and in-market experience to support clients in these fields and others in a manner consistent with its mission of providing fluid management solutions."],
        [{ lat: -34.797, lng: -58.305 }, "The company´s role in Argentina spans both mining and pharmaceutical concerns and projects. With the recent advent of two mainstay mining projects in Andean Argentina, Indusa was called upon to support the design and engineering efforts on behalf of the owners and designers of the mines in both, Buenos Aires and Santiago, Chile, and is now poised to become a leading source of solutions during their startup phases and thereafter. In addition, due to their ample experience in servicing the pharmaceutical market's needs in Puerto Rico, Argentine divisions of the main pharma companies have asked for Indusa´s continued backup in the country, an honorable task which Indusa is currently undertaking."],
        [{ lat: -16.429, lng: -67.941 }, "Indusa was engaged by a multinational engineering, construction and design firm to manage and support the daunting logistics of sourcing over 30 (to date) interrelated, yet separate, purchase orders for all of its steel pipe, flange and fittings needs, including expediting efforts, multi-factory procurements and shipping points, material quality certification for over 500 line items within said orders. Indusa's success and commitment to the effort have been further rewarded by its subsequent engagement to source specialty valves, grooved end materials and other solutions for the project and other efforts currently managed by the regional firm."],
        [{ lat: 13.230, lng: -59.623 }, "Indusa has recently served as consultant and provided materials for the redistribution of HDPE lines along the Barbados harbour. Furthermore, Indusa has been involved in the planning stages and feasability studies of underground trans-Caribbean natural gas pipeline in order to service the country´s LNG needs from neighboring resources."],

    ];
    const infoWindow = new google.maps.InfoWindow();

      locations.forEach(([position, title], i) => {
      const marker = new google.maps.Marker({
        position,
        map,
        title: `${i + 1}. ${title}`,
        // label: `${i + 1}`,
        optimized: false,
      });

    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
  });
}


window.initMap = initMap;

  // const puertoRico = [{ lat: 18.376, lng: -65.937 };
  // const chile = [{ lat: -33.456, lng: -70.655 };
  // const peru = [{ lat: -12.047, lng: -77.048 };
  // const panama = {[ lat: 8.965, lng: -79.53 };
  // const trinidad = [{ lat: 10.6577, lng: -61.509 };
  // const suriname = [{ lat: 5.826, lng: -55.202 };
  // const columbia = [{ lat: 4.699, lng: -74.065 };
  // const columbiaMedellin = [{ lat: 6.22, lng: -75.573 };
  // const guatemala = [{ lat: 14.60, lng: -90.48 };
  // const usvi = [{ lat: 17.729, lng: -64.8174 };
  // const dominicanRepublic = [{ lat: 18.49, lng: -69.865 };
  // const costaRica = [{ lat: 9.937, lng: -83.97 };
  // const bvi = [{ lat: 18.433, lng: -64.618 };
  // const ecuador = [{ lat: 0.233, lng: -78.48 };
  // const argentina = [{ lat: -34.797, lng: -58.305 };
  // const bolivia = [{ lat: -16.429, lng: -67.941 };

  // // The map, centered at puertoRico
  // const map = new google.maps.Map(document.getElementById("map"), {
  //   zoom: 2,
  //   center: puertoRico,
  // });
  // // The marker positions
  // const puertoRicoMarker = new google.maps.Marker({
  //   position: puertoRico,
  //   map: map,
  // });
  
  // const chileMarker = new google.maps.Marker({
  //   position: chile,
  //   map: map,
  // });

  // const peruMarker = new google.maps.Marker({
  //   position: peru,
  //   map: map,
  // });

  // const panamaMarker = new google.maps.Marker({
  //   position: panama,
  //   map: map,
  // });

  // const trinidadMarker = new google.maps.Marker({
  //   position: trinidad,
  //   map: map,
  // });

  // const surinameMarker = new google.maps.Marker({
  //   position: suriname,
  //   map: map,
  // });

  // const columbiaMarker = new google.maps.Marker({
  //   position: columbia,
  //   map: map,
  // });
  // const columbiaMedellinMarker = new google.maps.Marker({
  //   position: columbiaMedellin,
  //   map: map,
  // });

  // const guatemalaMarker = new google.maps.Marker({
  //   position: guatemala,
  //   map: map,
  // });

  // const usviMarker = new google.maps.Marker({
  //   position: usvi,
  //   map: map,
  // });

  // const dominicanRepublicMarker = new google.maps.Marker({
  //   position: dominicanRepublic,
  //   map: map,
  // });
  
  // const costaRicaMarker = new google.maps.Marker({
  //   position: costaRica,
  //   map: map,
  // });

  // const bviMarker = new google.maps.Marker({
  //   position: bvi,
  //   map: map,
  // });

  // const ecuadorMarker = new google.maps.Marker({
  //   position: ecuador,
  //   map: map,
  // });

  // const argentinaMarker = new google.maps.Marker({
  //   position: argentina,
  //   map: map,
  // });

  // const boliviaMarker = new google.maps.Marker({
  //   position: bolivia,
  //   map: map,
  // });



// }

// window.initMap = initMap;

var better_browser = '<div class="container"><div class="better-browser row"><div class="col-md-2"></div><div class="col-md-8"><h3>We are sorry but it looks like your Browser doesn\'t support our website Features. In order to get the full experience please download a new version of your favourite browser.</h3></div><div class="col-md-2"></div><br><div class="col-md-4"><a href="https://www.mozilla.org/ro/firefox/new/" class="btn btn-warning">Mozilla</a><br></div><div class="col-md-4"><a href="https://www.google.com/chrome/browser/desktop/index.html" class="btn ">Chrome</a><br></div><div class="col-md-4"><a href="http://windows.microsoft.com/en-us/internet-explorer/ie-11-worldwide-languages" class="btn">Internet Explorer</a><br></div><br><br><h4>Thank you!</h4></div></div>';



/*!

 =========================================================
 * Material Kit PRO - v2.2.1
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-kit-pro
 * Copyright 2022 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */