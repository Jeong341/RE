// components/test/test.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        
    },

    /**
     * 组件的初始数据
     */
    data: {
      // 点数数组
        point_arry:[0,0,0,0,0,0,0,0,0],
      //判断是否被格子占用
        is_on:[0,0,0,0,0,0,0,0,0],
        //点击允许转态
        is_click:false,
        //摇出来的点数
        temp_point:0,
        //是否已经点击
        check_click:false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        add_point(event){
            if(!this.data.is_click||this.data.is_on[id]==1) return;
            const id=parseInt(event.target.dataset.id)
            // 允许点击时,点击后改变数组和点击状态
             if(this.data.is_click&&this.data.is_on[id]==0){
                var new_on = this.data.is_on
                var new_arry = this.data.point_arry
                var new_click = false
                new_on[id] = 1
                new_arry[id] = this.data.temp_point
                this.setData({
                  point_arry: new_arry,
                  is_click: false,
                  click_index:id,
                  check_click:true
                })
                this.setData({
                  point_arry: this.data.point_arry
                })
                this.setData({
                  is_click: false
                })
             }
        }
    }
})
