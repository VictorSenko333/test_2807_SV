import React from 'react'
import { useState } from 'react'

const Track = ({blocks, blocksLength, setBlocks, trackLength}) => {
	const [isClicked, setClick] = useState(null)
	//функция удаления блока
	const deleteBlock = (el) => {
		let newBlocks = blocks?.map((block) => block.index === el.index ? {...block, isEmpty: true } : block)
		
		//при удалении если рядом находятся 2 пустых блока, они собираются в 1 (для того чтобы можно было проверить возможность поместить туда новый блок при включенном чекбоксе)
		
		const newBlocksArr = newBlocks.reduce((acc, val, index, arr) => {
			if(arr?.[index-1]?.isEmpty && val.isEmpty ){
				acc[acc.length - 1].length += val.length;
    			return acc;
			}
			return [...acc, val];
		}, [])
		setBlocks(newBlocksArr)
	}
	const blocksArr = blocks?.map((el,i) => <BlockItem el = {el} key = {i} deleteBlock = {deleteBlock} setClick = {setClick} isClicked = {isClicked}/>)
	const arr = Array.from({length: trackLength-blocksLength})?.map((el,i) => {
		return <div key = {i}><EmptyBlock/></div>
	})
	return (
		<div className = "trackWrapper">
			{blocksArr}
			{arr}
		</div>
	)
}
//компонент обычного блока
const BlockItem = ({el, deleteBlock, isClicked, setClick}) => {
	const blockItem = Array.from({length: el.length})?.map((elem,i) => <div key = {i}>
			{el?.isEmpty? <div className="emptyBlock"></div> :
				<div 	 
						className	  = "emptyBlock" 
						style 		  = {{backgroundColor: isClicked === el.index ? 'red':el.color}} 
						onClick 	  = {() => {setClick(isClicked === el.index ? null : el.index)}} 
						onDoubleClick = { () => deleteBlock(el)}>
					{el.index}
				</div>
			}
		</div>)
	return (
		<>
			{blockItem}
		</>
	)
}
//компонент пустого блока
const EmptyBlock= () => <div className="emptyBlock"></div>

export default Track