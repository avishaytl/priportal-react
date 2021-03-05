import '../App.css'; 
import '../App.scss';  
import React, { useEffect, useState } from 'react'; 
import ReactTooltip from 'react-tooltip'; 
import { push as Menu } from 'react-burger-menu'; 
import { FiSettings, FiSearch } from 'react-icons/fi'; 
import { BiMessageRoundedDetail, BiNotepad } from 'react-icons/bi'; 
import { AiFillFileAdd, AiOutlineStar, AiFillHome, AiFillFolderOpen, AiFillFolder, AiOutlineFolderOpen, AiOutlineFolder, AiOutlineUser  } from 'react-icons/ai'; 
import { HiOutlineDocumentSearch } from 'react-icons/hi';       
import { RiPinDistanceLine, RiSendPlaneFill } from 'react-icons/ri';       
import { MdLocalOffer, MdLocalHospital } from 'react-icons/md'; 
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';  
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';  
import ListItem from "@material-ui/core/ListItem"; 
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import styled from 'styled-components';

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
    let ho = props.darkState ? '#141414' : '#cecece';
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
                            <p className={`margin0-padding0 font20 ${styles.color}`}>{item.categorie.label}</p>
                            {item.category !== null ? open ? <FcOpenedFolder className={`menu-folder`}/> : <FcFolder className={`menu-folder`}/> : null} 
                        </div>
                        {item.category !== null ? open ? <TiArrowSortedUp className={`margin0-padding0 menu-arrow ${styles.color}`}/> : <TiArrowSortedDown className={`margin0-padding0 menu-arrow ${styles.color}`}/> : null}
                    </div>
                </MenuItem>
            </ListItem>
            {item.category !== null ? <>
                <Collapse key={props.index} in={open} timeout="auto" unmountOnExit>
                    <List key={props.index} component="div" disablePadding>
                        {item.category.map((ite: any,l: any) => { 
                            if(ite.category)
                                return <div style={{paddingRight:5}} key={l}>
                                            <ListChild darkState={props.darkState} key={l} styles={styles} item={ite} index={l}/> 
                                        </div>
                            return  <MenuItem>
                                        <ListItem key={l}>
                                            <div style={{paddingRight:5}} id={`menu1`} className={`menu-item`}>
                                                <div className={`menu-text ${styles.menuItem}`}>  
                                                    <p className={`margin0-padding0 font20 ${styles.color}`}>{ite.categorie.label}</p>
                                                    <BiNotepad className={`menu-folder`}/>
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
        {categorie: {label:'מלאי'}, id: 5, category: [{
            categorie: {label:'כרטיס פריט'}, id: 55, category: null}]}],  
  
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
        <div className={`main-user-bar ${styles.primaryMenuB}`}>
            <div onClick={()=>props.setMenuOpen(!props.isMenuOpen)}  className={`user-bar-bg-click`}/> 
            <p className={`user-bar-title ${styles.light}`}>
                {data.barCompanyName}
            </p>
            <div className={`user-bar-img ${styles.lightB}`}>
                <img className={`bar-img`} src='http://demo.softsolutions.co.il/images/mobilelogo.png' alt='logo'/>    
            </div> 
            <div className={`user-bar-container`}>
                <div className={`user-bar-grid-icons`}> 
                    <div className={`grid-item hvr-grow`}>
                        <FiSearch data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.light}`}/>
                    </div>
                    <div className={`grid-item hvr-grow`}>
                        <AiFillFileAdd data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.light}`}/>
                    </div>
                    <div className={`grid-item hvr-grow`}>
                        <AiOutlineStar data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.light}`}/>
                    </div>  
                    <div className={`grid-item hvr-grow`}>
                        <AiFillHome data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.light}`}/>
                    </div>
                    <div className={`grid-item hvr-grow`}>
                        <AiFillFolderOpen data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.light}`}/>
                    </div>
                    <div className={`grid-item hvr-grow`}>
                        <AiFillFolder data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.light}`}/>
                    </div>
                </div> 
            </div>
            <div className={`user-bar-footer`}>
                <div className={`bar-footer-icons`}>
                    <div className={`footer-item hvr-grow`}> 
                        {data.userMsg ? <div className={`user-msg-ball`}>
                            <p className={`margin0-padding0 msg-text`}>{data.userMsg}</p>
                        </div> : null}
                        <BiMessageRoundedDetail style={{fontSize:34}} data-tip={tooltip.msgIcon} className={`footer-user-icon ${styles.light}`}/>
                    </div>
                    <div className={`footer-item hvr-grow`}> 
                        <FiSettings data-tip={tooltip.settingsIcon} className={`footer-user-icon ${styles.light}`}/>
                    </div>
                </div>
            </div>
        </div>
    );
} 

function Main(props: any) {  
    const [isMenuOpen,setMenuOpen] = useState(false) 
    const styles = props.styles; 
    document.onkeydown = keyboardDown;

    function keyboardDown(e: any){
        console.debug(e.keyCode,e.key)
        if(e.keyCode === 68)//d
            setMenuOpen(!isMenuOpen)
        
    }
    return( <div className={`main-screen ${styles.background}`}>
          <ReactTooltip /> 
          <div id={`outer-container`}>
            <ContextMenu darkState={props.darkState} isMenuOpen={isMenuOpen} pageWrapId={ `page-wrap` } outerContainerId={ `outer-container` } styles={styles}/> 
            <main id={`page-wrap`}> 
              <div className={'main-container'}>
                <UserMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} styles={styles}/>
              </div>
            </main>
          </div>
        </div>)
}

export default Main;