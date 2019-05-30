import React, { Component } from 'react'
import airports from '../../Data/airports.json';
export default class Autocomplete extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayResult : [],
            searchVal: ''
        }
    }
    onChange = (event)=>{
        let results = search(event.target.value, airports.airports)
        if(!event.target.value){
            this.setState({displayResult: [], searchVal: ''})
        }else{
            this.setState({displayResult: results, searchVal: event.target.value})
        }
		
    }
    onClick = (name)=>{
        this.setState({displayResult: [], searchVal: name})
        console.log(name)
    }
    render() {
        let indexResults = this.state.displayResult.map(data=>(
            <div key = {data.ICAO} className='p-3 border-right border-bottom border-dark border-left' onClick={()=>this.onClick(data.name)}>
                <h4>Name: {data.name}</h4>
            </div>
        ))
        return (
            <div className=''>
                <div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="basic-addon1">@</span>
					</div>
					<input type="text" value = {this.state.searchVal} className="form-control" placeholder="Username" onChange={(e)=>this.onChange(e)} aria-label="Username" aria-describedby="basic-addon1"/>
				</div>
                {indexResults}
            </div>
        )
    }
}

function search(nameKey, myArray){
    var results = [];
	for (var i=0;i<myArray.length;i++){
        if(results.length === 10){
            return results;
        }
		if(myArray[i].name.toUpperCase().startsWith(nameKey.toUpperCase())){
			results.push(myArray[i])
		} 
    }
    return results;
}