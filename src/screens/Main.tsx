import '../App.css'; 
import '../App.scss';  
import React, { useEffect, useState } from 'react'; 
import ReactTooltip from 'react-tooltip'; 
import { push as Menu } from 'react-burger-menu'; 
import { FiSettings, FiSearch } from 'react-icons/fi'; 
import { BiMessageRoundedDetail, BiNotepad } from 'react-icons/bi'; 
import { AiFillFileAdd, AiOutlineStar, AiFillHome, AiFillFolderOpen, AiFillFolder, AiTwotoneSetting, AiOutlineFolder, AiOutlineUser, AiOutlineBell  } from 'react-icons/ai'; 
import { HiOutlineDocumentSearch } from 'react-icons/hi';       
import { RiPinDistanceLine, RiSendPlaneFill } from 'react-icons/ri';       
import { MdLocalOffer, MdLocalHospital } from 'react-icons/md'; 
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';  
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';   
import { BsBellFill } from 'react-icons/bs';
import ListItem from "@material-ui/core/ListItem"; 
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {useSpring, animated} from 'react-spring';  

document.onkeyup = keyboardUp;
document.oncontextmenu = function(e){
// var evt = new Object({keyCode:93});
stopEvent(e);
// keyboardUp(evt);
}

function stopEvent(event: any){
if(event.preventDefault !== undefined)
    event.preventDefault();
if(event.stopPropagation !== undefined)
    event.stopPropagation();
}

function keyboardUp(e: any){
// alert('keyboardUp')
}

function ListChild(props: any){
    const [open, setOpen] = useState(false);
    let handleClick = () => {
        setOpen(!open)
    }
    console.debug('props.darkState',props.darkState)
    const item = props.item;
    const styles = props.styles 
    let bg = props.darkState ? '#303030' : '#ececec';
    let ho = props.darkState ? '#141414' : '#bebebe';
    const MenuItem = styled.div` 
        flex:1;
        :hover {
            background: ${ho}; 
        }
    `
    return (
        <React.Fragment key={props.index}>
            <ListItem key={props.index} onClick={handleClick}> 
                <MenuItem>
                    <div id={`menu1`} className={`menu-item`}>
                        <div className={`menu-text ${styles.menuItem}`}> 
                            <p className={`margin0-padding0 font20  ${styles.color}`}>{item.categorie.label}</p>
                            {item.category !== null ? open ? <FcOpenedFolder className={`menu-folder`}/> : <FcFolder className={`menu-folder`}/> : null} 
                        </div>
                        {/* {item.category !== null ? open ? <IoIosArrowUp className={`margin0-padding0 menu-arrow ${styles.color}`}/> : <IoIosArrowDown className={`margin0-padding0 menu-arrow ${styles.color}`}/> : null} */}
                    </div>
                </MenuItem>
            </ListItem>
            {item.category !== null ? <>
                <Collapse key={props.index} in={open} timeout="auto" unmountOnExit>
                    <List key={props.index} component="div" disablePadding>
                        {item.category.map((ite: any,l: any) => { 
                            if(ite.category)
                                return <div style={{paddingRight:5}} className={`${styles.menuBackground}`} key={l}>
                                            <ListChild darkState={props.darkState} key={l} styles={styles} item={ite} ket={l} index={l}/> 
                                        </div>
                            return  <MenuItem key={l}>
                                        <ListItem key={l}>
                                            <div style={{paddingRight:5}} id={`menu1`} className={`menu-item ${styles.menuBackground}`}>
                                                <div className={`menu-text ${styles.menuItem}`}>  
                                                    <p className={`margin0-padding0 font20 ${styles.color}`}>{ite.categorie.label}</p>
                                                    <BiNotepad className={`menu-folder ${styles.color}`}/>
                                                </div>
                                            </div>
                                        </ListItem>
                                    </MenuItem>
                        })}
                    </List>
                </Collapse>
            </> : null}
        </React.Fragment>
    )  
}

function CategoryList(props: any){ 
    let data = props.data.map((item: any, k: any) => {
        return (<ListChild key={k} darkState={props.darkState} item={item} index={k} styles={props.styles} />) 
    });
    return data;
} 

const tooltip = {
    homeIcon: 'הוספה למסך בית',
    settingsIcon: 'הגדרות',
    moduleIcon: 'קיצור דרך ',
    msgIcon: 'הודעות',
}
  
