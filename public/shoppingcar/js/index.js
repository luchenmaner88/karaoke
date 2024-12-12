//#region 
// function UIGoods(g) {
//   this.data = g;
//   this.choose = 3;
// }

// //Calculate total price
// UIGoods.prototype.getTotalPrice = function () {
//   return this.data.price * this.choose;
// };

// //Check if item got selected
// UIGoods.prototype.isChoose = function () {
//   return this.choose > 0;
// };
//#endregion

/**
 * Write above codes with ES6
 */

class UIGoods{
    constructor(g){
        this.data = g;
        this.choose = 0;
    }

    getTotalPrice(){
        return this.data.price * this.choose
    }

    isChoose(){
        return this.choose > 0;
    }

    increase(){
        this.choose++
    }

    decrease(){
       
        if(this.choose === 0){
            return;
        }
        this.choose--;
        
    }
}

//data layer for entire UI
class UIData {
  constructor() {
    var uiGoods = [];
    goods.forEach((g) => {
      var uig = new UIGoods(g);
      uiGoods.push(uig);
    });

    this.uiGoods = uiGoods;
    this.deliveryThreshold = 30;
    this.deliveryPrice = 5;
  }

  getTotalPrice() {
    const initValue = 0;
    return this.uiGoods.reduce(
      (accumulator, currentItem) => accumulator + currentItem.getTotalPrice(),
      initValue
    );
 
  }

//Increase selected item number
  increase(index){
    this.uiGoods[index].increase();
  }

  //Decrease selected item number
  decrease(index){
    this.uiGoods[index].decrease();
  }
// Total up all the selected item numbers
  getTotalSelectedItemNumbers(){
 
    return this.uiGoods.reduce(
      (accumulator, currentItem) => accumulator + currentItem.choose,
      0
    );
  }

  hasGoodsInCar(){
    return this.getTotalSelectedItemNumbers() > 0
  }

  isCrossDeliveryThreshold(){
    return this.getTotalPrice() >= this.deliveryThreshold
    
  }
  
  isChoose(index){
    return this.uiGoods[index].isChoose;
  }
 
}


//UI layer , Control Dom
class UI{

  constructor(){
    this.uiData = new UIData();
    this.doms = {
      goodsContainer:document.querySelector(".goods-list"),
      deliveryPrice: document.querySelector(".footer-car-tip"),
      footerPay: document.querySelector(".footer-pay"),
      footerPaySpan:document.querySelector(".footer-pay span"),
      totalPrice:document.querySelector(".footer-car-total"),
      footerCar:document.querySelector(".footer-car"),
      footerCarBadge: document.querySelector(".footer-car-badge")

    }

    var carRect = this.doms.footerCar.getBoundingClientRect();
    console.log(carRect);
    var jumpTarget = {
      x: carRect.left + carRect.width / 2,
      y: carRect.top + carRect.height / 5,
    }

    this.jumpTarget = jumpTarget;

    this.createHTML();
    this.updateFooter();
    this.listenEvents();


  }

  //listen to all types of events
  listenEvents(){
    this.doms.footerCar.addEventListener("animationend",function(){
      console.log("over");
      //remove animate class, so next time, the animation will work again
      this.classList.remove("animate");
    })
  }

  //based on goods number to create div
  createHTML(){
     
    var html = '';
    
    this.uiData.uiGoods.forEach( (g,index) => {

    html += `<div class="goods-item">
          <img src="${g.data.pic}" alt="" class="goods-pic" />
          <div class="goods-info">
            <h2 class="goods-title">${g.data.title}</h2>
            <p class="goods-desc">
              ${g.data.desc}
            </p>
            <p class="goods-sell">
              <span>月售 ${g.data.sellNumber}</span>
              <span>好评率${g.data.favorRate}%</span>
            </p>
            <div class="goods-confirm">
              <p class="goods-price">
                <span class="goods-price-unit">￥</span>
                <span>${g.data.price}</span>
              </p>
              <div class="goods-btns">
                <i data-index="${index}" class="iconfont i-jianhao"></i>
                <span>${g.choose}</span>
                <i data-index="${index}" class="iconfont i-jiajianzujianjiahao"></i>
              </div>
            </div>
          </div>
        </div>
       `;
      
    });

    this.doms.goodsContainer.innerHTML = html;

  }

  increase(index){
    this.uiData.increase(index);
    this.updateGoodesItem(index);
    this.updateFooter();
    this.jump(index);
  }

  decrease(index){
    this.uiData.decrease(index);
    this.updateGoodesItem(index);
    this.updateFooter();
    this.jump(index);
  }

  //update single item dom for + or - 
  updateGoodesItem(index){
    var goodDom = this.doms.goodsContainer.children[index];
    if(this.uiData.isChoose(index)){
      goodDom.classList.add('active');
    }else{
      goodDom.classList.remove('active');
    }
    var span = goodDom.querySelector('.goods-btns span');
    span.textContent = this.uiData.uiGoods[index].choose;
  }

  //update shopping car , footer info
  updateFooter(){

    var total = this.uiData.getTotalPrice();
    this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`;

    if(this.uiData.isCrossDeliveryThreshold()){
      this.doms.footerPay.classList.add("active");
    }else{
      this.doms.footerPay.classList.remove("active");
      //show how much before you reach the threshold
      var dis = this.uiData.deliveryThreshold - total;
      dis = Math.floor(dis);
      this.doms.footerPaySpan.textContent = `还差￥${dis}元起送`;
    }

    //update total price
    this.doms.totalPrice.textContent = total.toFixed(2);

    if(this.uiData.hasGoodsInCar()){
      this.doms.footerCar.classList.add('active');
    }else{
      this.doms.footerCar.classList.remove('active');
    }

    //update badge value
    this.doms.footerCarBadge.textContent = this.uiData.getTotalSelectedItemNumbers();


  }


      //add animation for car 
    carAnimation(){
        this.doms.footerCar.classList.add("animate");
    }

    //animation for adding item to car
    jump(index){
       var btnAdd = this.doms.goodsContainer.children[index].querySelector(".i-jiajianzujianjiahao");
       var rect = btnAdd.getBoundingClientRect();
       var start = {
        x: rect.left,
        y: rect.top,
       };
       //start to jump
       var div = document.createElement('div');
       div.className = "add-to-car";
       var i = document.createElement('i');
       i.className = "iconfont i-jiajianzujianjiahao";

       div.style.transform = `translateX(${start.x}px)`;
       i.style.transform = `translateY(${start.y}px)`;
       div.appendChild(i);
       document.body.appendChild(div);

       //force re-rerendering . force reflow
       //if we don't force reflow here, the page will load with jumpTarget as final display point
       div.clientWidth;


       //reach to the target position

       div.style.transform=`translateX(${this.jumpTarget.x}px)`;
       i.style.transform=`translateY(${this.jumpTarget.y}px)`;

       var that = this;

       div.addEventListener("transitionend",function(){
        console.log('transition end');
        div.remove();
        that.carAnimation();
       },{
        once:true,
       });
    }


}

var ui = new UI()

ui.doms.goodsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("i-jiajianzujianjiahao")) {
    //self define an attribute to show the "index" of the parent element
    //using html5 data-* method
    var index = +e.target.dataset.index;
    ui.increase(index);
  } else if (e.target.classList.contains("i-jianhao")) {
    var index = +e.target.dataset.index;
    ui.decrease(index);
  }
});

