# 移动端一些bug处理收集及小技巧

### css批量命令行加前缀兼容
[css批量命令行加前缀兼容](https://github.com/whitetrident/css-hack "css批量命令行加前缀兼容")

---

### css三角
[用纯CSS实现的箭头](http://ourjs.com/detail/532bc9f36922aa7e1d000001 "用纯CSS实现的箭头")

------------


### css做小叉
[CSS3实现关闭按钮](http://blog.iderzheng.com/close-button-with-css-only/ "CSS3实现关闭按钮")

------------

### 文字溢出显示省略号

#### 单行(pc、移动端都可)
```css
{
	text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
```

#### 多行（移动端大部分）

```css
{
	word-break: break-all;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2; //改成需要的行数
	-webkit-box-orient: vertical;
}
```

------------

### 在苹果手机上进入页面不能滑动
解决方法：将滑动事件放在图片加载完后执行

------------

### 判断手机系统
#### 判断手机是否为安卓

```javascript
function isAndroid(){
    var u = navigator.userAgent;
    if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
    }
}
```
#### 判断手机是否为苹果
```javascript
function isIphone(){
    var u = navigator.userAgent;
    if (u.indexOf('iPhone') > -1) {
    }
}
```

------------

### 适应居中
#### 父元素定位,然后子元素：
```css
{
	position: absolute; left: 50%; top: 50%; 
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%,-50%);
}
```

#### 直接子元素定位
```css
{
	position: relative; left: 50%; top: 50%; 
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%,-50%);
}
```

------------

### 点击事件不灵敏  
层的关系,加层级

------------

### 去除按钮蓝色边框
```css
a,button,input,textarea,span,div,em,i,img{-webkit-tap-highlight-color: rgba(0,0,0,0);
-webkit-tap-highlight-color: transparent; /* For some Androids */
 outline: none;
 -moz-outline-style: none;
 -webkit-user-select: none;/*用户不可选中元素的内容*/
}
```

------------

### 做遮罩层出现滑动遮罩body跟着一起动的问题:滑动穿透
**解决方法:**
```css
body.bodyCls{
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}
```
```javascript
//记录值
var scrollTop;
需要阻止滑动穿透的时候（遮罩层弹出）：
scrollTop = document.scrollingElement.scrollTop;
document.body.classList.add(bodyCls);
document.body.style.top = -scrollTop + 'px';
遮罩层隐藏后：
document.body.classList.remove(bodyCls);
document.scrollingElement.scrollTop = scrollTop;
```

------------

### 打印系统内核
```javascript
/* 
		 * 智能机浏览器版本信息: 
		 */
		var browser = {
			versions: function() {
				var u = navigator.userAgent,
					app = navigator.appVersion;
				return { //移动终端浏览器版本信息  
					trident: u.indexOf('Trident') > -1, //IE内核  
					presto: u.indexOf('Presto') > -1, //opera内核  
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
					mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端  
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
					iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器  
					iPad: u.indexOf('iPad') > -1, //是否iPad  
					webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
				};
			}(),
			language: (navigator.browserLanguage || navigator.language).toLowerCase()
		}

		document.writeln("语言版本: " + browser.language + '</br>');
		document.writeln(" 是否为移动终端: " + browser.versions.mobile + '</br>');
		document.writeln(" ios终端: " + browser.versions.ios + '</br>');
		document.writeln(" android终端: " + browser.versions.android + '</br>');
		document.writeln(" 是否为iPhone: " + browser.versions.iPhone + '</br>');
		document.writeln(" 是否iPad: " + browser.versions.iPad + '</br>');
		document.writeln(navigator.userAgent);
```

------------

```css
a, img {
    -webkit-touch-callout: none; /*禁止长按链接与图片弹出菜单*/
}

html, body {
    -webkit-user-select: none; /*禁止选中文本*/
    user-select: none;
}

button,input,optgroup,select,textarea {
    -webkit-appearance:none; /*去掉webkit默认的表单样式*/
}

a,button,input,optgroup,select,textarea {
    -webkit-tap-highlight-color:rgba(0,0,0,0); /*去掉a、input和button点击时的蓝色外边框和灰色半透明背景*/
}

input::-webkit-input-placeholder {
    color:#ccc; /*修改webkit中input的planceholder样式*/
}

input:focus::-webkit-input-placeholder {
    color:#f00; /*修改webkit中focus状态下input的planceholder样式*/
}

input::-webkit-input-speech-button {
    display: none; /*隐藏Android的语音输入按钮*/
}

```

```html
<a href="tel:020-10086">打电话给:020-10086</a>
<a href="sms:10086">发短信给: 10086</a>
<a href="mailto:me@22278.club">发送邮件: me@22278.club</a>
```

------------

### 上传文件

```html
<input type=file accept="image/*">
```
上面的文件上传框中，accept 可以限制上传文件的类型，参数为 image/* 是所有图片类型，点击会弹出图库，也可以指定图片格式，参数设置成 image/png 则可以限制图片类型为png；参数如果为 video/* 则是选择视频的意思；accept 还可以设置多个文件格式，语法为 accept="image/gif, image/jpeg" ；

------------

### 强制输入框数字
两种都可以，苹果两个都会强制数字键盘
```html
<!--安卓微信端可以,安卓移动端低版本不行-->
<input type="number" pattern="[0-9]*" placeholder="请输入qq号">

<!--安卓无论微信还是移动端低版本（uc为例，谷歌40）都可以-->
<input type="tel" onkeyup="this.value=this.value.replace(/\D/g,'')" >
```

---
### 使用box-shadow改变(挡住)表单自动填充后的黄色

```css
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
    box-shadow:inset 0 0 0 1000px #fff;
}
```
------------

### 获取url？后面的参数
```javascript
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
```

------------

### 获取audio是否加载完毕 并获取audio的时间获取audio是否加载完毕 并获取audio的时间
```javascript
var aud = document.getElementById("myAudio");
    aud.onended = function() {
        var time = Math.floor(aud.duration);
        alert(time)
    };
```

------------

### 滚动条样式

```css
::-webkit-scrollbar {
    width: 1px;
}
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0,0,0,0);
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
}
::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255,0,0,0);
}
```

------------

### 苹果微信点击失效：加样式cursor：point或者改成a标签，或者加上onclick属性（不写行内，加上这个属性就行）,
经测试

*1、原生js，通过遍历，原始事件模型方式（对，就是onclick），这种方式的（非常非常傻又效率低的方式），不会失效，其实就是把点击事件当属性给了dom节点，只不过是在script标签内在写脚本而已；*

*2、原生js，遍历，dom2事件模型（addEventListener）注册，不会失效，较上一种要好；*

*3、原生js，事件委托到父元素身上，通过e.target注册（addEventListener）上事件,相当强大最值得推荐的方式，效率高，视绑定的元素而定，一般不会失效，如果绑定到document上会失效，可通过上方解决方法解决；*

*4、jq，选择器直接绑定要绑定的元素身上，click方法，不会失效，但比标签onclick属性的事件触发要晚；*

*5、jq，选择器直接绑定要绑定的元素身上，on方法click，不会失效；*

*6、jq，on方法事件委托到父元素身上，失效情况同测试3，比较推荐*

------------

### 圆角bug
某些Android手机圆角失效
```css
{
	background-clip: padding-box;
}
```

------------

### css3实现边框1px

*原理是把原先元素的 border 去掉，然后利用 :before 或者 :after 重做 border ，并 transform 的 scale 缩小一半，原先的元素相对定位，新做的 border 绝对定位*


**单条 border**

```css
.oneBorder{
    position: relative;
    border:none;
}
.oneBorder::after{
    content: '';
    position: absolute;
    left: 0;
    background: #000;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
}
```
**四条 border**
```css

.fourBorder{
    position: relative;
    border:none;
}
.fourBorder{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
}
```
样式使用的时候，也要结合 JS 代码，判断是否 Retina 屏
```javascript
if(window.devicePixelRatio && devicePixelRatio >= 2){
    document.querySelector('...').classList.add('oneBorder');
}
```
可以支持圆角，唯一的一点小缺陷是 <td> 用不了。

------------

### 如动画过程有闪烁（通常发生在动画开始的时候），可以尝试下面的Hack：

```css
{
	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	-ms-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-perspective: 1000;
	-moz-perspective: 1000;
	-ms-perspective: 1000;
	perspective: 1000;
}

```

------------

### input 的placeholder会出现文本位置偏上的情况：
PC端设置line-height等于height能够对齐，而移动端仍然是偏上，解决是设置line-height：normal，（stackoverflow也可查到这种解决办法）。

### input使用定位后苹果上placeholder显示不全：
设置line-height：1em

---

### input类型为date情况下不支持placeholder
解决方法：
```html
<input placeholder="Date" class="textbox-n" type="text" onfocus="(this.type='date')"  id="date">
```
*因为text是支持placeholder的。因此当用户focus的时候自动把type类型改变为date，这样既有placeholder也有datepicker了*

------------


### 消除transition闪屏
两个方法：使用css3动画的时尽量利用3D加速(使用translate3d设置或者translateZ都可以开启)，从而使得动画变得流畅。动画过程中的动画闪白可以通过 backface-visibility 隐藏。

*另，为了动画更流畅，有动画的结构最好是定位，记得加上层级!*
```css
{
	/*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
	-webkit-transform-style: preserve-3d;
}
```

```css
{
	/*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/
	-webkit-backface-visibility: hidden;
}

```



---

### android 2.3 bug
@-webkit-keyframes 需要以0%开始100%结束，0%的百分号不能去掉。

after和before伪类无法使用动画animation。

border-radius不支持%单位。

translate百分比的写法和scale在一起会导致失效，例如-webkit-transform: translate(-50%,-50%) scale(-0.5, 1)。


### android 4.x bug
三星 Galaxy S4中自带浏览器不支持border-radius缩写。

同时设置border-radius和背景色的时候，背景色会溢出到圆角以外部分。

部分手机(如三星)，a链接支持鼠标:visited事件，也就是说链接访问后文字变为紫色。

android无法同时播放多音频audio。

---

### fixed bug
ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位。

android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位。

ios4下不支持position:fixed。

解决方案
可用isroll.js，暂无完美方案

---

### 播放视频不全屏

1.目前只有ios7+、winphone8+支持自动播放
2.支持Airplay的设备（如：音箱、Apple TV)播放
x-webkit-airplay="true" 
3.播放视频不全屏，ios7、、winphone8+支持，部分android4+支持（含华为、小米、魅族）
webkit-playsinline="true" 
4.ios 10 : playsinline
5.ios 8、9 ：https://github.com/bfred-it/iphone-inline-video

```html
<video x-webkit-airplay="true" webkit-playsinline="true" preload="auto" autoplay src="http://"></video>
<video playsinline preload="auto" autoplay src="http://"></video>
```

---

### 手机web禁止微信调整字体
微信浏览器缩放以及分享靠的都是是微信浏览器WeixinJSBridge接口，android禁止微信浏览器调整字体大小代码如下：
```javascript
(function () {
　　if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
　　handleFontSize();
　　} else {
　　if (document.addEventListener) {
　　　　document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
　　} else if (document.attachEvent) {
　　　　document.attachEvent("WeixinJSBridgeReady", handleFontSize);
　　　　document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
　　}
}
function handleFontSize() {
　　/*设置网页字体为默认大小*/
　　WeixinJSBridge.invoke('setFontSizeCallback', {
　　'fontSize': 0
　　});
　　/*重写设置网页字体大小的事件*/
　　WeixinJSBridge.on('menu:setfont', function () {
　　　　WeixinJSBridge.invoke('setFontSizeCallback', {
　　　　　　'fontSize': 0
　　　　});
　　});
　　}
})();
```
在ios端禁止微信调整字体大小，可用css控制
在css中加入
```css
body{-webkit-text-size-adjust: 100% !important;}
```

---

### ios或者安卓使用默认数字键盘：
input type设tel

---

### CSS 实现隐藏滚动条同时又可以滚动
```css
.element::-webkit-scrollbar {display:none}
```
---

### 解决ios触摸滑动卡顿：
```css
{
/*允许独立的滚动区域和触摸回弹(ios的橡皮筋效果)*/
	-webkit-overflow-scrolling: touch; 
}
```

---

### 安卓弹出层动画卡顿:
这种情况，找那些没有经过加密混淆的大牌网站，观察下他们的效果啊，这是京东的方案,类名控制
```css
/*遮罩,定位的我就不写了*/
#mask{
	-webkit-transition: opacity .5s ease,visibility .5s ease;
	transition: opacity .5s ease,visibility .5s ease;
	opacity: 0;
	visibility: hidden;
}
#mask.show{
	opacity: 1;
	visibility: visible;
}
#filterBlock{
	-webkit-transform: translate3d(0%, 0, 0);
	transform: translate3d(0%, 0, 0);
	-webkit-transition: -webkit-transform .25s ease;
	transition: -webkit-transform .25s ease;
	transition: transform .25s ease;
	transition: transform .25s ease, -webkit-transform .25s ease;
}
#filterBlock.show{
	-webkit-transform: translate3d(100%, 0, 0);
	transform: translate3d(100%, 0, 0);
}
```

---
### 不需要js实现，css实现宽高相等

```css
.wrap{
	width: 50%;
	margin: 0 auto;
	}
