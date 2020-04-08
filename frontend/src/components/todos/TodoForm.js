import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { Redirect } from 'react-router-dom';


class TodoForm extends Component {
   
  // state = { completed: false };

  constructor(props) {
    super(props);
    this.state = {completed: false};
  }

  json = {
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "text",
        "name": "question1",
        "title": "What type of food do you want to eat?",
        "placeHolder": "burgers, Chinese food, etc..."
       },
       {
        "type": "checkbox",
        "name": "question2",
        "title": "Price Range?",
        "choices": [
         {
          "value": "item1",
          "text": "$"
         },
         {
          "value": "item2",
          "text": "$$"
         },
         {
          "value": "item3",
          "text": "$$$"
         },
         {
          "value": "item4",
          "text": "$$$$"
         }
        ]
       },
       {
        "type": "text",
        "name": "question3",
        "title": "How far are you willing to go?",
        "placeHolder": "enter distance in miles"
       },
       {
        "type": "text",
        "name": "question4",
        "title": "Any nutrition goals?"
       },
       {
        "type": "text",
        "name": "question5",
        "title": "Any dietary allergies?",
        "placeHolder": "nuts, shellfish, etc."
       }
      ]
     }
    ]
   };

   //Define a callback methods on survey complete
   onComplete = (survey, options) => {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
    // this.setState(state )
    
    this.setState({completed: true});
   }
   
   render() {
    
    if(this.state.completed) {
      return <Redirect to='/' />;
    }

    //Create the model and pass it into react Survey component
    //You may create survey model outside the render function and use it in your App or component
    //The most model properties are reactive, on their change the component will change UI when needed.
    var model = new Survey.Model(this.json);
    return (<Survey.Survey model={model} onComplete={this.onComplete}/>);
    /*
    //The alternative way. react Survey component will create survey model internally
    return (<Survey.Survey json={this.json} onComplete={this.onComplete}/>);
    */
    //You may pass model properties directly into component or set it into model
    // <Survey.Survey model={model} mode="display"/>
    //or 
    // model.mode="display"
    // <Survey.Survey model={model}/>
    // You may change model properties outside render function. 
    //If needed react Survey Component will change its behavior and change UI.
   }
}

export default reduxForm({
  form: 'todoForm'
})(TodoForm);







