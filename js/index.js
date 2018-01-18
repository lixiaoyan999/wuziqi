/*
* 1.判断空白位置，当棋子落下时，删除空白位置
* 2.遍历所有空白位置,计算每一个空白的位置
* 3.落下白子时，删除空白位置
* */
$(function () {
    let qipan = $('.qipan'),
        flag = true,
        hei = {},
        bai = {},
        blank = {}, //空白位置
        ai = true;

    //插入元素
    for(let i = 0; i < 15;i++){
        $('<i>').appendTo(qipan);
        $('<b>').appendTo(qipan);
        for(let j = 0;j < 15;j++){
            blank[i+"_"+j] = true;
            $('<span>')
                .appendTo(qipan)
                .addClass('qizi')
                .attr('id',i+"_"+j)
                .data('pos',{x:i,y:j});
        }
    }

    //点击棋牌
    qipan.on('click','.qizi',function () {
        if($(this).hasClass('hei') || $(this).is('.bai')){
            return;
        }
        let data = $(this).data('pos');
        delete blank[data.x + "_" + data.y];    //删除空白位置
        if(flag){
            $(this).addClass('hei');
            hei[data.x + "_" + data.y] = true;
            if(win(data,hei) >= 5){
                qipan.off();
                console.log("黑棋胜利");
            }
            if(ai){
                let pos = position();
                $('#' + pos.x+"_"+pos.y).addClass('bai');
                bai[pos.x + "_" + pos.y] = true;
                delete blank[pos.x + "_" + pos.y];
                if(win(pos,bai) >= 5){
                    qipan.off();
                    console.log("白棋胜利");
                }
                return;
            }

        } else{
            $(this).addClass('bai');
            bai[data.x + "_" + data.y] = true;
            if(win(data,bai) >= 5){
                qipan.off();
                console.log("白棋胜利");
            }
        }
        flag = !flag;
    });

    //位置
    function position() {
        let score1 = 0, score2 = 0,pos1 = null,pos2 = null; //进攻，防守   坐标
        for(let i in blank){
            let obj = {x:i.split('_')[0],y:i.split('_')[1]};
            if(win(obj,hei) > score1){    //黑子最大位置
                score1 = win(obj,hei);
                pos1 = obj;
            }
            if(win(obj,bai) > score2){
                score2 = win(obj,bai);
                pos2 = obj;
            }
        }
        return score2 >= score1 ? pos2:pos1;
    }

    function win(pos,obj) {
        let heng = 1,shu = 1,zx = 1,yx = 1,x = pos.x, y = pos.y;
        while(obj[x + '_' + (++y)]){
            heng++;
        }
        x = pos.x,y = pos.y;
        while(obj[x + '_' + (--y)]){
            heng++;
        }
        x = pos.x,y = pos.y;
        while(obj[(++x) + "_" + y]){
            shu++;
        }
        x = pos.x,y = pos.y;
        while(obj[(--x) + "_" + y]){
            shu++;
        }
        x = pos.x,y = pos.y;
        while(obj[(--x) + "_" + (++y)]){
            zx++;
        }
        x = pos.x,y = pos.y;
        while(obj[(++x) + "_" + (--y)]){
            zx++;
        }
        x = pos.x,y = pos.y;
        while(obj[(++x) + "_" + (++y)]){
            yx++;
        }
        x = pos.x,y = pos.y;
        while(obj[(--x) + "_" + (--y)]){
            yx++;
        }
        return Math.max(heng,shu,zx,yx);
    }
});