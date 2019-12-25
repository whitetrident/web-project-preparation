# 移动端一些 bug 处理收集及小技巧

### css 三角

[用纯 CSS 实现的箭头](http://ourjs.com/detail/532bc9f36922aa7e1d000001 '用纯CSS实现的箭头')

---

### css 做小叉

[CSS3 实现关闭按钮](http://blog.iderzheng.com/close-button-with-css-only/ 'CSS3实现关闭按钮')

---

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

---

### 在苹果手机上进入页面不能滑动

解决方法：将滑动事件放在图片加载完后执行

---

### 判断手机系统

#### 判断手机是否为安卓

```javascript
function isAndroid() {
  var u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
  }
}
```

#### 判断手机是否为苹果

```javascript
function isIphone() {
  var u = navigator.userAgent
  if (u.indexOf('iPhone') > -1) {
  }
}
```

---

### 适应居中

#### 父元素定位,然后子元素：

```css
 {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
```

#### 直接子元素定位利用margin(子元素有高宽且小于父元素)

```css
{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 200px;
  height: 100px;
  margin: auto;
}

```

#### 直接子元素定位偏移

```css
 {
  position: relative;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
```

_注意，如果是绝对定位或者固定定位跟父元素同宽，那么水平居中使用 left: 50%;transform: translate(-50%, -50%);的方式，左边会有 1px 的缝隙对不齐，这时候应该_

```css
 {
  left: auto;
  right: auto;
}
```

或者

```css
 {
  transform: translateY(0);
}
```


---

### 点击事件不灵敏

层的关系,加层级

---

### 去除按钮蓝色边框

```css
a,
button,
input,
textarea,
span,
div,
em,
i,
img {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent; /* For some Androids */
  outline: none;
  -moz-outline-style: none;
  -webkit-user-select: none; /*用户不可选中元素的内容*/
}
```

---

### 做遮罩层出现滑动遮罩 body 跟着一起动的问题:滑动穿透

**解决方法:**

```css
body.bodyCls {
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

---

### 打印系统内核

```javascript
/*
		 * 智能机浏览器版本信息:
		 */
var browser = {
  versions: (function() {
    var u = navigator.userAgent,
      app = navigator.appVersion
    return {
      //移动终端浏览器版本信息
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
    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

document.writeln('语言版本: ' + browser.language + '</br>')
document.writeln(' 是否为移动终端: ' + browser.versions.mobile + '</br>')
document.writeln(' ios终端: ' + browser.versions.ios + '</br>')
document.writeln(' android终端: ' + browser.versions.android + '</br>')
document.writeln(' 是否为iPhone: ' + browser.versions.iPhone + '</br>')
document.writeln(' 是否iPad: ' + browser.versions.iPad + '</br>')
document.writeln(navigator.userAgent)
```

---

### 移动端兼容

```css
a,
img {
  -webkit-touch-callout: none; /*禁止长按链接与图片弹出菜单*/
}

html,
body {
  -webkit-user-select: none; /*禁止选中文本*/
  user-select: none;
}

button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /*去掉webkit默认的表单样式*/
}

a,
button,
input,
optgroup,
select,
textarea {
  -webkit-tap-highlight-color: rgba(
    0,
    0,
    0,
    0
  ); /*去掉a、input和button点击时的蓝色外边框和灰色半透明背景*/
}

input::-webkit-input-placeholder {
  color: #ccc; /*修改webkit中input的planceholder样式*/
}

input:focus::-webkit-input-placeholder {
  color: #f00; /*修改webkit中focus状态下input的planceholder样式*/
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

---

### 上传文件

```html
<input type=file accept="image/*">
```

上面的文件上传框中，accept 可以限制上传文件的类型，参数为 image/_ 是所有图片类型，点击会弹出图库，也可以指定图片格式，参数设置成 image/png 则可以限制图片类型为 png；参数如果为 video/_ 则是选择视频的意思；accept 还可以设置多个文件格式，语法为 accept="image/gif, image/jpeg" ；

---

### 强制输入框数字

两种都可以，苹果两个都会强制数字键盘

```html
<!--安卓微信端可以,安卓移动端低版本不行-->
<input type="number" pattern="[0-9]*" placeholder="请输入qq号">

<!--安卓无论微信还是移动端低版本（uc为例，谷歌40）都可以-->
<input type="tel" onkeyup="this.value=this.value.replace(/\D/g,'')" >
```

---

### 使用 box-shadow 改变(挡住)表单自动填充后的黄色

```css
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  box-shadow: inset 0 0 0 1000px #fff;
}
```

---

### ios 的 input 设 disabled 之后文字颜色变灰

```css
input:disabled {
  opacity: 1;
  color: #333;
  -webkit-text-fill-color: #333;
}
```

---

### 获取 url？后面的参数

```javascript
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
```

---

### 获取 audio 是否加载完毕 并获取 audio 的时间获取 audio 是否加载完毕 并获取 audio 的时间

```javascript
var aud = document.getElementById('myAudio')
aud.onended = function() {
  var time = Math.floor(aud.duration)
  alert(time)
}
```

---

### 滚动条样式

```css
::-webkit-scrollbar {
  width: 1px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0);
}
```

---

### 苹果微信点击失效：加样式 cursor：point 或者改成 a 标签，或者加上 onclick 属性（不写行内，加上这个属性就行）,

经测试

_1、原生 js，通过遍历，原始事件模型方式（对，就是 onclick），这种方式的（非常非常傻又效率低的方式），不会失效，其实就是把点击事件当属性给了 dom 节点，只不过是在 script 标签内在写脚本而已；_

_2、原生 js，遍历，dom2 事件模型（addEventListener）注册，不会失效，较上一种要好；_

_3、原生 js，事件委托到父元素身上，通过 e.target 注册（addEventListener）上事件,相当强大最值得推荐的方式，效率高，视绑定的元素而定，一般不会失效，如果绑定到 document 上会失效，可通过上方解决方法解决；_

_4、jq，选择器直接绑定要绑定的元素身上，click 方法，不会失效，但比标签 onclick 属性的事件触发要晚；_

_5、jq，选择器直接绑定要绑定的元素身上，on 方法 click，不会失效；_

_6、jq，on 方法事件委托到父元素身上，失效情况同测试 3，比较推荐_

---

### 圆角 bug

某些 Android 手机圆角失效

```css
 {
  background-clip: padding-box;
}
```

---

### css3 实现边框 1px

_原理是把原先元素的 border 去掉，然后利用 :before 或者 :after 重做 border ，并 transform 的 scale 缩小一半，原先的元素相对定位，新做的 border 绝对定位_

**单条 border**

```css
.oneBorder {
  position: relative;
  border: none;
}
.oneBorder::after {
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
.fourBorder {
  position: relative;
  border: none;
}
.fourBorder {
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
if (window.devicePixelRatio && devicePixelRatio >= 2) {
  document.querySelector('...').classList.add('oneBorder')
}
```

可以支持圆角，唯一的一点小缺陷是 <td> 用不了。

---

### 如动画过程有闪烁（通常发生在动画开始的时候），可以尝试下面的 Hack：

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

---

### input 的 placeholder 会出现文本位置偏上的情况：

PC 端设置 line-height 等于 height 能够对齐，而移动端仍然是偏上，解决是设置 line-height：normal，（stackoverflow 也可查到这种解决办法）。

---

### input 使用定位后苹果上 placeholder 显示不全：

设置 line-height：1em

---

### input 类型为 date 情况下不支持 placeholder

解决方法：

```html
<input placeholder="Date" class="textbox-n" type="text" onfocus="(this.type='date')"  id="date">
```

_因为 text 是支持 placeholder 的。因此当用户 focus 的时候自动把 type 类型改变为 date，这样既有 placeholder 也有 datepicker 了_

---

### 消除 transition 闪屏

两个方法：使用 css3 动画的时尽量利用 3D 加速(使用 translate3d 设置或者 translateZ 都可以开启)，从而使得动画变得流畅。动画过程中的动画闪白可以通过 backface-visibility 隐藏。

_另，为了动画更流畅，有动画的结构最好是定位，记得加上层级!_

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

@-webkit-keyframes 需要以 0%开始 100%结束，0%的百分号不能去掉。

after 和 before 伪类无法使用动画 animation。

border-radius 不支持%单位。

translate 百分比的写法和 scale 在一起会导致失效，例如-webkit-transform: translate(-50%,-50%) scale(-0.5, 1)。

### android 4.x bug

三星 Galaxy S4 中自带浏览器不支持 border-radius 缩写。

同时设置 border-radius 和背景色的时候，背景色会溢出到圆角以外部分。

部分手机(如三星)，a 链接支持鼠标:visited 事件，也就是说链接访问后文字变为紫色。

android 无法同时播放多音频 audio。

---

### fixed bug

ios 下 fixed 元素容易定位出错，软键盘弹出时，影响 fixed 元素定位。

android 下 fixed 表现要比 iOS 更好，软键盘弹出时，不会影响 fixed 元素定位。

ios4 下不支持 position:fixed。

解决方案可用 isroll.js，暂无完美方案

---

### 播放视频不全屏

1.目前只有 ios7+、winphone8+支持自动播放 2.支持 Airplay 的设备（如：音箱、Apple TV)播放
x-webkit-airplay="true" 3.播放视频不全屏，ios7、、winphone8+支持，部分 android4+支持（含华为、小米、魅族）
webkit-playsinline="true"
4.ios 10 : playsinline
5.ios 8、9 ：https://github.com/bfred-it/iphone-inline-video

```html
<video x-webkit-airplay="true" webkit-playsinline="true" preload="auto" autoplay src="http://"></video>
<video playsinline preload="auto" autoplay src="http://"></video>
```

---

### 手机 web 禁止微信调整字体

微信浏览器缩放以及分享靠的都是是微信浏览器 WeixinJSBridge 接口，android 禁止微信浏览器调整字体大小代码如下：

```javascript
;(function() {
  if (
    typeof WeixinJSBridge == 'object' &&
    typeof WeixinJSBridge.invoke == 'function'
  ) {
    handleFontSize()
  } else {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', handleFontSize)
      document.attachEvent('onWeixinJSBridgeReady', handleFontSize)
    }
  }
  function handleFontSize() {
    /*设置网页字体为默认大小*/
    WeixinJSBridge.invoke('setFontSizeCallback', {
      fontSize: 0
    }) /*重写设置网页字体大小的事件*/
    WeixinJSBridge.on('menu:setfont', function() {
      WeixinJSBridge.invoke('setFontSizeCallback', {
        fontSize: 0
      })
    })
  }
})()
```

在 ios 端禁止微信调整字体大小，可用 css 控制在 css 中加入

```css
body {
  -webkit-text-size-adjust: 100% !important;
}
```

---

### ios 或者安卓使用默认数字键盘：

input type 设 tel

---

### CSS 实现隐藏滚动条同时又可以滚动

```css
.element::-webkit-scrollbar {
  display: none;
}
```

---

### 解决 ios 触摸滑动卡顿：

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
#mask {
  -webkit-transition: opacity 0.5s ease, visibility 0.5s ease;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  opacity: 0;
  visibility: hidden;
}
#mask.show {
  opacity: 1;
  visibility: visible;
}
#filterBlock {
  -webkit-transform: translate3d(0%, 0, 0);
  transform: translate3d(0%, 0, 0);
  -webkit-transition: -webkit-transform 0.25s ease;
  transition: -webkit-transform 0.25s ease;
  transition: transform 0.25s ease;
  transition: transform 0.25s ease, -webkit-transform 0.25s ease;
}
#filterBlock.show {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
```

---

### 不需要 js 实现，css 实现宽高相等

```css
.wrap {
  width: 50%;
  margin: 0 auto;
}
.box {
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

### css 实现文字垂直排列

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
  *float: right;
}
```

---

### 单行写一个评级组件

```javascript
"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);定义一个变量rate是1到5的值，然后执行上面代码
```

---

### input 等输入框文本不能居右（如 date）或者设置 textalight:right 后文本可拖动情况,但是光标也会靠左显示

```css
 {
  direction: rtl;
}
```

---

### 滑动盒子

```css
div {
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  font-size: 0;
}
a {
  display: inline-block;
  font-size: 16px;
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

[去除 inline-block 元素间间距的 N 种方法](http://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/ '去除inline-block元素间间距的N种方法')

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

---

### 使用 flex 来设置盒子同行等宽

这种通常做法是使用浮动+宽百分比，用 flex 也是简单

```css
.list {
  flex-wrap: wrap;
  display: flex;
}
.item {
  min-width: 1px;
  flex: 0 0 50%;
}
```

注意必须设个宽，flex 的最后一项 flex-basis（伸缩基准值）才会有效，这里无论设 width 或者 min-width 都行，min-width 能兼容到火狐

---

### 安卓低版本 flex 的子元素必须块级

---

### 控制台打印增加样式

不懂的学习下 es6 的模板字符串

```js
console.log(
  `%c 新的商城 %c ${new Date()} %c`,
  'background:#1a191e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff; font-size:30px',
  'background:#bea474 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff; font-size:30px',
  'background:transparent'
)
```

---

### 解决 ios 跳转出去，点击返回页面不刷新的问题

```js
// 解决ios跳转出去，点击返回页面不刷新的问题
var isPageHide = false
window.addEventListener('pageshow', function() {
  if (isPageHide) {
    window.location.reload()
  }
})
window.addEventListener('pagehide', function() {
  isPageHide = true
})
```

---

### 解决同一元素上圆角与transform共存导致的白边

```css
-webkit-mask-image: -webkit-radial-gradient(white, black);
```
