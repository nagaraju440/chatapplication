import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router, 
    Route,Link,useParams,
    NavLink,Switch
}from 'react-router-dom';
import './styling.css'
import {AiFillCamera} from 'react-icons/ai'
import nomsg from "./nomessages.png";
import img from './ima.png'
import io from 'socket.io-client';
import ss from 'socket.io-stream'
import SearchBar from "material-ui-search-bar";
import insertfire from './insertfire';
import axios from 'axios';
import img1 from './user1.png'
import * as firebase from 'firebase';   
import TextField from '@material-ui/core/TextField';
// import BsArrowRight from 'react-icons'
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '@material-ui/core';
var xyz,socket;
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            x:0,
            y:0,
            p:null,
            p5:0,
            usersemail:[],
            value:null,
            chatno:0,
            groupno:0,
            time :new Date().toLocaleTimeString(),
            common:0,
            time1:null,
            // x:0,
            useremail:[],
            type:null,
            user:{},
            grpmessages:[],
            privatemessage:[],
            image:0,
            user123:{},
            whichuser:null,
            currentusername:null,
            sendedmessage:null,
            singlemsg:null,
            grpmessageuser:[],
            img1:null,
            me:0,
            mn:0,
            meetingusername:null,
            nm:0,
            stre:{},
            string:[],
            file:null,
        }
    }
    componentDidMount=()=>{
         socket=io.connect('http://localhost:4000')     
        //  socket.on('image',data=>{
        //     //  console.log(data,"data isss")
        //      const img=new Image();
        //      img.src = `data:image/jpg;base64,${data}`; 
        //      this.state.img1=img.src;
        //      this.setState({img1:this.state.img1})
        //      console.log(this.state.img1,"hloooo")
        //  })
                console.log(this.props.go,"props are these oneeeee")
                this.state.user123 = firebase.auth().currentUser;
                this.setState({user123:this.state.user123})
                axios.get("http://localhost:4000/users")
                .then(res=>{
                    this.state.user=res.data;
                    res.data.map(k=>{
                        if(this.state.user123.email===k.email1){
                            this.setState({currentusername:k.name1})
                        }
                    })
                    socket.emit('join',{name:this.state.currentusername})
                this.setState({user:this.state.user})        
                socket.on('groupmessage',y=>{
                    console.log(y)
                    Object.keys(y).map(l=>{
                        this.setState({grpmessages:this.state.grpmessages.concat([y[l]]),me:0})
                    })
                })
                // socket.emit("hii","hello raaa")
                socket.on('singlesmsg',s=>{
                    // alert("hiii")
                    // console.log(s,"s issssssssssssss")
                   this.setState({p:null,p5:0})
                    // axios.post('http://localhost:4000/messages',s.singlemsg)
                    // .then(s=>{
                        // console.log("s isss",s)
                    // })
                    axios.get("http://localhost:4000/gettingmessages")
                    .then(res=>{
                        // console.log(res.data)
                        var m=res.data;
                        m.map(n=>{
                            // console.log(n.arr,"one by one")
                        this.setState({privatemessage:this.state.privatemessage.concat([n.arr])})
                        })
                    })
                    setTimeout(()=>{
                        document.getElementById("goto").scrollTop=70000;
                    },200)
                })
               
                axios.get("http://localhost:4000/gettingmessages")
                .then(res=>{
                    // console.log(res.data)
                    var m=res.data;
                    m.map(n=>{
                        // console.log(n.arr,"one by one")
                        this.setState({privatemessage:this.state.privatemessage.concat([n.arr])})
                    })
                 

                    // console.log(this.state.privatemessage)
                })
           
            })
            socket.on("hii",h=>{
                // alert(h)
                console.log(h[2],h[1],h[0],"hi sssssssssssssssss")
                // console.log(h[2],typeof h[2],Object.keys(h[2]).length,"h iss")
                
            })
            // ss(socket).on("meet1",h=>{
            //     console.log("finally h iss ",h)
            //         console.log(h,typeof h,"h iss")
            //         // Object.keys(h[2]).map(l=>{
            //         //     console.log(h[2][l],"hlooo")
            //         // })
            // })
           socket.on("groupphoto",k=>{
            //    console.log("k issssssssssss",k)
            // this.state.string=k;
            this.setState({string:this.state.string.concat([k]),me:1})
            // console.log(this.state.string)
           })
            }
    clickchats=()=>{
        this.state.type="chats"
        this.setState({chatno:1,groupno:0,type:this.state.type})
        console.log("set0",this.state.type)
    }
    sendimage=()=>{
        this.setState({image:0})
        var reader = new FileReader();
        reader.onload = function(evt){
            var msg ={};
            // msg.username = username;
            msg.file = evt.target.result;
            console.log("msg is",msg)
            // msg.fileName = data.name;
            socket.emit('base64 file',msg);
        };
        reader.readAsDataURL(this.state.file);
    }
    imagechanging=(e)=>{
        this.state.image=1;
        this.state.file=e.target.files[0]
        this.setState({image:this.state.image,file:this.state.file})
    }
    vediochange=(e)=>{
        console.log(e.target.files[0],"hiii hlooo adammmmm")
    }
    clickgroups=()=>{
        this.state.type="groups"
        this.setState({groupno:1,chatno:0,type:this.state.type})
        console.log("set0",this.state.type)
    }
    clickmeets=()=>{
        this.state.type="meets"
        this.setState({type:this.state.type})
    }
   grpmsgchange=(e)=>{
            this.setState({sendedmessage:e.target.value})
   }
   singlemsgchange=(e)=>{
       this.setState({singlemsg:e.target.value})
   }
   down=()=>{
       document.getElementById("goto").scrollTop=70000;
   }
    sendmessage=()=>{
            
            // var sendmessage={from:this.state.currentusername,to:this.state.whichuser,message:sendedmessage}
            // axios.post("http://localhost:4000/chatusers",sendmessage)
            // .then(res=>{
            //     console.log(res)
            // })
            document.getElementById('msg').value=null
            var  grp=[this.state.sendedmessage,this.state.currentusername,this.state.time]
            socket.emit('groupmessage',grp)   
            
    }
    image=()=>{
        this.setState({image:1})
    }
   
    sendmessagetosingle=()=>{
        document.getElementById("goto").scrollTop=70000;
            document.getElementById('msg1').value=null;
            var singlemsg=[this.state.singlemsg,this.state.currentusername,this.state.whichuser,this.state.time]
            socket.emit('singlesmsg',singlemsg)
            this.setState({p:this.state.singlemsg,p5:1})
            document.getElementById("goto").scrollTop=70000;
    }
  
    click=(l)=>{
        this.state.whichuser=l;
        this.setState({x:1,whichuser:this.state.whichuser})
        // document.getElementById("goto").scrollTop=70000;
        setTimeout(()=>{
            document.getElementById("goto").scrollTop=70000;
        },100)

    }
    gosearch=(m)=>{
        this.setState({whichuser:m})
        console.log(m,"hii andiii")
        axios.get("http://localhost:4000/gettingmessages")
        .then(res=>{
            // console.log(res.data)
            var m=res.data;
            m.map(n=>{
                // console.log(n.arr,"one by one")
                this.setState({privatemessage:this.state.privatemessage.concat([n.arr])})
            })
            // console.log(this.state.privatemessage)
        })
    }
    onvedio=()=>{
        var video = document.querySelector("#videoElement");
        navigator.mediaDevices.getUserMedia({ video: true })
    .then( (stream)=> {
      
      video.srcObject = stream;
      this.state.stre=video.srcObject;
        this.setState({stre:this.state.stre})
      console.log(stream,"stream iss")
      console.log("vedio is",this.state.stre,JSON.stringify(this.state.stre),typeof this.state.stre,)
      socket.emit("meeting",[this.state.meetingusername,this.state.currentusername,this.state.stre])
    //   ss(socket).emit("meet",JSON.stringify(this.state.stre))
    })
    }
    offvedio=()=>{
        var video = document.querySelector("#videoElement");
        navigator.mediaDevices.getUserMedia({ video: true })
    .then( (stream)=> {
        
      video.srcObject = null;
      this.state.stre=video.srcObject;
        this.setState({stre:this.state.stre})
        var reader = new FileReader();
        reader.onload = function(evt){
            var msg ={};
            // msg.username = username;
            msg.file = evt.target.result;
            console.log("msg is",msg)
            // msg.fileName = data.name;
            socket.emit('meeting',msg);
        };
        reader.readAsDataURL(this.state.stre);
      console.log(stream,JSON.stringify(this.state.stre),typeof this.state.stre,"stream iss")
      socket.emit("meeting",[this.state.meetingusername,this.state.currentusername,this.state.stre])
    //   ss(socket).emit("meet",JSON.stringify(this.state.stre))
    })
    }

    joinmeet=(e)=>{
        e.preventDefault();
        this.setState({mn:0,nm:0})
    const value1=document.getElementById("value1").value;
    axios.get("http://localhost:4000/meet")
    .then(res=>{
        console.log(res.data)
        res.data.map(k=>{
            // console.log(typeof res.data[k])
            Object.keys(k).map(l=>{
                // if(l==="id"){
                    // console.log("hiii")
                    if(k[l]===value1){
                        // console.log(k.name,"name iss")
                        this.state.meetingusername=k.name
                        this.setState({nm:1,mn:1,meetingusername:this.state.meetingusername})
                        // console.log("hlo",this.state.meetingusername)
                        socket.emit("meeting",[this.state.meetingusername,this.state.currentusername,this.state.stre])
                }
            })
            
        })
    })
   
    }
    createmeet=(e)=>{
        this.state.meetingusername=this.state.currentusername
        this.setState({mn:1,meetingusername:this.state.meetingcurrentusername})
        var value=document.getElementById("idformeet").value;
        axios.post("http://localhost:4000/meetids",{id:value,name:this.state.currentusername})
        .then(res=>{
            console.log(res)
        })
        socket.emit("meeting",[this.state.meetingusername,this.state.currentusername,this.state.stre])
        // socket.emit("meeting","hii andiii")
        e.preventDefault();
    }
 
    render(){
        return(
      <div className="shadowbox">
          <Router>
          <div className="background">    
        <div className="first">
        <div className="center">
     <nav className="navbar">
     <div class="row">
    <div class="col-3"><NavLink exact activeClassName="navbar__link--active" className="navbar__link" to="/" > Home  </NavLink></div>
    <div class="col-3"><NavLink exact activeClassName="navbar__link--active" className="navbar__link" to="/chats" onClick={this.clickchats}> Chats </NavLink></div>
    <div class="col-3"><NavLink exact activeClassName="navbar__link--active" className="navbar__link" to="/groups" onClick={this.clickgroups}>Groups</NavLink></div>
    <div class="col-3"><NavLink exact activeClassName="navbar__link--active" className="navbar__link" to="/meets"  onClick={this.clickmeets}>meets</NavLink></div>
    </div>
  </nav>  
   </div>
   {/* <div ><SearchBar/></div> */}
  <div> <SearchBar
value={this.state.value}
onChange={(newValue) => this.setState({ value: newValue })}
onRequestSearch={() => {
    this.gosearch(this.state.value)
}}
  style={{
    margin: '0 auto',
    maxWidth: 800
  }}/></div>
   <Route path="/chats" exact><div><div>
<Router>
          {
           Object.keys(this.state.user).map(k=>{
               return(
               <div className="padtop">{this.state.user123.email!=this.state.user[k].email1?<div className="goup">
                   <div class="navbar1">
                  <NavLink  activeClassName="navbar--active" className="link" to={"/chats/"+this.state.user[k].name1}
                   onClick={()=>{this.click(this.state.user[k].name1)}}>
                       <img src={img1} className="forimage"></img>
                  <h5 className="h5">{this.state.user[k].name1}   </h5><span><hr className="line"></hr></span></NavLink>
              </div></div>:""}
               </div>
               )
           })
          }
      </Router></div></div></Route>
      <Route path="/meets"><div className="center1"><div><div><form action="/meeteids" method="POST">id:<input type="text" id="idformeet"></input><button onClick={this.createmeet}>create</button></form></div></div>
      <div className="padtop">id:<input type="text" id="value1"></input><button onClick={this.joinmeet}>join</button></div>
      </div></Route>
        </div>
<div className="second">
     <div>
     {
         (()=>{
            switch(this.state.type){
                // chats
                case "chats" :return( <div>
<div>{this.state.whichuser===null?<img src={nomsg} className="nomsg"></img>:<div>
            <div className="top">
   <img src={img1} className="forimage1"></img><h5 className="forhead">{this.state.whichuser}</h5>
   <button onClick={this.down}>gotodown</button>
            </div>
       <div className="hello">    
           <div className="pad"> 
           {/* <span className="forcamera"><input type="file" title="" value="" className="file"></input></span> */}
            <TextField className="msginput" placeholder="type a message" id="msg1" onChange={this.singlemsgchange}></TextField>
               <Button color="primary" variant="contained" className="buttonsend" onClick={this.sendmessagetosingle} >send</Button>
                
                </div>
       </div>
       
       <div className="forooverflow" id="goto">
       <div>{
                        this.state.p5===1?<div className="grpmsgstyle1">
                        <h3 className="msgname">Me</h3><br></br>
              <div className="msges">{this.state.p}</div>
                      </div>:""
                        }</div>
           <div>{
               this.state.privatemessage.map(k=>{
                   return(<div>
                       <div>
                       {
                           this.state.whichuser===k[2]?<div>{this.state.currentusername===k[1]?<div>
                            <div>{this.state.currentusername===k[1]?<div className="grpmsgstyle1">
                              <h3 className="msgname">Me</h3><br></br>
                    <div className="msges">{k[0]}<span className="fortime">{k[3]}</span></div>
                            </div>:""}</div>
                        </div>:""}</div>:""
                       }
                   </div>
                    <div>{
                        this.state.whichuser===k[1]?<div>{this.state.currentusername===k[2]?<div><div><div className="grpmsgstyle">
                        <h3 className="msgname">{k[1]}</h3>
                        <br></br>
                            <div className="msges">{k[0]}<span className="fortime">{k[3]}</span></div>
                    </div></div></div>:""}</div>:""

                        }</div>
                   </div>)
               })
           }</div>
       </div>
   </div>}</div>
                </div>)
                //groups


                case "groups":return(<div>
                                  <div>
               <div className="top">
   <img src={img1} className="forimage1"></img><h5 className="forhead">Group chat</h5>
            </div>
                 <div className="hello">    
           <div className="pad"><span className="forcamera"><input type="file" title="" value="" id="imagevalue" className="file" onChange={this.imagechanging} ></input></span>   
           <TextField className="msginput" placeholder="type a message" id="msg" onChange={this.grpmsgchange}></TextField>
           {this.state.image===0?<Button color="primary" variant="contained" className="buttonsend" onClick={this.sendmessage} >send</Button>
           
           :<Button color="primary" variant="contained" className="buttonsend" onClick={this.sendimage} ><AiFillCamera/></Button>      
           }
           </div></div>
           <div className="forooverflow">
               {
                  this.state.grpmessages.map(k=>{
                        return(
                  <div>{this.state.currentusername===k[1]?<div className="grpmsgstyle1">
                  <h3 className="msgname">Me</h3>
                  <br></br>
                        <div className="msges">{k[0]}<span className="fortime">{k[2]}</span></div>
              </div>:<div className="grpmsgstyle">
                  <h3 className="msgname">{k[1]}</h3>
                  <br></br>
                      <div className="msges">{k[0]}<span className="fortime">{k[2]}</span></div>
              </div>}</div>
                        )
                  })
               }
               {
                   this.state.string.map(k=>{
                 return(
            <img src={k} className="socimg"></img>

                 )
                })
                //    this.state.me===1?:""
               }
           </div>
       
          </div>
                </div>)

                //meets

             case "meets":return(<div>
                 <div>{this.state.mn===1?<div><video autoplay="true" id="videoElement" onChange={this.vediochange}></video><div> <button onClick={this.onvedio}>on</button>
    <button onClick={this.offvedio}>off</button></div></div>:<div></div>}</div>
             </div>)   
            }
         })()
      }
     </div>
     
</div>
</div></Router></div>
        )
    }
}
export default Home;
