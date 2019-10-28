var creative = {};
var gdc = {};
var bannerWidth = 300;

function init() {
  // Polite loading
  if (Enabler.isPageLoaded()) {
    startAd();
  }else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, startAd);
  }
}
function preInit() {
  console.log("preInit()");
  if (Enabler.isInitialized()) {
    init();
  } else {
    Enabler.addEventListener( studio.events.StudioEvent.INIT,init);
  }
}

function getDynamicContent() {
    Enabler.setProfileId(10490670)
    var devDynamicContent = {};
    devDynamicContent.CTA = [{}];
    devDynamicContent.CTA[0]._id = 0;
    devDynamicContent.CTA[0].Unique_ID = 1;
    devDynamicContent.CTA[0].CTA = "Shop Holiday";
    devDynamicContent.Mindshare_Tracking = [{}];
    devDynamicContent.Mindshare_Tracking[0]._id = 0;
    devDynamicContent.Mindshare_Tracking[0].Unique_ID = 100;
    devDynamicContent.Mindshare_Tracking[0].Featured_Product = false;
    devDynamicContent.Mindshare_Tracking[0].product_type = "Animals & Pet Supplies > Pet Supplies";
    devDynamicContent.Mindshare_Tracking[0].Mindshare_Targeting_Group = "Animals & Pet Supplies";
    devDynamicContent.FacebookMockFeed = [{}];
    devDynamicContent.FacebookMockFeed[0]._id = 0;
    devDynamicContent.FacebookMockFeed[0].ProductID = 1111111;
    devDynamicContent.FacebookMockFeed[0].ProductName = "Unique Loom Taftan Oasis Area Rug";
    devDynamicContent.FacebookMockFeed[0].ProductPrice = "82.49 USD";
    devDynamicContent.FacebookMockFeed[0].ProductStrikethroughPrice = "130.62 USD";
    devDynamicContent.FacebookMockFeed[0].ProductImage = {};
    devDynamicContent.FacebookMockFeed[0].ProductImage.Url = "http://ak1.ostkcdn.com/images/products/22747158/L28341240.jpg";
    devDynamicContent.FacebookMockFeed[0].ClickthroughURL = {};
    devDynamicContent.FacebookMockFeed[0].ClickthroughURL.Url = "https://facebook.com/marketplace/deals/item/2451607918222687/?referral_code=";
    devDynamicContent.FacebookMockFeed[0].ProductType = "Home & Garden > Decor > Rugs";
    devDynamicContent.FacebookMockFeed[0].FeaturedItem = true;
    Enabler.setDevDynamicContent(devDynamicContent);
    ////////////////////////////////////////////////
    //gdc obj
    gdc.Headline =  dynamicContent.FacebookMockFeed[0].ProductName;
    gdc.product_price = dynamicContent.FacebookMockFeed[0].ProductPrice;
    gdc.product_strikethrough_price = dynamicContent.FacebookMockFeed[0].ProductStrikethroughPrice;
    gdc.exit_url = dynamicContent.FacebookMockFeed[0].ClickthroughURL.Url ; 
    gdc.cta = dynamicContent.CTA[0].CTA
    gdc.cta_url = dynamicContent.FacebookMockFeed[0].ClickthroughURL.Url;
    gdc.Image_URL = dynamicContent.FacebookMockFeed[0].ProductImage.Url
    //strip out few things if there
    gdc.product_price = gdc.product_price.replace(" USD","")
    gdc.product_price = gdc.product_price.replace("$","")
    //
    gdc.product_price = gdc.product_price.split(".");
    gdc.product_price_dollar = "$"+gdc.product_price[0];
    gdc.product_price_cent = gdc.product_price[1];
    //
    gdc.product_strikethrough_price  = gdc.product_strikethrough_price.replace(" USD","")
    gdc.product_strikethrough_price  = gdc.product_strikethrough_price.replace("$","")
    //
    gdc.product_strikethrough_price  = gdc.product_strikethrough_price.split(".");
    gdc.productstrikethrough_price_dollar = "$"+gdc.product_strikethrough_price [0];
    gdc.productstrikethrough_price_cent = gdc.product_strikethrough_price [1];
}
 function loadimages(){
    var _img = document.getElementById('bg');
    var newImg = new Image;
    newImg.onload = function() {
      _img.src = this.src;
      goAnimation();
    }
      newImg.src = gdc.Image_URL; 
 }
function startAd() {
    getDynamicContent();
    setupDom();
    addListeners();
    loadimages();
 }

