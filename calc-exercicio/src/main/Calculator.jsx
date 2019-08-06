import React, { Component } from 'react'
import './Calculator.css'

import Display from '../components/Display'
import  Button from '../components/Button'
import { Number } from 'core-js';

 const initialState = {
    values: [0, 0],
    current: 0,
    operation: null,
    // currentOperation: null,
    clearDisplay: true,
    displayValue: 0,
    currentValue: 0,
}    

export default class Calculator extends Component {

    state = {...initialState}

    clearMem(){
        this.setState(initialState)
        // console.log(this.state)
    }
    addDigit(n){
        console.log(`current: ${this.state.current}`)
        const clearDisplay = this.state.clearDisplay        
        const currentValue = this.state.currentValue
        const current = this.state.current
        const values = this.state.values

        if(n === '0' && clearDisplay === true){
            return
        }else{
            const displayValue = clearDisplay ? n : currentValue + n
            values[current] = Number(displayValue)

            this.setState({currentValue: displayValue})
            this.setState({clearDisplay: false})
            this.setState({displayValue})
            this.setState({values})
            // console.log(this.state.current)
        }
        console.log(values)
    }
    setOperation(op){
        const current = this.state.current
        const clearDisplay = true
        const values = this.state.values
        const operation = this.state.operation

        if(current === 0){
            const operation = op
            this.setState({
                current: 1,
                clearDisplay,
                operation
            })
            if(operation === '='){
                return 
            }
            // console.log(operation)
        }else{
            const currentOperation = operation ? operation : op

            switch(currentOperation){
                case '=':
                    this.setState({
                        clearDisplay,
                    })
                    break
                case '+':
                    values[0] = values[0] + values[1]
                    // values[1] = 0
                    break
                case '-':
                    values[0] = values[0] - values[1]
                    // values[1] = 0
                    break
                case 'x':
                    values[0] = values[0] * values[1]
                    // values[1] = 0
                        break
                case '/':
                    values[0] = values[0] / values[1]
                    // values[1] = 0
                    break
                default:
                    this.setState(initialState)
            }
            values[1] = 0
            const displayValue = values[0]
            
            this.setState({
                displayValue,
                clearDisplay,
                operation: op,
            })
        }
        console.log(`v[0] = ${this.state.values[0]} || v[1] = ${this.state.values[1]}`)
        
        // const displayValue = values[0]
        // console.log(this.state.displayValue)
    }
    render () {                         
        const addDigit = (n) => this.addDigit(n)
        const setOperation = (op) => this.setOperation(op)
        const clearMem = () => this.clearMem()
        return (
            <div className = 'calculator'>
               <Display value = {this.state.displayValue}/>
               <Button label = '7' click = {addDigit}/>  
               <Button label = '8' click = {addDigit}/>  
               <Button label = '9' click = {addDigit}/>  
               <Button label = '/' click = {setOperation} operation / >  
               <Button label = '4' click = {addDigit}/>  
               <Button label = '5' click = {addDigit}/>  
               <Button label = '6' click = {addDigit} />  
               <Button label = 'x' click = {setOperation} operation/>  
               <Button label = '1' click = {addDigit}/>  
               <Button label = '2' click = {addDigit}/>  
               <Button label = '3' click = {addDigit}/>  
               <Button label = '-' click = {setOperation} operation/>  
               <Button label = 'AC' click = {clearMem} operation />  
               <Button label = '0' click = {addDigit}/>  
               <Button label = '=' click = {setOperation} operation/>  
               <Button label = '+' click = {setOperation} operation/>  
            </div>
        )
    }
}

