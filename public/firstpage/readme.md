# Short Cut

#### add new line after
Ctrl + enter       
#### add a new line before
Ctrl + Shift + enter
#### number parameter
```
h$*6{$Sample}

(a*6>smaple)+p>lorem1000
```
#### place holder, random static content with given number 
lorem, lorem1, lorem1000, lorem#NUMBER


# Element

#### pre 
display original format. will not fold any pace

# HTML Character entity
https://www.freeformatter.com/html-entities.html

&gt; &lt; &amp;
#### Usage of Element <a>
```
<a href="www.google.com"></a>
<a href="localPage.html#DomId"></a>
<a href="javascript:alert("hello")"></a>
<a href="mailto:xxxx@gmail.com"></a>
<a href="tel:4563493842"></a>
<a href="", target="_self" title="this is the tooltip"></a> ---Cover original window
<a href="", target="_blank"></a>---Open new window 
```

#### Usage of Element <img>
<figure> to wrap around the img information
<a> to add url

```
<figure>
<a>
<img usemap="#solarMap">
</a>#
<figurecaption>
<h2><h2>
</figurecaption>

</figure>

<map name="solarMap">
   <area>
</map>
```


# Usage of Element <video> <audio>

boolean atribute: 
controls,  autoplay,  muted 

#### <ol reverse>
using css list-type-style to display 
#### <ul>
#### <dl><dt><dd>  Definition
```
<dl>
<dt></dt>
<dd></dd>
</dl>
```
#### container element
<header><footer><article><section><aside>


#### selector, attribute selector , priority

space between: descendent element

the narrower scope selector , it has a higher priority  (xxxx)
style link (1xxx)
id selector(11xx)
class, pseudo class selector(111x)
element, pseudo element (1111)       

in the css. write the <a> preudo-class with the following order:
link>visited>hover>active     

#### row element , effect row sytle, won't effect height and width, need to convert to block element     

#### two element adjacent, if the edge is directly aligned to each other, then the second margion won't work. we can add a border for first element to separate the aligned situation or in the first element ,we can use padding 
```
.parent{
    width: 300px;
    height: 300px;
    background-color: blue;
   ++ padding-top: 10px;
   OR
   ++ border:1px solid;
}

.child{
    width: 100px;
    height: 100px;
    background-color: red;
}

<div class="parent">
  <div class="child"></child>
</div>
```
#### child floating element , height collaspe
consider to use clearfix css in parent element
```
clearfix::after{
  content:"";
  display:block;
  clear:both;
}
```   

#### layout an element to center of parents, pop-out window
```
<div class="modal">
   <div class="container"></>
</div>

.modal{
  position:fixed;
  weight:100%;
  height:100%;
}

.container{
  position:absolute;
  top:0;
  left:0;
  right:0;
  button:0;
  margin:auto;
  box-sizing:border-box;
}
```    

#### css selector combination

space  all the child elements of parent
eg: div p ==> select all the p under div

nospace select the combination selectors

+select the immediate sibling

~select sblings not direct precedent


#### line-height
if there is no unit, then inherit first from parent and then calculate
if there is unit, then calculate first  then inherit

```
body{
font-size: 12px
}
.container{
line-height:2em
}
p{
font-size:40 px
==> line-height: 24px
}

.container{
line-height:2
}
p{
font-size:40 px
==> line-height: 80px
}



<body>
<div class="container">
<p><p>
</div>
</body>
```
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   autoplay, muted, loop


