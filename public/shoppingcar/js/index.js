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
      totalPrice:document.querySelector(".footer-car-total")

    }
    this.createHTML();
    this.updateFooter();
  }

  //based on goods number to create div
  createHTML(){
     
    var html = '';
    
    this.uiData.uiGoods.forEach( g => {

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
                <i class="iconfont i-jianhao"></i>
                <span>${g.choose}</span>
                <i class="iconfont i-jiajianzujianjiahao"></i>
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
  }

  decrease(index){
    this.uiData.decrease(index);
    this.updateGoodesItem(index);
    this.updateFooter();
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

  }

}

var ui = new UI()
