import '../App.css'; 
import '../App.scss';  
import React, { useEffect, useState } from 'react';    
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {useSpring, animated} from 'react-spring';  
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';   
import { useStore } from '../storeui/storeui' 
import UserMenu from '../components/UserMenu';
import UserDashboard from '../components/UserDashboard';   
import MemoComponent from '../components/charts/MemoComponent';

function getRandomArbitrary(min: number, max: number) { 
    return `${(Math.random() * (max - min) + min).toFixed(0)}`;
  }
  
const data = { 
    barCompanyName: 'סביבת הדגמה',  
    colors: {primary: '#121e34',secondary:'#314570', tertiary: '#1e2c4c'},
    userMsg: 3,
    menuCategories: [{
        categorie: {label:'מכירות', selectedIcon: 'MdLocalGroceryStore', icon: 'MdStore'}, id: 1, category: [{
            categorie: {label:'1מכירות'}, id: 11, category: [{
                categorie: {label:'2מכירות'}, id: 111, category:[{
                    categorie: {label:'קריאות שירות'}, id: 33, category: null}]},{
                        categorie: {label:'כרטיס עובד'}, id: 22, category: null}]},{
                            categorie: {label:'כרטיס עובד'}, id: 22, category: null}]},
        {categorie: {label:'דו"חות', selectedIcon: 'MdEventNote', icon: 'MdEventAvailable'}, id: 2 ,category: [{
            categorie: {label:'כרטיס עובד'}, id: 22, category: null},{
                categorie: {label:'כרטיס עובד'}, id: 22, category: null},{
            categorie: {label:'כרטיס עובד'}, id: 22, category: null}]},
        {categorie: {label:'שירות', selectedIcon: 'MdBuild', icon: 'MdCached'}, id: 3 ,category: [{
            categorie: {label:'קריאות שירות'}, id: 33, category: null}]},
        {categorie: {label:'חשבונות', selectedIcon: 'MdDns', icon: 'MdDescription'}, id: 4 ,category: [{
            categorie: {label:'הנהלה'}, id: 44, category: null}]},
        {categorie: {label:'לקוחות', selectedIcon: 'MdEventNote', icon: 'MdEventBusy'}, id: 3 ,category: [{
            categorie: {label:'קריאות שירות'}, id: 33, category: null}]},
        {categorie: {label:'מלאי', selectedIcon: 'MdInsertChart', icon: 'MdChildFriendly'}, id: 4 ,category: [{
            categorie: {label:'1הנהלה'}, id: 44, category: null}]},
        {categorie: {label:'מוצרים', selectedIcon: 'MdChatBubbleOutline', icon: 'MdChat'}, id: 3 ,category: [{
            categorie: {label:'קריאות שירות'}, id: 33, category: null}]},
        {categorie: {label:'כרטיס פריט', selectedIcon: 'MdGroupAdd', icon: 'MdGroup'}, id: 4 ,category: [{
            categorie: {label:'2הנהלה'}, id: 44, category: null}]}, 
    ], 
    dashboard:[
        { type: 'table',onRowPress: (key:string)=>{alert(key)}, onRowIconPress: (key:string)=>{alert(key)}, position: {x: 0, y: 0}, data: [
            {key:1, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `208$`, secVal: `19.2.2`, icon1: true, icon2: false, icon3: true,title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
            {key:2, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `258$`, secVal: `18.2.2`, icon1: false, icon2: true, icon3: false, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
            {key:3, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `8$`, secVal: `17.2.2`, icon1: true, icon2: true, icon3: false, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
            {key:4, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `28$`, secVal: `16.2.2`, icon1: true, icon2: true, icon3: true, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
            {key:5, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `0$`, secVal: `15.2.2`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
            {key:6, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `25$`, secVal: `14.2.2`, icon1: false, icon2: true, icon3: true, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
            {key:7, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `58$`, secVal: `13.2.2`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
            {key:8, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `250$`, secVal: `12.2.2`, icon1: true, icon2: true, icon3: false, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
            {key:9, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `208$`, secVal: `11.2.2`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
            {key:10, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `2508$`, secVal: `1.2.2`, icon1: false, icon2: true, icon3: false, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
            {key:11, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `258$`, secVal: `2.2.2`, icon1: true, icon2: true, icon3: true, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
        ]},
        { type: 'graph',onRowPress: (key:string)=>{alert(key)}, onRowIconPress: (key:string)=>{alert(key)}, position: {x: 0, y: 0}, data: [
            {key:1, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `12`, icon1: true, icon2: true, icon3: true, title: `מאי`, cTitle: `מאי`},
            {key:2, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `19`, icon1: false, icon2: true, icon3: true, title: `יוני`, cTitle: `יוני`},
            {key:3, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `9`, icon1: true, icon2: false, icon3: false, title: `יולי`, cTitle: `יולי`},
            {key:4, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `5`, icon1: true, icon2: true, icon3: true, title: `אוגוסט`, cTitle: `אוג`},
            {key:5, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `8`, icon1: true, icon2: true, icon3: false, title: `ספטמבר`, cTitle: `ספט`},
            {key:6, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `3`, icon1: false, icon2: false, icon3: true, title: `נובמבר`, cTitle: `נוב`},
            {key:7, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `10`, icon1: true, icon2: true, icon3: false, title: `דצמבר`, cTitle: `דצמ`},
            {key:8, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `1`, icon1: true, icon2: true, icon3: true, title: `ינואר`, cTitle: `ינו`},
        ]},
        { type: 'value',onRowPress: (key:string)=>{alert(key)}, onRowIconPress: (key:string)=>{alert(key)}, position: {x: 0, y: 0}, data: {key: 1,background: '#01cb9e'}},
        { type: 'value',onRowPress: (key:string)=>{alert(key)}, onRowIconPress: (key:string)=>{alert(key)}, position: {x: 0, y: 0}, data: {key: 2,background: '#e84949'}},
        { type: 'value',onRowPress: (key:string)=>{alert(key)}, onRowIconPress: (key:string)=>{alert(key)}, position: {x: 0, y: 0}, data: {key: 3,background: '#fad16b'}},
        { type: 'pie',onRowPress: (key:string)=>{alert(key)}, onRowIconPress: (key:string)=>{alert(key)}, position: {x: 0, y: 0}, data:[] },
        { type: 'dough',onRowPress: (key:string)=>{alert(key)}, onRowIconPress: (key:string)=>{alert(key)}, position: {x: 0, y: 0}, data: [
            {key:1, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `30`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`},
            {key:2, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `25`, icon1: true, icon2: false, icon3: false, title: `לורם איפסום`},
            {key:3, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `20`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`},
            {key:4, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `10`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`}, 
            {key:5, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `30`, icon1: true, icon2: true, icon3: true, title: `לורם איפסום`},
            {key:6, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `25`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`},
            {key:7, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `20`, icon1: true, icon2: true, icon3: true, title: `לורם איפסום`}, 
            {key:8, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `25`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`},
            {key:9, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `20`, icon1: true, icon2: true, icon3: true, title: `לורם איפסום`}, 
            {key:10, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `25`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`},
            {key:11, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `20`, icon1: true, icon2: true, icon3: true, title: `לורם איפסום`}, 
            {key:12, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `20`, icon1: true, icon2: true, icon3: true, title: `לורם איפסום`}, 
            {key:13, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `25`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`},
            {key:14, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `20`, icon1: true, icon2: true, icon3: true, title: `לורם איפסום`}, 
        ]}, 
    ]
  
}  
 

const MenuStyle = styled.div<any>` 
    flex:1;   
    background-image: linear-gradient(to top,${props => props.colors.primary},${props => props.colors.secondary},${props => props.colors.secondary},${props => props.colors.tertiary});
    border-top-left-radius: 10px;
    -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.55);
    -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.55);
    box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.55); 
    margin:0px;
    padding:0px;
`
const Dashboard = styled.div` 
    width: 100%;
    height: 100vh; 
    display: flex;
    flex-direction: column;  
    align-items: flex-end; 
    justify-content: flex-start;
    
`
const MenuItemStyle = styled.div` 
    flex:1;
    :hover { 
        background: ${'#2C324D'}; 
        color: #f1f1f1; 
    }`  

function stopEvent(event: any){
    if(event.preventDefault !== undefined)
        event.preventDefault();
    if(event.stopPropagation !== undefined)
        event.stopPropagation();
}

function keyboardUp(e: any){
// alert('keyboardUp')
}

const tooltip = {
    homeIcon: 'הוספה למסך בית',
    settingsIcon: 'הגדרות',
    moduleIcon: 'קיצור דרך ',
    msgIcon: 'הודעות',
}

interface category{
    label: string;
    selectedIcon: string;
    icon: string; 
}
 
function runSortCut(str: any){
    alert(str)
}


function MenuView ({ on, child, styles, colors, setMenuRef }:any) { 
    const mainProps = useSpring({ width: on ? 200 : 90, from: { width: on ? 200 : 90 } });  
    return  <animated.div ref={setMenuRef} id={`menu-view`} className={`menu-view ${styles.background}`} style={mainProps} >  
                <MenuStyle colors={colors} className={'menu-styled'}>
                    {child} 
                </MenuStyle>
          </animated.div> 
}; 

function DashboardView ({ on, child, styles, setMenuOpen }:any) {
    const [isDashboardReady,setDashboardReady] = useState(false)
    const mainProps = useSpring({ opacity: isDashboardReady ? 1 : 0, from: { opacity: isDashboardReady ? 1 : 0 } });   
    setTimeout(() => {
        setDashboardReady(true) 
    }, 750);
    return  <animated.div className={`main-dashboard`} style={mainProps} >    
                <Dashboard>
                    {isDashboardReady ? child : null}
                </Dashboard>
          </animated.div> 
}; 

const initialState = {
    mouseX: null,
    mouseY: null,
  };
  
function Main(props: any) { 
    console.debug('Main Main') 
    const store = useStore()  
    const [isMenuOpen,setMenuPos] = useState(false) 
    const [isReady,setIsReady] = useState(false);
    const styles = props.styles; 
    const [ locationKeys, setLocationKeys ]:any = useState([])
    const history = useHistory() 
    const [state, setState]:any = React.useState(initialState);
    const setMenuRef: any = React.useRef(null); 
    const setMenuOpen = (pos: boolean) =>{
        setMenuPos(pos)
    }
    const options = [
        'העתק',
        'הדבק',
        'קיצור דרך 1',
        'קיצור דרך 2',
        'קיצור דרך 3',
        'קיצור דרך 4',
        'קיצור דרך 5',
        'קיצור דרך 6',
      ];
      const handleClick = (event: any) => {
          if(isMenuOpen){
            setMenuOpen(false)  
            setTimeout(() => { 
                store.setRightMenuOpen(true); 
                event.preventDefault();
                setState({
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                });
            }, 550); 
          }else{ 
            store.setRightMenuOpen(true); 
            event.preventDefault();
            setState({
                mouseX: event.clientX - 2,
                mouseY: event.clientY - 4,
            }); 
          }
      };
  
      const handleClose = () => {
          setState(initialState);
          setTimeout(() => {
            store.setRightMenuOpen(false); 
          }, 250);
      };
    
    const handleMenuItemClick = (event: any, index: any) => {
        // setSelectedIndex(index);
        setState(initialState);
        setTimeout(() => {
          store.setRightMenuOpen(false); 
        }, 250);
    }; 

    document.onkeydown = keyboardDown;document.onkeyup = keyboardUp;
    document.oncontextmenu = function(e){
    // var evt = new Object({keyCode:93});
        console.debug('e.currentTarget',e.currentTarget)
        // handleClickListItem(e)
        stopEvent(e);
    // keyboardUp(evt);
    }
    const setScreenProps = () =>{  
        if(window.innerWidth <= 680 && window.innerWidth >= 650){
            setMenuRef.current.style.opacity = `1`; 
            setMenuRef.current.style.zIndex = `1`; 
        } 
            // setMenuOpen(!isMenuOpen) 
    }
    useEffect(()=>{
        window.addEventListener('resize',setScreenProps)
        console.debug('main useEffect')
        if(!isReady){ 
            setIsReady(true)
            setTimeout(() => {   
                setMenuOpen(true) 
                setTimeout(() => { 
                    store.setEndAnime(true); 
                }, 1200);
            }, 1000);
        } 

        return history.listen((location: any) => {
          if (history.action === 'PUSH') {
            setLocationKeys([ location.key ])
          }
      
          if (history.action === 'POP') {
            if (locationKeys[1] === location.key) {
                // setBackPress(true) 
                setMenuOpen(false) 
                // setTimeout(() => {
                    setLocationKeys(([ _, ...keys ]:any) => keys) 
                // }, 1700);
      
              // Handle forward event
      
            } else {
              setLocationKeys((keys: any) => [ location.key, ...keys ])
      
              // Handle back event
      
            }
          }
        })
    }, [ locationKeys, isReady ]) 

    function keyboardDown(e: any){
        console.debug(e.keyCode,e.key)
        let str = ' קיצור דרך ';
        if(!store.isRightMenuOpen && e.keyCode === 68){//d   
            console.debug('setMenuRef',window.innerWidth)  
            if(setMenuRef && setMenuRef.current && setMenuRef.current.style){
                if(window.innerWidth <= 680)
                    if((setMenuRef.current.style.opacity === '' || setMenuRef.current.style.opacity === '0') || setMenuRef.current.style.zIndex === '-1'){ 
                        setMenuRef.current.style.opacity = `1`; 
                        setMenuRef.current.style.zIndex = `1`;
    
                    }else { 
                        setMenuRef.current.style.opacity = `0`; 
                        setMenuRef.current.style.zIndex = `-1`;
        
                    }
                else { 
                    setMenuRef.current.style.opacity = `1`; 
                    setMenuRef.current.style.zIndex = `1`;
                }
                if(setMenuRef.current.style.width !== '200px' && setMenuRef.current.style.width !== '90px') 
                    setMenuRef.current.style.display = 'absolute' 
                setMenuOpen(!isMenuOpen)
                if(window.innerWidth <= 680)
                    setMenuOpen(true)
            } 
        }  
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
    // let ho = props.darkState ? '#bebebe' : '#bebebe';
        // onContextMenu={handleClick}
    return( <div onContextMenu={handleClick} className={`main-screen ${styles.background} ${isReady ? styles.transform : ``}`}> 
            <Menu  
                dir={'rtl'}
                keepMounted
                open={state.mouseY !== null}
                onClose={handleClose}
                anchorReference="anchorPosition" 
                anchorPosition={
                state.mouseY !== null && state.mouseX !== null
                    ? { top: state.mouseY, left: state.mouseX }
                    : undefined
                } 
            > 
                {options.map((option, index) => (
                <MenuItem 
                    style={{fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`}}
                    key={option}
                    disabled={index === 0 || index === 1}
                    // selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                >
                    <MenuItemStyle>
                        {option}
                    </MenuItemStyle>
                </MenuItem>
                ))} 
            </Menu>  
            <div className={'main-container'}>   
                <MemoComponent child={<DashboardView
                    styles={styles} 
                    setMenuOpen={setMenuOpen} 
                    child={<UserDashboard colors={data.colors} data={data.dashboard} setMenuRef={setMenuRef} isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />}/>  }/>   
                <MenuView  
                    colors={data.colors}
                    setMenuRef={setMenuRef} 
                    styles={styles} 
                    setMenuOpen={setMenuOpen} 
                    on={isMenuOpen} 
                    child={<UserMenu colors={data.colors} data={data.menuCategories} setMenuRef={setMenuRef} darkState={props.darkState} isMenuOpen={isMenuOpen} setMenuPos={setMenuOpen} styles={styles}/>}/>   
            </div>
        </div>)
}

export default Main;