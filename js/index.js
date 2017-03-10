/**
 * Created by Administrator on 2017/2/21.
 */
// 阻止Y轴滑动条
document.documentElement.style.overflowY = 'hidden';
document.documentElement.style.overflowX = 'hidden';
var option = document.getElementById('option')
var options = option.children;
var page = document.getElementsByClassName('page');
var h=page[0].offsetHeight;
var w=page[0].offsetWidth;

////原生js使用offsetHeight、scrollHeight、clientHeight。offsetHeight包括border
console.log(options[0].offsetHeight);
console.log(options[0].scrollHeight);
console.log(options[0].clientHeight);
//
////jquery使用height、innerHeight不包括border。outerHeight包括border
console.log($(options[0]).height());
console.log($(options[0]).innerHeight());
console.log($(options[0]).outerHeight());
//offset()也是jquery的方法，求其top与left
console.log($(page).offset());

//点击效果
for(var i= 0;i<options.length;i++){
	that=options[i].index=i;
	options[i].onclick=function(){

        zindex++
       //由水平滑动转向点击事件时的初始化。
        $('#box').animate({top:-(num*h)},0)
       //由水平滑动转向点击事件时的初始化，即让下面的盒子显示出来。
        $('#box').css('z-index',zindex)
        //点击运动函数
		    $('#box').animate({top:-this.index*h},500,function(){
             });
       for(var i=0;i<5;i++){
          $('ul>li')[i].style.zIndex=zindex-1;
       }
        //竖直切换为水平后立刻点击按钮，会导致水平图片保存有高度及渐变属性这样下次切换到他时
        //会造成动画效果异样，所以设水平图片宽高应为0，没有渐变属性
         $('ul>li:nth-Child('+(num-0+1)+'').css({'width':'0','height':'0'})
         $('ul>li:nth-Child('+(num-0+1)+'').css('transition','')

        //对num进行初始化
        num=this.index
	}
}
//整屏滚动效果
var n=0,
num=0;
 onmousewheel=function(e){
 	n++;
 	if(e.wheelDelta){//IE/Opera/Chrome
		if(e.wheelDelta==120)
		{if(n&&n<2){
            if(num>0){
                num--
            }else{
                num
            }
                $('#box').animate({top:-num*h},500,function(){
                    return n=0;
                })
             }
		}else
		{
			console.log(n)
             if(n&&n<2){
                if(num<=3){
                    num++
                }else{
                    num;
                }
                $('#box').animate({top:-num*h},500,function(){
                    return n=0;
                })
             }

		}
}
}

//触屏上下滑动效果
var starty=0,
    movey=0,
    ismove=false,
    distance=0;
$('#box')[0].addEventListener('touchstart',function(e){
     // ismove=true;
     starty=e.touches[0].clientY;
});
$('#box')[0].addEventListener('touchmove',function(e){
    ismove=true;
    movey=e.touches[0].clientY;
    distance=movey-starty;
    var target=num*h-distance;
      if(distance<0){
         if(num==4){
             target=num*h;
         }
      }else{
         if(num==0){
             target=num*h;
         }
    }
       $('#box').animate({top:-(target)},0)
})

$('#box')[0].addEventListener('touchend',function(){
   if(ismove&&Math.abs(distance)>(h/6)){
    //解决竖直滑动时的边界问题
      if(distance>0){
         num--;
         if(num==-1){
            num=0
         }
      }else{
        num++;
        if(num==5){
            num=4;
        }
      }
   }else{
      num;
   }
   $('#box').animate({top:-(num*h)},500,function(){
   })

   //水平滑动事件
   if(Math.abs(distancex)>Math.abs(distance)&&Math.abs(distancex)>30){
      zindex++;
      //处理竖直变水平时1、5的边界问题
      if(distancex>0&&num!=0){
        num--;
        $('ul>li:nth-Child('+(num-0+1)+')').css('transition','all linear .5s');
        $('ul>li:nth-Child('+(num-0+1)+')').css({'z-index':zindex,'width':'100%','height':'100%','left':'0','top':'0'});
      }else if(distancex<0&&num!=4){
        num++
        $('ul>li:nth-Child('+(num-0+1)+')').css('transition','all linear .5s');
        $('ul>li:nth-Child('+(num-0+1)+')').css({'z-index':zindex,'width':'100%','height':'100%','left':'0','top':'0'});
      }

    }
     ismove=false;
})

//触屏左右滑动(由竖直转换为水平)
var startx=0,
    movex=0,
    ismovex=false,
    distancex=0;
    var zindex=50;
