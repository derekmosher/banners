var creative = {};
var gdc = {};
var bannerWidth = 160;

function init() {
  // Polite loadin
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
    var titleDiv = creative.title.getBoundingClientRect();
    var myWidth = titleDiv.right - titleDiv.left;
    var myHeight = titleDiv.bottom - titleDiv.top;
    console.log('myHeight ='+ myHeight)
    var maxWidth = 150;
    var maxHeight = 80;

    if( myHeight > maxHeight  ){
        while(myHeight  > maxHeight ){
          gdc.Headline = gdc.Headline.substring(gdc.Headline.length-1, -1)
          document.getElementById('title').innerHTML = gdc.Headline//gdc.Headline ;
          titleDiv = creative.title.getBoundingClientRect();
          myHeight = titleDiv.bottom - titleDiv.top;
        }
        gdc.Headline = gdc.Headline.substring(0, gdc.Headline.length-2)
        gdc.Headline = gdc.Headline.trim();
        gdc.Headline += '...'
        document.getElementById('title').innerHTML = gdc.Headline
        titleDiv = creative.title.getBoundingClientRect();
        myHeight = titleDiv.bottom - titleDiv.top;
    }
  ///out - Auto shrink Title to fit a width and reposition
  
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
  creative.titlePriceGroup = document.getElementById("titlePriceGroup")
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
  creative.bg_scale = 1;
  //
  repositionPrices();
  createStrikeThrough( creative.strike, creative.priceOld)
}
function repositionPrices(){
      var spacerY = 0 
      var titleDiv = creative.title.getBoundingClientRect();
      creative.priceNew.style.top = titleDiv.bottom + spacerY + 'px';
      creative.priceOld.style.top = titleDiv.bottom + spacerY + 'px';
      //
      var spacerX = 12
      var oldPriceWidth  = creative.priceOld.getBoundingClientRect();
      var newPriceWidth  = creative.priceNew.getBoundingClientRect();
      oldPriceWidth = oldPriceWidth.right - oldPriceWidth.left;
      newPriceWidth = newPriceWidth.right - newPriceWidth.left;
      totalPriceWidth = oldPriceWidth + spacerX + newPriceWidth;
      var newX = (bannerWidth - totalPriceWidth)/2 
      creative.priceOld.style.left = newX +'px'
      creative.priceNew.style.left = newX + oldPriceWidth + spacerX +'px';
}
function createStrikeThrough (strike,price){
    var titleDiv = price.getBoundingClientRect();
    console.log("strike = " + titleDiv.top, titleDiv.right, titleDiv.bottom, titleDiv.left);
    TweenLite.set(creative.strike, {
      y:titleDiv.top + (0.3 * (titleDiv.bottom - titleDiv.top)),
      x:titleDiv.left -2,
      width: titleDiv.right - titleDiv.left + 3,
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
  //  console.log('Exit to ' + clickTag);
  }

//------------------------------------------------------------------------------
// Animation 
//------------------------------------------------------------------------------
function goAnimation() {
    console.log('go end frame' );   
    creative.endframe.style.display = 'block'; 
    TweenLite.to(creative.bannerCover, 0.1, { opacity: 0}); 
    TweenLite.set(creative.cta, {rotationZ:0.01})
    //
    var d=0
    var slideY = 10;
    var spd = 0.8;
    var ease1 = Power2.easeOut
    var ease2 = Back.easeOut
    //
    TweenLite.from(creative.bg, spd, { 
          scaleX:creative.bg_scale* 1.2, 
          scaleY:creative.bg_scale*1.2,
          ease:Power4.easeOut
    })
    d+=0.2;
     TweenLite.from(creative.logo_svg, spd-0.4 ,{ 
          delay:d,
          scaleX: 0.5,
          scaleY: 0.5,
          opacity:0,
          ease:ease2
    })
    d+=0.2;
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