//Initializes the ad components:
function setupDom() {
  ///in - Auto shrink Title to fit a width and reposition
    document.getElementById('title').innerHTML = gdc.Headline ;
    creative.title = document.getElementById('title');
    var rect = creative.title.getBoundingClientRect();
    var myWidth = rect.right - rect.left
    var maxWidth = 104;

    if( myWidth > maxWidth  ){
         while(myWidth  > maxWidth ){
          gdc.Headline = gdc.Headline.substring(gdc.Headline.length-1, -1)
          document.getElementById('title').innerHTML = gdc.Headline;
          rect = creative.title.getBoundingClientRect();
          myWidth = rect.right - rect.left
        }
        gdc.Headline += '...'
        document.getElementById('title').innerHTML = gdc.Headline
        rect = creative.title.getBoundingClientRect();
        myWidth = rect.right - rect.left
    }
  ///out - Auto shrink Title to fit a width and reposition


  //load from DC
  creative.title = document.getElementById('title').innerHTML = gdc.Headline ;
  creative.title = document.getElementById('title');
  ///////////////
  creative.dollarOld = document.getElementById('dollarOld').innerHTML =  gdc.productstrikethrough_price_dollar; 
  creative.dollarOld = document.getElementById('dollarOld');
  creative.centOld = document.getElementById('centOld').innerHTML= gdc.productstrikethrough_price_cent; 
  creative.centOld = document.getElementById('centOld')
  creative.strike = document.getElementById('strike')
  creative.dollarNew = document.getElementById('dollarNew').innerHTML= gdc.product_price_dollar;
  creative.centNew = document.getElementById('centNew').innerHTML= gdc.product_price_cent;
  //////////////
  creative.endframe = document.getElementById('endframe');
  creative.priceNew = document.getElementById('priceNew');
  creative.priceOld = document.getElementById('priceOld');
  creative.bg = document.getElementById('bg');
  creative.logo_svg = document.getElementById('logo_svg');
  //
  creative.cta_container = document.getElementById('cta_container')
  creative.cta = document.getElementById('cta').innerHTML = gdc.cta;
  creative.cta = document.getElementById('cta')
  //TOP
  creative.bannerCover = document.getElementById('bannerCover');
  creative.exit = document.getElementById('exit');
  //vars:
  creative.blue = '#1877f2';
  creative.blue_rgb = "rgba(24,119,242,1)" 
  creative.grey = '#b1b1b1';
  creative.grey_rgb = "rgba(177,177,177,1)";
  creative.blue_rgb = "rgba(147,182,228,1)";
  creative.white = '#fff';

  repositionPrices();
  createStrike( creative.strike, creative.priceOld)
}
function repositionPrices(){
      var spacerX = 6;
      var oldPrice  = creative.priceOld.getBoundingClientRect();
      var oldPriceWidth = oldPrice.right - oldPrice.left;
      creative.priceNew.style.left = oldPrice.left + oldPriceWidth + spacerX +'px';
}
function createStrike (strike,price){
    var rect = price.getBoundingClientRect();
    console.log("strike = " + rect.top, rect.right, rect.bottom, rect.left);
    TweenLite.set(creative.strike, {
      y:rect.top + (0.3 * (rect.bottom - rect.top)),
      x:rect.left -2,
      width: rect.right - rect.left + 3,
      rotationZ:0.01
    })
}
//-----------------------------------
// listeners 
//-----------------------------------
  function addListeners() {
    console.log("addListeners()");
    creative.exit.addEventListener('click', onExitClickHandler);
    creative.cta.addEventListener('click', onExitClickHandler);
    creative.cta.addEventListener('mouseout', onOutHandler);
    creative.cta.addEventListener('mouseover', onOverHandler);
  }

  // var onEndframe = false;
  function onOutHandler() {
      TweenLite.to(creative.cta, 0.6, { 
          backgroundColor: creative.white,
          color:creative.blue,
      }) 
  }
  function onOverHandler() {
      TweenLite.to(creative.cta, 0.6, { 
          backgroundColor: creative.blue,
          color:creative.white,
      }) 
  }
  function onExitClickHandler() {
    Enabler.exitOverride( "Click Through", gdc.exit_url)
    //Enabler.exit('clicktag exit');
    //window.open(clickTag, '_blank');
    //console.log('Exit to ' + clickTag);
  }

//------------------------------------------------------------------------------
// Animation 
//------------------------------------------------------------------------------
function goAnimation() {
    console.log('go end frame' );   
    creative.endframe.style.display = 'block'; 
    TweenLite.to(creative.bannerCover, 0.5, { opacity: 0}); 
    TweenLite.set(creative.cta, {rotationZ:0.01})

    //
    var d=0;
    var slideY = 10;
    var spd = 0.7;
    var ease1 = Power2.easeOut
    var ease2 = Back.easeOut
    //
    TweenLite.from(creative.bg, spd, { 
         scaleX: 1.2, 
         scaleY:1.2,
          ease:Power4.easeOut
    })

    d+=0.1;
    TweenLite.from(creative.logo_svg, spd-0.2 ,{ 
          delay:d,
          scaleX: 0.5,
          scaleY: 0.5,
          opacity:0,
          ease:ease2
    })
    d+=0.3;
    TweenLite.from(creative.title,spd, { 
          delay:d,
          y: slideY,
          opacity:0,
          ease:ease1
    })
    //POP IN - Old price
    d+=0.4;
    TweenLite.from(creative.priceOld, 1.1, { 
          delay:d,
          opacity: 0,
          ease:ease1
    })
    //STRIKE OUT
    d+=0.7;
    TweenLite.from(creative.strike, 0.3, { 
          delay:d,
          width:0,  
          // opacity: 0.80,
          ease:ease1
    })
          TweenLite.to(creative.strike, 1.3, { 
                delay:d +  0.3,  
                // opacity: 0.60,
                backgroundColor:creative.blue_rgb,
                ease:Power1.easeInOut,
          })
          TweenLite.to([creative.dollarOld,creative.centOld,creative.strike], 1.3, { 
                delay: d+  0.3,
                color :creative.blue_rgb,
                // opacity: 0.60,

                ease:Power1.easeInOut,
          })
    //POP IN - new price
     d+=0.35;
    TweenLite.from(creative.priceNew, spd-0.4, { 
          delay:d,
          scaleX:0.5,  
          scaleY:0.5, 
          opacity: 0,
          ease:ease2
    })
    d+=0.4
    TweenLite.from(creative.cta, spd-0.4, { 
          delay:d,
          scaleX:0.5,  
          scaleY:0.5, 
          opacity: 0,
          ease:ease2
    })
}
// Main onload handler
window.addEventListener('load', preInit);
