import React from 'react'
import './form.style.css';

const Form = props => {

    return (
        <div className="container">
           <form onSubmit={props.handleSubmit}>
           <div>{props.error ? error() : ""}</div>
           <div className="row">
                <div className="col-md-3 offset-md-2">
                    <input
                    type="text" 
                    className="form-control" 
                    name="city" 
                    autoComplete="off" 
                    placeholder="City" 
                    onChange={props.handleChangeCity}/>

            </div>
                <div className="col-md-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    name="country" 
                    autoComplete="off" 
                    placeholder="Country" 
                    onChange={props.handleChangeCountry}/>
                </div>
                <div className="col-md-3 mt-md-0 text-md-left">
                    <button className="btn btn-warning">Get Weather</button>
                </div>
            </div>

           </form>

        </div>
    );
};

const error = props => {
    return (
      <div className="alert alert-danger mx-5" role="alert">
        Please Enter City and Country...!
      </div>
    );
  };

  
export default Form;