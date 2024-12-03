const divs=document.querySelectorAll('.tabbar div');

divs.forEach((item)=>{
    item.addEventListener('mouseover',function(e){
        let left=e.clientX - item.getBoundingClientRect().x;
        item.style.setProperty('--left', left+'px');
  })
})
