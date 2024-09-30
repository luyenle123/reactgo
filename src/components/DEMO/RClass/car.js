import React from "react";

 
  class Car extends React.Component{
  
    constructor(props){
      super(props);
      this.state = {
        brand: "Ford",
        model: "Mustang",
        color: "red",
        year: 1964
      };
    }

    changeColor = () => {
        this.setState({color: "blue"});
    }
    
    componentDidMount(){
        setTimeout(() => {
            this.setState({color: "green"})
        }, 5000)
    }

    static getDerivedStateFromProps(props, state) {
        return {color: props.color };
      }    

    shouldComponentUpdate() {
        return true;
    }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     document.getElementById("div1").innerHTML = "Before the update, the favorite was " + prevState.color;
    // }
      
    // componentDidUpdate() {
    //     document.getElementById("div2").innerHTML = "The updated favorite is " + this.state.favoritecolor;
    // }      
  
    render(){
      return(
        <>
            <div>
                <h1>My {this.state.brand}</h1>
                <p>
                It is a <span style={{color:this.state.color}}>{this.state.color}</span> {this.state.model} from {this.state.year}.
                </p>

                <button type="button" onClick={this.changeColor} >Change color</button>
                
                <div id="div1"></div>
                <div id="div2"></div>                
            </div>        
        </>
      );
    }
  }

  export default Car;