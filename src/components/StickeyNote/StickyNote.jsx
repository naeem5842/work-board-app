import React ,{useState} from 'react';
import './StickeyNote.css'

function StickyNote(prop){

    const[showOptins , setShowOptions] = useState(false);
    const[clickPoint, setClickPoint] = useState({
        x:0,
        y:0
    });

    const[secOption , setSecOption] = useState(false);

    const[disabled, setDisabled] =useState({
        todo:true,
        inprogress:true,
        done:true
    });

    function showOptions(event){
        
        setShowOptions(!showOptins);
        setClickPoint({
            x:event.pageX,
            y:event.pageY,
        })
        event.preventDefault();
    }


    function showSecMenu(){
        handleDisabled();
        setShowOptions(true);
        setSecOption(true);
        

    }

    function closeSecMenu(){
        setSecOption(false);
    }


    function handleSecMenuClick(event){
            setShowOptions(false);
            prop.onSecMenuClick(prop.id, event);
            
    }

    function handleDisabled(){
        setDisabled((prevValue)=>{return{
            ...prevValue,
            [prop.position]:false
        }})
    }

    function handleDelete(){
        prop.onClickDelete(prop.id)
        setShowOptions(false);
    }

    function handleArchive(){
        setShowOptions(false)
    }

    return(
        <>
        
        <div className='note' onContextMenu={showOptions}>
            <h3>{prop.title}</h3>
            <p>{prop.description}</p>
        </div>


        {showOptins &&(
            <div className='contextMenu' 
                 style={{
                     left:clickPoint.x,
                     top:clickPoint.y
                 }}>

                    <div className='pri-contextmenu'>
                    <ul>
                        <li onMouseOver={showSecMenu} onMouseLeave={closeSecMenu}>Send To</li>
                        <li onClick={handleDelete}>Delete</li>
                        <li onClick={handleArchive}>Archive</li>
                    </ul>
                    </div>
            

            {
            secOption &&(
                <div onMouseEnter={showSecMenu}
                     onMouseLeave={closeSecMenu}
                     className='sec-contextmenu'>
                    <ul >
                        {disabled.todo &&<li value='1' onClick={ handleSecMenuClick} >To Do</li>}
                        {disabled.inprogress &&<li value='2' onClick={ handleSecMenuClick}>In Progress</li>}
                        {disabled.done && <li value ='3' onClick={ handleSecMenuClick}>Done</li>}
                    </ul>
                </div>
            )
        }



        </div>
        )}

       

        </>
    )
}
export default StickyNote;