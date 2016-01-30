function game(){
    this.clientw=document.documentElement.clientWidth;
    this.clienth=document.documentElement.clientHeight;
    this.letterArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.letterLen=5;
    this.speed=5;
    this.spans=[];
    this.currArr=[];
    this.currPosArr=[];
    this.die=10;
    this.score=0;
    this.currScore=0;
    this.num=10;
    this.soreEle=document.getElementsByClassName("sore")[0].getElementsByTagName("span")[1];
    this.dieEle=document.getElementsByClassName("die")[0].getElementsByTagName("span")[1];
    this.jie=document.getElementsByClassName("jieshu")[0];
    this.guanka=1;
    this.shijian=document.getElementById("shijian");
    this.audio=document.getElementsByTagName("audio")[0];
    this.audio1=document.getElementsByTagName("audio")[1];
    //this.play();
}
game.prototype={
    play:function(){
        //将字母显示在body中
        this.getLetter(this.letterLen);
        //字母运动
        this.move();
        this.key();
    },
    key:function(){
        var that=this;
        document.onkeydown=function(e){
            var ev=e||window.event;
            var code=String.fromCharCode(ev.keyCode);
            for(var i=0;i<that.spans.length;i++){
                if(that.spans[i].innerHTML==code){
                    document.body.removeChild(that.spans[i]);
                    that.audio1.play();
                    that.spans.splice(i,1);
                    that.currArr.splice(i,1);
                    that.currPosArr.splice(i,1);
                    that.getLetter(1);
                    that.score++;
                    that.currScore++;
                    that.soreEle.innerHTML=that.score;
                    if(that.currScore%that.num==0){
                        that.guanka++;
                        alert("第"+that.guanka+"关");
                        that.next();
                    }
                    break;
                }
            }
        }
    },
    next:function(){
        clearInterval(this.t);
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans=[];
        this.currArr=[];
        this.currPosArr=[];
        this.currScore=[];
        this.num+=10;
        this.speed++;
        this.letterLen++;
        this.play();
    },
    move:function(){
        var that=this;
        this.t=setInterval(function(){
            for(var i=0;i<that.spans.length;i++){
                var top=that.spans[i].offsetTop+that.speed;
                var tiao=document.getElementById("tiao");
                that.spans[i].style.top=top+"px";
                if(top>that.clienth){
                    document.body.removeChild(that.spans[i]);
                    that.spans.splice(i,1);
                    that.currArr.splice(i,1);
                    that.currPosArr.splice(i,1);
                    that.getLetter(1);
                    that.die--;
                    tiao.style.width=that.die*10+"%";
                    var tt=that.shijian.innerHTML;
                    that.dieEle.innerHTML=that.die;
                    if(that.die==0){
                            clearInterval(that.t);
                        that.shijian.innerHTML=tt;
                        that.jieshu();
                        that.audio.pause();
                    }
                }
            }
        },60)
    },
    jieshu:function(){
        this.jie.style.top="200px";
    },
    restart:function(){
        clearInterval(this.t);
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.audio.play();
        this.spans=[];
        this.currArr=[];
        this.currPosArr=[];
        this.currScore=0;
        this.shijian.innerHTML=0;
        this.die=10;
        this.score=0;
        this.num=10;
        this.speed=5;
        this.letterLen=5;
        this.dieEle.innerHTML=10;
        tiao.style.width=100+"%";
        this.soreEle.innerHTML=0;
        this.play();
    },
    getLetter:function(num){
        //先获取到指定的字母
        var arr=this.getRand(num);
        var posArr=[];
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span");
            span.innerHTML=arr[i];
            var x=(100+(this.clientw-200)*Math.random());
            var y=(100*Math.random());
            var width=60;
            while(this.check1(this.currPosArr,x,width)){
                x=(100+(this.clientw-200)*Math.random());
            }
            posArr.push({minx:x,maxx:x+width});
            this.currPosArr.push({minx:x,maxx:x+width});
            span.style.cssText="width:"+width+"px;position:absolute;left:"+x+"px;top:"+y+"px;color:#fff;text-align:center;font-size:30px;background:url(./xin.png)";
            document.body.appendChild(span);
            this.spans.push(span);
        }
        return span;
    },
    check1:function(arr,x,width){
        for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx||arr[i].maxx+width<x)){
                return true;
            }
        }
        return false;
    },
    getRand:function(num){
        var arr=[];
        for(var i=0;i<num;i++){
            var rand=Math.floor(this.letterArr.length*Math.random());
            while(this.check(this.currArr,this.letterArr[rand])){
                rand=Math.floor(this.letterArr.length*Math.random());
            }
            arr.push(this.letterArr[rand]);
            this.currArr.push(this.letterArr[rand]);
        }
        return arr;
    },
    check:function(arr,val){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    }
}