.box{
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	background: url(pic_quark_1503812032847.jpg) no-repeat center;
	background-size: cover;
}
```
```html
<div class="wrap">
	<div class="box">
	<!--这里用的背景图，image也是可以的-->
	</div>
</div>
```
---
### css实现文字垂直排列
```html
<div class="verticle-mode">
    <h4>咏柳</h4>
    <p>碧玉妆成一树高，<br>万条垂下绿丝绦。<br>不知细叶谁裁出，<br>二月春风似剪刀。</p>
</div>
```
```css
.verticle-mode {
    writing-mode: tb-rl;
    -webkit-writing-mode: vertical-rl;      
    writing-mode: vertical-rl;
}
/* IE7比较弱，需要做点额外的动作 */
.verticle-mode {
    *width: 120px;
}
.verticle-mode h4,
.verticle-mode p {
    *display: inline;
    *writing-mode: tb-rl;
}
.verticle-mode h4 {
    *float:right;
}
```
---
### 单行写一个评级组件
```javascript
"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);定义一个变量rate是1到5的值，然后执行上面代码
```
---
### input等输入框文本不能居右（如date）或者设置textalight:right后文本可拖动情况,但是光标也会靠左显示
```css
{
	direction: rtl;
}
```
---
### 滑动盒子
```css
div{
	overflow-x: scroll;
	overflow-y: hidden;
	-webkit-overflow-scrolling: touch;
	white-space: nowrap;
	font-size: 0;
	-webkit-text-size-adjust: none;
}
a{
	display: inline-block;
	height: 100%;
	line-height: 50px;
	font-size: 16px;
	box-sizing: border-box;
	padding: 0 10px;
	text-align: center;
	border: 1px solid black;
	/*解决ios端行内块出现的不对齐*/
	vertical-align: top;
}
```
```html
<div>
	<a href="javascript:void(0);">推荐</a>
	<a href="javascript:void(0);">推荐</a>
	<a href="javascript:void(0);">推荐</a>
	<a href="javascript:void(0);">推荐</a>
	<a href="javascript:void(0);">推荐</a>
	<a href="javascript:void(0);">推荐</a>
	<a href="javascript:void(0);">推荐</a>
	<a href="javascript:void(0);">推荐</a>
	<a href="javascript:void(0);">推荐</a>
	<a href="javascript:void(0);">推荐</a>
	<a href="javascript:void(0);">推荐</a>
	<a href="javascript:void(0);">推荐</a>
</div>
```
---
### 解决行内块换行的间距
[去除inline-block元素间间距的N种方法](http://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/ "去除inline-block元素间间距的N种方法")

---
### 文字排版
```css
{
	/*内容在边界内换行,不截断英文单词换行*/
	word-wrap: break-word;
	/* 单词内换行，如果想让长单词不换行用break-word */
	word-break: break-all;
	/* 保留空白符跟换行，某些需要保持排版的需要，编辑文章什么的 */
	white-space: pre-wrap;
}
```