const data = { 
    barCompanyName: 'סביבת הדגמה',  
    userMsg: 3,
    menuCategories: [{
        categorie: {label:'שיווק ומכירות'}, id: 1, category: [{
            categorie: {label:'1מכירות'}, id: 11, category: [{
                categorie: {label:'2מכירות'}, id: 111, category:[{
                    categorie: {label:'קריאות שירות'}, id: 33, category: null}]}]}]},
        {categorie: {label:'דו"חות'}, id: 2 ,category: [{
            categorie: {label:'כרטיס עובד'}, id: 22, category: null}]},
        {categorie: {label:'שירות ואחזקה'}, id: 3 ,category: [{
            categorie: {label:'קריאות שירות'}, id: 33, category: null}]},
        {categorie: {label:'הנהלת חשבונות'}, id: 4 ,category: [{
            categorie: {label:'הנהלה'}, id: 44, category: null}]},
        {categorie: {label:'שירות ואחזקה'}, id: 3 ,category: [{
            categorie: {label:'קריאות שירות'}, id: 33, category: null}]},
        {categorie: {label:'הנהלת חשבונות'}, id: 4 ,category: [{
            categorie: {label:'הנהלה'}, id: 44, category: null}]},
        {categorie: {label:'שירות ואחזקה'}, id: 3 ,category: [{
            categorie: {label:'קריאות שירות'}, id: 33, category: null}]},
        {categorie: {label:'הנהלת חשבונות'}, id: 4 ,category: [{
            categorie: {label:'הנהלה'}, id: 44, category: null}]},
        {categorie: {label:'שירות ואחזקה'}, id: 3 ,category: [{
            categorie: {label:'קריאות שירות'}, id: 33, category: null}]},
        {categorie: {label:'הנהלת חשבונות'}, id: 4 ,category: [{
            categorie: {label:'הנהלה'}, id: 44, category: null}]},
        {categorie: {label:'שיווק ומכירות'}, id: 1, category: [{
                categorie: {label:'1מכירות'}, id: 11, category: [{
                    categorie: {label:'2מכירות'}, id: 111, category:[{
                        categorie: {label:'קריאות שירות'}, id: 33, category: null}]}]}]},
        {categorie: {label:'מלאי'}, id: 5, category: [{
            categorie: {label:'כרטיס פריט'}, id: 55, category: null}]}],  
  
}  
 
function runSortCut(str: any){
    alert(str)
}

function ContextMenu(props: any) { 
    const styles = props.styles;  
    return( <Menu burgerBarClassName={styles.backgroundNative} isOpen={props.isMenuOpen} pageWrapId={props.pageWrapId} outerContainerId={props.outerContainerId} className={`burger-menu ${styles.background}`} right >
                <div className={`menu-list`}> 
                    <CategoryList darkState={props.darkState} data={data.menuCategories} styles={styles}/>
                </div>
            </Menu>)
    
} 

