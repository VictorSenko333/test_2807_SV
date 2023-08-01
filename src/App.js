import './App.css';
import Track from './Track'
import Control from './Control'
import {useState} from 'react';


function App() {;
	const [blocks, setBlocks] = useState([])
	const [blockId, setBlockID] = useState(1);
	const [smartAdd, setSmartAdd] = useState(false)
	const trackLength = 100;
	const blocksLength = blocks.map(el => el.length)?.reduce((acc, val) => acc + val, 0)
	console.log(blocks)
	const createBlock = (value) => {
		//функция создания нового блока
		//проверка на пустые блоки в массиве блоков
		const isContainEmptyBlocks = !!blocks?.filter(el => el?.isEmpty)?.length
		if(!isContainEmptyBlocks && +value > trackLength - blocksLength){
			value = trackLength - blocksLength
		}
		if(isContainEmptyBlocks){
			

			const color ='#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase()
			
			let leftLength = +value;
			let i = 0;
			let newBlocks = [...blocks];
			//если включен чекбокс
			if(smartAdd){
				const newBlock = {
					length: +value,
					index: blockId,
					color,
					isEmpty: false
				}
				
				const emptyBlocks = blocks?.filter(el => el?.isEmpty)
				let emptyIndex = null;
				let biggerIndex = null;
				//проверка на наличие пустого места с точным количеством блоков
				emptyBlocks.forEach((el,i) => {
					if(el.length === leftLength && emptyIndex === null){
						emptyIndex = el.index
					}
					
				})
				if(emptyIndex !== null){
					newBlocks.splice(blocks.indexOf(emptyBlocks.filter(el => el.index === emptyIndex)[0]), 1, newBlock)
					leftLength = 0
					setBlocks(newBlocks)
					
				}else{
					//проверка на наличие пустого места, которое больше нового блока
					emptyBlocks.forEach((el,i) => {
						if(el.length > leftLength && biggerIndex === null){
							biggerIndex = el.index
						}
					})
					if(biggerIndex !==null) {
						const biggerGapIndex = blocks.indexOf(emptyBlocks.filter(el => el.index === biggerIndex)[0])
						const emptyBlockItem = emptyBlocks.filter(el => el.index === biggerIndex)[0];
						newBlocks.splice(biggerGapIndex, 0, newBlock)
						newBlocks = newBlocks.map((el,i) =>  el === newBlocks[newBlocks.indexOf(emptyBlockItem)] ? {...el, length: el.length - leftLength} : el)
						leftLength = 0
						setBlocks(newBlocks)
					}
				}
			}
			while(leftLength > 0){
				const newBlock = {
					length: +value,
					index: blockId,
					color,
					isEmpty: false
				}
				const emptyBlock = blocks?.filter(el => el?.isEmpty)[i];
				//создание нового блока на основе существующих пустых блоков
				if(!!emptyBlock){
					if(emptyBlock.length > leftLength){
						newBlock.length = +leftLength;
						newBlocks.splice(blocks.indexOf(emptyBlock), 0, newBlock)
						newBlocks = newBlocks.reduce((acc, val) => {
							if(val.length > 0){
								const value = val === newBlocks[newBlocks.indexOf(emptyBlock)] ? {...emptyBlock, length: emptyBlock.length - leftLength} : val
								return [...acc, value]
							}
							return [...acc]

						},[])
						setBlocks(newBlocks)
						break;
					}else{
						newBlock.length = emptyBlock.length;
						newBlocks.splice(blocks.indexOf(emptyBlock), 1, newBlock)
						i++
						leftLength = leftLength - emptyBlock.length
						setBlocks(newBlocks)
					}
				}else {
					if(leftLength <= trackLength-blocksLength){
						newBlock.length = leftLength
						newBlocks.push(newBlock)
					}else{
						newBlock.length = trackLength-blocksLength
						newBlocks.push(newBlock)
					}
					leftLength = 0;
				}
				//------------------------------------------------------------^^
				setBlocks(newBlocks)
			}
		}else{
			//если пустые блоки отсутствуют, новый блок добавляется в конец.
			const newBlock = {
				length: +value,
				index: blockId,
				color: '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase(),
				isEmpty: false
			}
			setBlocks([...blocks, newBlock])
		}
		setBlockID(blockId+1)
	}
	//функционал упорядочивания блоков
	const sortClick = () => {
		const newBlocks = JSON.parse(JSON.stringify(blocks));
		const newBlocksArr = [];
		for(let i = 0; i < newBlocks.length; i++){
			if(newBlocksArr.indexOf(newBlocks[i]) === -1){
				newBlocksArr.push(newBlocks[i])
				newBlocks.forEach(el => {
					if(el.index === newBlocks[i].index && newBlocksArr.indexOf(el) === -1){
						newBlocksArr.push(el);
					}
				})
			}
		}
		setBlocks(newBlocksArr)
	}
    return (
        <div className="App">
            <Track blocks = {blocks} setBlocks = {setBlocks} blocksLength = {blocksLength} trackLength = {trackLength}/>
            <Control createBlock = {createBlock} sortClick = {sortClick} setSmartAdd = {setSmartAdd} smartAdd = {smartAdd}/>
        </div>
    );
}

export default App;
