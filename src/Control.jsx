import React from 'react'
import { useState } from 'react';

const Control = ({createBlock, sortClick, smartAdd, setSmartAdd}) => {
    const [value, setValue] = useState("")
    const saveClick = () => {
        if(!!value){
            createBlock(value)
            setValue('')
        }
    }
    return (
        <div className = "controlInputWrapper">
            <input type="number" value = {value} onChange = {(e) => setValue(e.target.value)} placeholder='ДЛИНА БЛОКА' className = "controlInput"/>
            <button onClick = {saveClick} className = "controlSaveButton">Сохранить</button>
            <button onClick = {sortClick} className = "controlSaveButton">Упорядочить</button>
            <div className = "controlCheckboxWrapper">Включить "умное добавление" <input type = "checkbox" value = {smartAdd} onChange={ () => setSmartAdd(!smartAdd)}/></div>
        </div>
    )
}

export default Control