$('#box')[0].addEventListener('touchstart',function(e){
     // ismovex=true;
     startx=e.touches[0].clientX;
});
$('#box')[0].addEventListener('touchmove',function(e){
    ismovex=true;
    movex=e.touches[0].clientX;
    distancex=movex-startx;
    if(distancex<0){
      $('ul>li:nth-Child('+(num-0+2)+')').css({'left':'100%','top':'50%'})
    }else{
      $('ul>li:nth-Child('+(num)+')').css({'left':'0','top':'50%'})
    }

})

//切换为水平后的触屏左右滑动
var flag
$('#screen')[num].addEventListener('touchstart',function(e){
     // ismovex=true;
     startx=e.touches[0].clientX;
     starty=e.touches[0].clientY;
     flag=true;
});
$('#screen')[num].addEventListener('touchmove',function(e){
    if(flag){
            zindex++;
            flag=false;
        }
    ismovex=true;
    movex=e.touches[0].clientX;
    movey=e.touches[0].clientY;
    distancex=movex-startx;
    distance=movey-starty;
    if(distancex<0){
      $('ul>li:nth-Child('+(num-0+2)+')').css({'left':'100%','top':'50%','z-index':zindex})
    }else{

      $('ul>li:nth-Child('+(num)+')').css({'left':'0%','top':'50%','z-index':zindex})
    }

//水平转向竖屏滑动
    if(Math.abs(distance)>Math.abs(distancex)&&Math.abs(distance)>5){
       //为控制index不随触动一直增加而设控制阀
        if(flag){
            zindex++;
            flag=false;
        }
        // console.log(zindex)

         if(num!=4&&distance<0){
              $('#box').css('z-index',zindex)
              $('#box').animate({top:-(num*h-distance)},0)
              //竖直切换为水平后立刻切换为水平，水平的那张图片宽高应为0，没有渐变属性
              $('ul>li:nth-Child('+(num-0+1)+'').css({'width':'0','height':'0'})
              $('ul>li:nth-Child('+(num-0+1)+'').css('transition','')
         }else if(num!=0&&distance>0){
              $('#box').css('z-index',zindex)
              $('#box').animate({top:-(num*h-distance)},0)
              //水平切换的那张图片宽高应为0
              $('ul>li:nth-Child('+(num-0+1)+'').css({'width':'0','height':'0'})
              $('ul>li:nth-Child('+(num-0+1)+'').css('transition','')
         }

    }

})


$('#screen')[num].addEventListener('touchend',function(){

   //水平滑动事件
   if(Math.abs(distancex)>Math.abs(distance)&&Math.abs(distancex)>10&&ismovex){
      zindex++;
      //解决水平滑动边界问题
      if(distancex>0){
        num--;
        if(num==-1){
            num=0;
        }
      }else{
        num++
        if(num==5){
            num=4;
        }
      }
      $('ul>li:nth-Child('+(num-0+1)+')').css('transition','all linear .5s');
      $('ul>li:nth-Child('+(num-0+1)+')').css({'width':'100%','height':'100%','left':'0','top':'0'});
      // zindex++


      // 触发一次后将所有属性恢复原来的值
      clearTimeout(timer);
      var timer=setTimeout(function(){
        for(var i=0;i<5;i++){
           $('ul>li')[i].style.transition='';
           if(i!=num){
               $('ul>li')[i].style.width=0;
               $('ul>li')[i].style.height=0;
               $('ul>li')[i].style.top='';
               $('ul>li')[i].style.left='';
               //每次滑动完成后初始化每个li里面的zindex防止一直切换连接的两个li导致其他li的zindex极小
               $('ul>li')[i].style.zIndex=zindex-1;
               console.log(zindex)

           }
        }
      },500)
      //处理水平切换竖直屏幕时的滚动距离衔接问题
    }else{
       if(ismovex&&Math.abs(distance)>(h/6)){
            //解决由竖直变为水平再变为竖直时第一张向上第五张向下的问题
            if(num!=0&&distance>0){
                num--;
            }else if(num!=4&&distance<0){
                num++;
            }
       }else{
           num;
       }
      $('#box').animate({top:-(num*h)},500,function(){})
    }

    ismovex=false;

})








//判断鼠标滚动事件向上还是向下滚，向上或向下一段距离后触发事件
//var lastScrollTop = 0;
//$(window).scroll(function(event){
//    var st = $(this).scrollTop();
//    if (st > lastScrollTop){
//        console.log(11);
//        console.log(st);
//        console.log(lastScrollTop);
//
//    } else {
//        console.log(22);
//    }
//    lastScrollTop = st;
//});




function page1(){
  var aa=document.querySelector('.page');
  var bb=document.createElement('div');
  bb.id='bb'
  bb.innerHTML='个人简历';
  aa.appendChild(bb);
  console.log(aa);
  setTimeout(function(){
    bb.style.transition='all 1s'
    bb.style.transform='translateX(0px)'
  },0)

}