function UserMenu(props: any) {
    const styles = props.styles;
    return ( 
        <div className={`main-user-bar ${styles.background}`}>
            <div onClick={()=>props.setMenuOpen(!props.isMenuOpen)}  className={`user-bar-bg-click`}/> 
            <div className={`user-bar-img ${styles.lightB}`}>
                <img className={`bar-img`} src='http://demo.softsolutions.co.il/images/mobilelogo.png' alt='logo'/>    
            </div>  
            <div className={`user-bar-container`}>
                <div className={`user-bar-grid-icons`}> 
                    <div className={`grid-item hvr-grow `}>
                        <FiSearch data-tip={tooltip.moduleIcon + '1'} onClick={()=>runSortCut(tooltip.moduleIcon + '1')} className={`bar-user-icon ${styles.color}`}/>
                    </div>
                    <div className={`grid-item hvr-grow `}>
                        <AiFillFileAdd data-tip={tooltip.moduleIcon + '2'} onClick={()=>runSortCut(tooltip.moduleIcon + '2')}  className={`bar-user-icon ${styles.color}`}/>
                    </div>
                    <div className={`grid-item hvr-grow `}>
                        <AiOutlineStar data-tip={tooltip.moduleIcon + '3'} onClick={()=>runSortCut(tooltip.moduleIcon + '3')}  className={`bar-user-icon ${styles.color}`}/>
                    </div>  
                    <div className={`grid-item hvr-grow  `}>
                        <RiSendPlaneFill data-tip={tooltip.moduleIcon + '4'} onClick={()=>runSortCut(tooltip.moduleIcon + '4')}  className={`bar-user-icon ${styles.color}`}/>
                    </div>
                    <div className={`grid-item hvr-grow  `}>
                        <AiFillFolderOpen data-tip={tooltip.moduleIcon + '5'} onClick={()=>runSortCut(tooltip.moduleIcon + '5')}  className={`bar-user-icon ${styles.color}`}/>
                    </div>
                    <div className={`grid-item hvr-grow  `}>
                        <AiFillFolder data-tip={tooltip.moduleIcon + '6'} onClick={()=>runSortCut(tooltip.moduleIcon + '6')}  className={`bar-user-icon ${styles.color}`}/>
                    </div>
                    <div className={`grid-item hvr-grow  `}>
                        {data.userMsg ? <div className={`user-msg-ball`}>
                            <p className={`margin0-padding0 msg-text`}>{data.userMsg}</p>
                        </div> : null}
                        <BsBellFill data-tip={tooltip.msgIcon} className={`bar-user-icon ${styles.color}`}/>
                    </div>
                    <div className={`grid-item hvr-grow  `}>
                        <AiTwotoneSetting data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.color}`}/>
                    </div>
                </div> 
            </div> 
        </div>
    );
} 

function MainContainer ({ on, child }:any) {
    const mainProps = useSpring({ opacity: on ? 1 : 0, from: { opacity: on ? 0 : 1} }); 
    return  <animated.div style={mainProps} >    
                {child}
          </animated.div> 
}; 

function Main(props: any) {  
    const [isMenuOpen,setMenuOpen] = useState(false) 
    const [isReady,setIsReady] = useState(false);
    const [isBackPress,setBackPress] = useState(false);
    const styles = props.styles; 
    document.onkeydown = keyboardDown;

    function keyboardDown(e: any){
        console.debug(e.keyCode,e.key)
        let str = ' קיצור דרך ';
        if(e.keyCode === 68)//d
            setMenuOpen(!isMenuOpen)
        if(e.keyCode === 49)
            runSortCut(str + 1)
        if(e.keyCode === 50)
            runSortCut(str + 2) 
        if(e.keyCode === 51)
            runSortCut(str + 3) 
        if(e.keyCode === 52)
            runSortCut(str + 4) 
        if(e.keyCode === 53)
            runSortCut(str + 5)
        if(e.keyCode === 53)
            runSortCut(str + 6)
    }



    const [ locationKeys, setLocationKeys ]:any = useState([])
    const history = useHistory()
     
    useEffect(()=>{
        if(!isReady){ 
            setIsReady(true)
            setTimeout(() => {
                setMenuOpen(true) 
            }, 1000);
        } 

        return history.listen((location: any) => {
          if (history.action === 'PUSH') {
            setLocationKeys([ location.key ])
          }
      
          if (history.action === 'POP') {
            if (locationKeys[1] === location.key) {
                setBackPress(true) 
                setMenuOpen(false) 
                setTimeout(() => {
                    setLocationKeys(([ _, ...keys ]:any) => keys) 
                }, 1700);
      
              // Handle forward event
      
            } else {
              setLocationKeys((keys: any) => [ location.key, ...keys ])
      
              // Handle back event
      
            }
          }
        })
    }, [ locationKeys, isReady ])

    return( <div className={`main-screen ${styles.background} ${isReady ? styles.transform : ``}`}>
            <MainContainer on={!isBackPress} child={
                <>
                    <ReactTooltip place={'left'}/> 
                    <div id={`outer-container`}>
                        <ContextMenu darkState={props.darkState} isMenuOpen={isMenuOpen} pageWrapId={ `page-wrap` } outerContainerId={ `outer-container` } styles={styles}/> 
                        <main id={`page-wrap`}> 
                        <div className={'main-container'}>
                            <div className={`main ${styles.primaryMenuB}`}>
                                <div style={{width:10}}/>
                                <div className={`main-header`}> 
                                    <div className={`user-title`}> 
                                        <IoIosArrowDown style={{fontSize:16,margin:5}} className={`margin0-padding0 ${styles.color}`}/>
                                        <p className={`user-bar-title ${styles.color}`}>
                                            {data.barCompanyName}
                                        </p>  
                                    </div>
                                </div>
                                <div className={`main-inside`}>

                                </div>
                            </div>
                            <UserMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} styles={styles}/>
                        </div>
                        </main>
                    </div> 
                </> 
            }/> 
        </div>)
}

export default Main;