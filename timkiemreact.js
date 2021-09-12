import React, { Component } from 'react';
import Seach from './Component/seach';
import From from './Component/from';
import Data from './Component/data.json';
class App extends Component {
  constructor(props) {
    super(props)
      this.state={
        data: Data,
        dulieu1:'',
     
      }
  }
 oncheck=(dl)=>{
   this.setState({
     dulieu1:dl
   })
 }

  render() {
    var ketqua=[];
        this.state.data.forEach((item)=>{
        if(item.ten.indexOf(this.state.dulieu1) !== -1){
          ketqua.push(item)
        }
    })
    console.log(ketqua)
    return (
    <div className="App">
       <Seach onchecks={(dl)=>this.oncheck(dl)}  />
      <From tieude={ketqua}/>
    </div>
    );
  }
}
export default App;
//============================================seach
import React, { Component } from 'react';


class Seach extends Component {
    constructor(props) {
        super(props)
          this.state={
           dulieu:'', 
          }
      }
    timkiem=(even) => {
        // console.log(even.target.value)
        this.setState({
        dulieu:even.target.value    
    })
}

    render() { 
        return (
            <div>
            <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">@</span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" onChange={(even)=>this.timkiem(even)}/>
                <button onClick={() =>this.props.onchecks(this.state.dulieu)}>Timkiem</button>
            </div>
        <div className="input-group mb-3">
          <input type="text"   name="ten" className="form-control"  />
        </div>
        <div className="input-group input-group-lg">
  
          <input type="text" name="age" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
          <button>them</button>
        </div>
            </div>
        ); 
    }
}
export default Seach;
//==============danhsach=========
import React, { Component } from 'react';

class From extends Component {
run=()=>(
    this.props.tieude.map((value,idex) =>{
    return(
        <div className="container">
        <div className="row">
            <div className="col-6 col-sm-3">{value.id}</div>
          <div className="col-6 col-sm-3">{value.ten}</div>
          <div className="col-6 col-sm-3">{value.age}</div>
        </div>
      </div>
    )
    })
)
    render() {
        return (
            <div>
                {this.run()}
            </div>
        );
    }
}

export default From;
//=======================================api
[
    {
        "id":1,
        "ten":"nguyenxuanduc",
        "age":18
    },
    {
        "id":2,
        "ten":"hoa",
        "age":12
    },
    {
        "id":3,
        "ten":"dada",
        "age":18
    },
    {
        "id":4,
        "ten":"dasdqw",
        "age":31231
    }
]
