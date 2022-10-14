const { application } = require('express')
const { WebSocketServer } = require('ws')
const ws=require('ws')
let wss=new WebSocketServer({port:80})
//maxroom用于判断用户输入房间是否合法
var maxroom=-1
//roomman用于记录某个房间当前的人数
var roomman=[]
wss.on('connection',(ws)=>{
  console.log("建立连接")
  ws.on("message",(message)=>{
    let data=JSON.parse(Buffer.from(message).toString())
    //判断请求类型，并相应返回
    // 类型1,2分别为进入房间和创建房间
    if(data.type==1||data.type==2){
      //retdata为统一回送数据，客户端进行判断
      var retdata={
        type:1,
        search:false,
        roomid:-1,
        roomfull:false,
        roomman:0
      }
      //第一种情况:请求进入房间
      if(data.type==1){
        retdata.roomid=data.id
        //房间存在
      if(data.id<=maxroom&&data.id>=0){
          ws['room']=data.id
          retdata.search=true
          if(roomman[data.id]<2){
              roomman[data.id]+=1
              retdata.roomfull=false
              retdata.roomman=roomman[data.id]
          }
          else{
            retdata.roomfull=true
          }
        }
      else{
        retdata.search=false
        retdata.roomid=data.id
        retdata.roomfull=false
      }
      }
      //请求获得房间号
      else if(data.type==2){
    
        retdata.type=2
        retdata.search=true
        retdata.roomfull=false
        maxroom+=1
        retdata.roomid=maxroom
        roomman.push(0)
      }
      //最终回送数据要转为字符串
      var lastdata=JSON.stringify(retdata)
      //只发送给请求方
      ws.send(lastdata)
    }
    //类型3为组播进入房间,四为传输棋盘数据，都只需简单传输即可
    else if(data.type==3||data.type==4||data.type==5){
      var lastdata=JSON.stringify(data)
      wss.clients.forEach((client)=>{
        console.log(client['room'],data.roomid)
        if(client['room']==data.roomid){
         client.send(lastdata)
          }
        })
    }
  })

})