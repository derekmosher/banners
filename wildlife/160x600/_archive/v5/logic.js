var creative = {};
var gdc = {};
var bannerWidth = 160;

function init() {
  // Polite loading
  if (Enabler.isPageLoaded()) {
    loadimages();
  }else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, loadimages);
  }
}
function preInit() {
  console.log("preInit()");
 //startAd();
  if (Enabler.isInitialized()) {
    init();
  } else {
    Enabler.addEventListener( studio.events.StudioEvent.INIT,init);
  }
}

function getDynamicContent() {
    Enabler.setProfileId(10493642)
    var devDynamicContent = {};
    
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1 = [{}];
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0]._id = 0;
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Unique_Id = 1;
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Creative_Size = [];
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Creative_Size[0] = {"Width": 160, "Height": 600};
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Reporting_Label = "Clothing ";
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Headline = "Elbow<br/>Patchwork<br/>Cardigan";
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Headline_Color = "";
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Headline_Font_Size = "";
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].product_price = "$73.98";
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].product_strikethrough_price = "$33.98";
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].cta = "Shop Holidays";
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Image_URL = {};
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Image_URL.Url = "https://scontent-lax3-1.xx.fbcdn.net/v/t45.5328-4/44977087_2216302805106795_6202557611561189376_n.jpg?_nc_cat=107&_nc_oc=AQk4W2_Gp_Ck54tyrxAKxZwf7cJqcvgDfm2Iw6FU9Hm79bG1N0rU_9oKbKrH0AWPZlI&_nc_ht=scontent-lax3-1.xx&oh=5ce3d6d62bec3258846c4806f8d4c83c&oe=5E1E22D9";
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Exit_URL = {};
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Exit_URL.Url = "https://www.facebook.com/marketplace/deals/item/1916247971800102";
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Default = false;
    devDynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0].Active = false;

    Enabler.setDevDynamicContent(devDynamicContent);
    console.log('------------------------------------------------');
    console.log( devDynamicContent)
    ////////////////////////////////////////////////
    gdc = dynamicContent.HEAT_FBMPHOLIDAY_VARIABLETESTS_UPDATED_100819_Sheet1[0]
    //overwrite GDC with XML feed:
    gdc.exit_url = xmlfeed.getElementsByTagName("ClickthroughURL")[nodeNum].childNodes[0].nodeValue; 
    //gdc.Headline = "test feed the food now plwase for banner product name dog help me now."
    gdc.Headline = xmlfeed.getElementsByTagName("ProductName")[nodeNum].childNodes[0].nodeValue; 
    console.log(gdc.Headline)
    gdc.product_price = xmlfeed.getElementsByTagName("ProductPrice")[nodeNum].childNodes[0].nodeValue; 
    gdc.product_strikethrough_price = xmlfeed.getElementsByTagName("ProductStrikethroughPrice")[nodeNum].childNodes[0].nodeValue;
    //
    gdc.product_price = gdc.product_price.split(" USD");
    gdc.product_price = gdc.product_price[0].split(".");
    gdc.product_price_dollar = gdc.product_price[0];
    gdc.product_price_cent = gdc.product_price[1];
    //
    gdc.product_strikethrough_price  = gdc.product_strikethrough_price.split(" USD");
    gdc.product_strikethrough_price  = gdc.product_strikethrough_price[0].split(".");
    gdc.productstrikethrough_price_dollar = gdc.product_strikethrough_price [0];
    gdc.productstrikethrough_price_cent = gdc.product_strikethrough_price [1];
    //
}

 function loadimages(){
    var _img = document.getElementById('bg');
    var newImg = new Image;
    newImg.onload = function() {
      _img.src = this.src;
      startAd()
    }
    newImg.src = xmlfeed.getElementsByTagName("ProductImage")[nodeNum].childNodes[0].nodeValue; 
 }
function startAd() {
    getDynamicContent();
    setupDom();
    creative.autoplay = true;
    addListeners();
    goAnimation();
 }

//Initializes the ad components:
function setupDom() {

  ///in - Auto shrink Title to fit a width and reposition 
  //gdc.Headline  += " dog libi banana dog libi banana treat"
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
          //myWidth = titleDiv.right - titleDiv.left
          myHeight = titleDiv.bottom - titleDiv.top;

          console.log('myHeight ='+ myHeight)
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
  creative.dollarOld = document.getElementById('dollarOld').innerHTML = gdc.product_price_dollar;
  creative.dollarOld = document.getElementById('dollarOld');
  creative.centOld = document.getElementById('centOld').innerHTML= gdc.product_price_cent;
  creative.centOld = document.getElementById('centOld')
  creative.strike = document.getElementById('strike')
  creative.dollarNew = document.getElementById('dollarNew').innerHTML= gdc.productstrikethrough_price_dollar;
  creative.centNew = document.getElementById('centNew').innerHTML= gdc.productstrikethrough_price_cent;
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
  creative.onEndframe = false;
  creative.onEndframeComplete = false;
  creative.rolloverAnimating = false;
  creative.blue = '#1877f2';
  creative.blue_rgb = "rgba(24,119,242,1)" 
  creative.grey = '#b1b1b1';
  creative.grey_rgb = "rgba(177,177,177,1)";
  creative.white = '#fff';
  creative.bg_scale = 1;
  creative.bg_mask_width = 160;
  creative.bg_mask_height = 160
  //
  //Reposition prices 
      var spacerY = 0 
      creative.priceNew.style.top = titleDiv.bottom + spacerY + 'px';
      creative.priceOld.style.top = titleDiv.bottom + spacerY + 'px';
      //
      var spacerX = 8
      var oldPriceWidth  = creative.priceOld.getBoundingClientRect();
      var newPriceWidth  = creative.priceNew.getBoundingClientRect();
      oldPriceWidth = oldPriceWidth.right - oldPriceWidth.left;
      newPriceWidth = newPriceWidth.right - newPriceWidth.left;
      totalPriceWidth = oldPriceWidth + spacerX + newPriceWidth;
      var newX = (bannerWidth - totalPriceWidth)/2 
      creative.priceOld.style.left = newX +'px'
      creative.priceNew.style.left = newX + oldPriceWidth + spacerX +'px';
  //Reposition prices - OUT

  createStrikeThrough( creative.strike, creative.priceOld)
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
  //  console.log('Exit to ' + clickTag);
  }

//------------------------------------------------------------------------------
// Animation 
//------------------------------------------------------------------------------
function goAnimation() {
    if(creative.onEndframe) return; 
    creative.onEndframe = true;
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
          ease:ease1
    })
    d+=0;
    TweenLite.to([creative.dollarOld,creative.centOld], 0.3, { 
          delay:d,
          // color :creative.grey_rgb,
          ease:ease1
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
