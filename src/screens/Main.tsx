import '../App.css'; 
import '../App.scss';  
import React, { useEffect, useState } from 'react'; 
import ReactTooltip from 'react-tooltip'; 
// import { push as MenuPush } from 'react-burger-menu';  
import { AiOutlineFolder, AiTwotoneFolderOpen, AiOutlineAppstore } from 'react-icons/ai';  
import { BiNotepad } from 'react-icons/bi';      
import { BsBell } from 'react-icons/bs';       
import { CgMenuRightAlt } from 'react-icons/cg'; 
import { IoCloseOutline } from 'react-icons/io5';  
import { FaAlignCenter } from 'react-icons/fa';        
import * as mdIcons from 'react-icons/md';      
import ListItem from "@material-ui/core/ListItem"; 
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import styled , {keyframes} from 'styled-components';
import { useHistory } from 'react-router-dom';
import {useSpring, animated} from 'react-spring';  
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';  
import { Scrollbars } from 'react-custom-scrollbars';
import LocalStorageLayout from '../components/Gridlayout';   
import imgdashboard from '../dashboard.png';  
import ReactDOM from 'react-dom'; 
import GridLayout from 'react-grid-layout';
import { useStore } from '../storeui/storeui'
import { Observer } from 'mobx-react-lite';

class MyFirstGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div>
      </GridLayout>
    )
  }
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
    const handleClick = () => {
        setOpen(!open)
    }
    // console.debug('props.darkState',props.darkState)
    const item = props.item;
    const styles = props.styles 
    let bg = props.darkState ? '#202020' : '#f1f1f1';
    let ho = props.darkState ? '#ffffffa0' : '#000000a0';
    const MenuItem = styled.div` 
        flex:1; 
        :hover {
            background: ${ho}; 
        }
    `
    return (
        <React.Fragment key={props.index}>
            <ListItem key={props.index} onClick={handleClick}> 
                <MenuItem key={props.index}>
                    <div className={`menu-item`}>
                        { <div className={`menu-text ${styles.menuItem}`}> 
                            <p className={`margin0-padding0 font20  ${styles.color}`}>{item.categorie.label}</p>
                            {item.category !== null ? open ? <AiTwotoneFolderOpen className={`menu-folder`}/> : <AiOutlineFolder className={`menu-folder`}/> : <BiNotepad className={`menu-folder ${styles.color}`}/>} 
                        </div>   }
                        {/* {item.category !== null ? open ? <IoIosArrowUp className={`margin0-padding0 menu-arrow ${styles.color}`}/> : <IoIosArrowDown className={`margin0-padding0 menu-arrow ${styles.color}`}/> : null} */}
                    </div>
                </MenuItem>
            </ListItem>
            {item.category !== null ? <>
                <Collapse key={props.index} in={open} timeout="auto" unmountOnExit>
                    <List key={props.index} component="div" disablePadding>
                        {item.category.map((ite: any,l: any) => { 
                            if(ite.category)
                                return <div key={l}>
                                            <ListChild darkState={props.darkState} key={l} styles={styles} item={ite} index={l}/> 
                                        </div>
                            return  <ListItem key={l}>
                                            <MenuItem  key={l}>
                                                <div className={`menu-item `}>
                                                    <div className={`menu-text ${styles.menuItem}`}>  
                                                        <p className={`margin0-padding0 font20 ${styles.color}`}>{ite.categorie.label}</p>
                                                        <BiNotepad className={`menu-folder ${styles.color}`}/>
                                                    </div>
                                                </div>
                                            </MenuItem>
                                    </ListItem>
                        })}
                    </List>
                </Collapse>
            </> : null}
        </React.Fragment>
    )  
}

function CategoryList(props: any){ 
    let data = props.data.map((item: any, k: any) => {
        return (<ListChild isMenuOpen={props.isMenuOpen} setMenuOpen={props.setMenuOpen} key={k} darkState={props.darkState} item={item} index={k} styles={props.styles} />) 
    });
    return data
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

const data = { 
    barCompanyName: 'סביבת הדגמה',  
    userMsg: 3,
    menuCategories: [{
        categorie: {label:'מכירות', selectedIcon: 'MdLocalGroceryStore', icon: 'MdStore'}, id: 1, category: [{
            categorie: {label:'1מכירות'}, id: 11, category: [{
                categorie: {label:'2מכירות'}, id: 111, category:[{
                    categorie: {label:'קריאות שירות'}, id: 33, category: null}]}]}]},
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
        // {categorie: {label:'שירות ואחזקה', selectedIcon: 'MdEventNote', icon: 'MdEventAvailable'}, id: 3 ,category: [{
        //     categorie: {label:'קריאות שירות'}, id: 33, category: null}]},
        // {categorie: {label:'הנהלת חשבונות', selectedIcon: 'MdLocalMall', icon: 'MdLocalLibrary'}, id: 4 ,category: [{
        //     categorie: {label:'3הנהלה'}, id: 44, category: null}]},
        // {categorie: {label:'שיווק ומכירות', selectedIcon: 'MdSettingsApplications', icon: 'MdSettings'}, id: 1, category: [{
        //         categorie: {label:'1מכירות'}, id: 11, category: [{
        //             categorie: {label:'2מכירות'}, id: 111, category:[{
        //                 categorie: {label:'קריאות שירות'}, id: 33, category: null}]}]}]},
        // {categorie: {label:'מלאי למוצר'}, id: 5, category: [{
        //     categorie: {label:'כרטיס פריט'}, id: 55, category: null}]}
        
        ],  
  
}  
 
function runSortCut(str: any){
    alert(str)
}
 

function CategoryListAnime ({ on, child }:any) { 
    const mainProps = useSpring({ opacity: on ? 1 : 0,height: on ? '100%' : '0%', backgroundColor:'#1e2941',overflow:'hidden',  from: { opacity: on ? 0 : 1, height: on ? '0%' : '100%' } }); 
    return  <animated.div style={mainProps} >    
                {child} 
          </animated.div> 
}; 

function UserIconMenu ({ on, child, value, darkState, onClick, isSelectedItem, setMenuOpen, isMenuOpen }:any) {
    const mainPropsIcon = useSpring({ height: on ? 50 : 90,    from: { height: on ? 90 : 50  } });  
    const mainPropsText = useSpring({ top: on ? -40 : 0, paddingTop: on ? 10 : 0, maxWidth: on ? '70%' : '100%', position:'relative',   from: { top: on ? 0 : -40, paddingTop: on ? 0 : 10, maxWidth: on ? '100%' : '70%' } });
    const [isSelected,setSelected]:any = useState(false)
    const store = useStore();

    let ho = darkState ? '#ffffffa0' : '#000000a0';
    const MenuItem = styled.div`
        padding-top: 3px; 
        max-height: ${on ? `40px` : `90px`}; 
        transition-duration: 0.2s; 
        transition-property: transform;   
        background: ${isSelectedItem === value ? `#000000a0;` : `transparent;`}
        transition: transform ease 0.2s;
        transition: background ease 0.3s;
        :hover {
            background: ${ho};  
            transform: scale(1.1);
        }
    `
    return  <animated.div  onClick={()=>{  
                        setSelected(!isSelected)
                        onClick(isSelectedItem === value ? '!' + value : value ) 
                    }}  className={`user-icon-menu`} style={store.isRightMenuOpen ? {} : mainPropsIcon} >   
                <MenuItem>
                    {child}
                    <animated.div className={`user-icon-text-view`} style={store.isRightMenuOpen ? {height: 90} : mainPropsText}>    
                        <p className={`user-icon-text`}>{value}</p>
                    </animated.div>  
                </MenuItem> 
          </animated.div> 
}; 

function renderMenuItems({items, setSelectedItem, isSelectedItem, handleCategoryClick, styles, isCategoryAnime, darkState, isMenuOpen, setMenuOpen}: any) { 
    let data:any = [];   
    for(let i = 0;i < items.length;i++){ 
        const iconNameSelected: keyof typeof mdIcons = items[i].categorie.selectedIcon;
        const iconName: keyof typeof mdIcons = items[i].categorie.icon;
        const IconSelected = mdIcons[iconNameSelected]; 
        const Icon = mdIcons[iconName]; 
        data.push( 
            <>
            <UserIconMenu isSelectedItem={isSelectedItem} styles={styles} onClick={(value: string)=>{ 
                if(isMenuOpen)
                    handleCategoryClick(items[i].categorie.label)
                setSelectedItem(value)
            }} setMenuOpen={setMenuOpen} darkState={darkState} value={items[i].categorie.label} on={isMenuOpen} child={
                <div className={`grid-item hvr-grow `}> 
                    { isSelectedItem === items[i].categorie.label ?  <IconSelected onClick={()=>{
                        setMenuOpen(false)
                        setTimeout(() => {
                            alert(items[i].categorie.label) 
                        }, 250);
                    }} className={`bar-user-icon ${styles.color}`}/>  :  <Icon onClick={()=>{
                        setMenuOpen(false)
                        setTimeout(() => {
                            alert(items[i].categorie.label) 
                        }, 250);
                    }} className={`bar-user-icon ${styles.color}`}/>  }
                </div>}/>  
            {isCategoryAnime[items[i].categorie.label] && <CategoryListAnime on={isCategoryAnime[items[i].categorie.label]} child={<CategoryList setMenuOpen={setMenuOpen} darkState={darkState} data={items[i].category ? items[i].category : []} styles={styles}/>}/> }
            </>
        )
    } 
    return  <Scrollbars style={{width:'100%',height:'100vh'}} className={`scroll`}><div style={{ overflowX:'hidden', overflowY:'auto'}}> 
    {data} 
    </div></Scrollbars>
};  


function TopIconCircleView ({ on, child }:any) { 
    const mainProps = useSpring({ transform: on ? 'rotate(270deg)' : 'rotate(90deg)',from: { transform: !on ? 'rotate(270deg)' : 'rotate(90deg)'} }); 
    return  <animated.div className={`icon-circle-view`} style={mainProps} >  
                  {child}
          </animated.div> 
}; 

const TopIconCircle = styled.div` 
    background: #f1f1f1;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    position: relative;    
    border-radius: 15px;
    overflow: hidden;
    -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.05);
    -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.05);
    box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.05);  
    width: 25px;
    height: 25px;
    top: 30px;
    right: 10px;  
    margin: 0;
    padding: 0;
    border: 1px solid #334773; 
`

const MenuTopIconBorder = styled.div`  
    top: 5px;
    position: absolute;
    right:0;
    width: 6px;
    height: 70px; 
    background: #f1f1f1;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`

const MenuTopIcon = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start;
    width: 100%;
    height: 50px; 
    margin-bottom: 10px; 
`
const MobileCloseButton = styled.div`  
    display: none;
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    position: relative;        
    top: 15px;
    left: 15px;  
    margin: 0;
    padding: 0;  
`

function UserMenu(props: any) { 
    const {styles, setMenuOpen, darkState, isMenuOpen, data, setMenuRef} = props;
    const [isCategoryAnime,setisCategoryAnime]:any = useState({}) 
    const [isSelectedItem,setSelectedItem]:any = useState(false)
    const store = useStore();
    // const [isMenuOpen1,setMenuOpen1]:any = useState(false)

    console.debug('UserMenu UserMenu')

    const handleCategoryClick = (key: string) =>{
        let categories = isCategoryAnime;
        categories[key] = !isCategoryAnime[key] ? true : !isCategoryAnime[key]
        for(let i = 0;i < Object.values(isCategoryAnime).length;i++){
            if(Object.keys(isCategoryAnime)[i] !== key)
                categories[Object.keys(isCategoryAnime)[i]] = false
        }
        setisCategoryAnime(categories)
    }

    return ( 
        <div className={`main-user-bar`}>   
            <MenuTopIconBorder  className={`top-icon-border`}/>
            <TopIconCircle className={`top-icon-circle`} onClick={()=>setMenuOpen(!isMenuOpen)}> 
                <TopIconCircleView on={isMenuOpen} child={<mdIcons.MdExpandMore color={`#334773`} fontSize={25}/>}/> 
            </TopIconCircle> 
            <MobileCloseButton onClick={()=>{
                if((setMenuRef.current.style.opacity === '' || setMenuRef.current.style.opacity === '0') || setMenuRef.current.style.zIndex === '-1'){ 
                    setMenuRef.current.style.opacity = `1`; 
                    setMenuRef.current.style.zIndex = `1`;

                }else { 
                    setMenuRef.current.style.opacity = `0`; 
                    setMenuRef.current.style.zIndex = `-1`; 
                } 
                setMenuOpen(!isMenuOpen)  
            }} className={`mobile-close-menu-button`}>
            <IoCloseOutline className={`${styles.color}`} size={40}/>
            </MobileCloseButton>
            <MenuTopIcon className={`menu-top-icon`} onMouseEnter={async()=>{ 
                        if(!isMenuOpen){
                            setMenuOpen(true); 
                        }
                    }}>  
                <CopanyImageMenu className={`mobile-company-menu-image`}/> 
                <UserMobileTitleView className={`mobile-user-title-view`}>
                    <MobileCompanyTitle>
                        {`מערכת הדגמה למיישמים`}
                    </MobileCompanyTitle> 
                    <MobileUserTitle>
                        {`אבישי פורטל`}
                    </MobileUserTitle> 
                </UserMobileTitleView>
                <AiOutlineAppstore onClick={()=>alert('מבט על')} style={{position:'absolute',top:15}} className={`bar-user-icon ${styles.color}`} size={50}/> 
            </MenuTopIcon>
            {renderMenuItems({items: data, setSelectedItem, isSelectedItem, handleCategoryClick, styles, isCategoryAnime, darkState, isMenuOpen, setMenuOpen})}  
        </div>
    );
} 










const Header = styled.div` 
    width: 100%;
    height: 65px; 
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start; 
    justify-content: flex-end;
    div:first-child{ 
        justify-content: flex-end; 
    }
    margin-top: 5px;  
`
const HeaderChild = styled.div` 
    width: 50%;
    height: 100%; 
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: flex-start;  
    padding: 10px;
`
const HeaderCompanyIcon = styled.div` 
    width: 300px;
    height: 65px; 
    margin: 0px;
    padding: 0px;  
    display: flex;
    flex-direction: row;
`
const CopanyImage = styled.div` 
    background: #fff;
    width: 60px;
    height: 60px; 
    margin: 0px;
    padding: 0px;
    background-image: url(${'https://demo.softsolutions.co.il/priportal/softlogo.png'});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 50px; 
    -moz-box-shadow:    inset 0 0 10px #b1b1b1;
    -webkit-box-shadow: inset 0 0 10px #b1b1b1;
    box-shadow:         inset 0 0 10px #b1b1b1; 
    -webkit-transition: all 0.3 ease;
    transition: all 0.3s ease;
    -webkit-transition-delay: 0.1s;
            transition-delay: 0.1s;
    will-change: transform; 
    :hover{ 
        border-radius: 0px;  
    } 
`
const CompanyTitle = styled.div` 
    width: 250px;
    height: 65px;
    overflow: hidden;  
    margin: 0px;
    padding: 0px; 
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;  
`
const CopanyImageMenu = styled.div` 
    background: #fff;
    width: 60px;
    height: 60px; 
    margin: 0px;
    padding: 0px;
    background-image: url(${'https://demo.softsolutions.co.il/priportal/softlogo.png'});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 30px; 
    -moz-box-shadow:    inset 0 0 10px #b1b1b1;
    -webkit-box-shadow: inset 0 0 10px #b1b1b1;
    box-shadow:         inset 0 0 10px #b1b1b1; 
    -webkit-transition: all 0.3 ease;
    transition: all 0.3s ease;
    -webkit-transition-delay: 0.1s;
            transition-delay: 0.1s;
    will-change: transform; 
    :hover{ 
        border-radius: 0px;  
    } 
`
const UserMobileTitleView = styled.div`   
    margin: 0px;
    padding: 0px;    
    margin-top: 50px; 
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
` 
const MobileCompanyTitle = styled.p` 
    font-size: 18px; 
    margin: 0px;
    padding: 0px; 
    font-weight: 400; 
    color: #f1f1f1;
`
const MobileUserTitle = styled.p` 
    font-size: 14px; 
    margin: 0px;
    padding: 0px;  
    font-weight: 100; 
    color: #f1f1f1;
`

const Title = styled.p` 
    font-size: 18px; 
    margin: 0px;
    padding: 0px; 
    font-weight: 500; 
    color: #4F5053;
`
const Block = styled.div` 
    width: 20px; 
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;  
`
const BlockIcon = styled.p` 
    font-size: 28px; 
    margin: 5px;
    padding: 0px;  
    padding-bottom: 3px;
    color: #cecece;
`
const UserTitleView = styled.div` 
    width: 80px;
    height: 100px; 
    margin: 0px;
    padding: 0px;  
    display: flex;
    flex-direction: row; 
    align-items: center; 
    justify-content: flex-end; 
    padding-top: 5px; 
    transition: box-shadow ease 0.5s;
    :hover:last-child div{ 
        -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.10);
        -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.10);
        box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.10);  
    }
`
const UserNameView = styled.div` 
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 20px;  
    margin: 0px;
    padding: 0px;  
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;  
    background: #dbe8f2;
    padding-bottom: 4px;
    -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.05);
    -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.05);
    box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.05); 
`
const UserName = styled.p` 
    font-size: 16px; 
    font-weight: 500; 
    padding: 0px;   
    color: #314570;
`
const HeaderSelectCompany = styled.div`  
    height: 100px;
    overflow: hidden;  
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: center;    
    margin-left: 10px;
`
const SelectedCopanyTitle = styled.p`  
    font-size: 20px; 
    font-weight: bold; 
    padding: 0px;   
    color: #2C324D;
    margin: 10px;
`
const svgChartRotate = (props: any) => keyframes`
  0% {
    transform: rotate(0deg);
  }  
  25% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;
const UserMessageView = styled.div<any>`  
    width: 40px;   
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: center;  
    padding-top: 5px; 
    margin-right: 15px;
    margin-left: 15px;
    animation: ${props=> svgChartRotate(props)} 1s ease-out;
    animation-iteration-count: infinite;  
    &:hover {
        animation-play-state: ${ `paused !important`};
    } 
    &:hover div{
        transform: scale(1.1)
    } 
`
const UserMessageViewReadMsg = styled.div<any>`  
    width: 40px; 
    overflow: hidden;  
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: center;  
    padding-top: 5px; 
    margin-right: 15px;
    margin-left: 15px; 
`
const BurgerMenuIcon = styled.div`   
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;   
    display: none;
`
const MsgValueView = styled.div` 
    width: 20px;
    height: 20px; 
    border-radius: 10px;
    background: rgba(255,0,0,0.8);
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;   
    position: absolute;
    top: -5px;
    right: -10px;
    transition: transform .1s; 
`
const MsgValue = styled.p` 
    font-size: 12px;
    color: #f1f1f1;
    transition: transform .1s;  
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    flex: 1
`

const DashboardMainView = styled.div` 
    width: 100%;
    height: 100%;
    margin: 0px; 
    display: flex;
    flex-direction: column;
    align-items: flex-end; 
    justify-content: flex-start;   
`
const MainDashboardContainer = styled.div` 
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    background-position: center;
    background-size: cover; 
    background-repeat: no-repeat;  
    background-image: linear-gradient(to top, transparent, transparent, #f1f1f1),url(${imgdashboard});
    
`
const MainDashboarView = styled.div` 
    width: 100%; 
    height: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start; 
`
const MainBoardView = styled.div` 
    width: 100%;
    height: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start;  
`
const MainBoardViewRightChild = styled.div` 
    width: 100%;
    height: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start;
    padding: 20px; 
    padding-left: 10px; 
`
const MainBoardViewLeftChild = styled.div`  
    width: 100%;
    height: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    padding: 20px; 
    padding-right: 10px;
`
const MainBoardScrollView = styled.div`  
    width: 100%;
    height: 100%; 
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: center; 
    padding-bottom: 60px;
`
const BorderLeftChild = styled.div`  
    width: 100%;
    height: 100%; 
    display: flex;
    flex-direction: row-reverse;
    align-items: center; 
    justify-content: flex-start;
`
const BorderRightChild = styled.div`  
    width: 100%;
    height: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start;
`
const RightBorderChildBottom = styled.div`  
    width: 100%;
    height: 65%; 
    display: flex;
    flex-direction: row-reverse;
    align-items: center; 
    justify-content: flex-start;
    padding-top: 10px;
`
const RightBorderChildTop = styled.div`  
    width: 100%;
    height: 35%; 
    display: flex;
    flex-direction: row-reverse;
    align-items: center; 
    justify-content: flex-start;
    padding-bottom: 10px;
`

const LeftBorderChild = styled.div`  
    width: 50%;
    height: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start;
    background: white; 
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15);
    box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15); 
`
const RightTopItem = styled.div`  
    flex:1;
    max-width: 33.33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start;
    background: white; 
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15);
    box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15);  
`
const RightBottomItem = styled.div`   
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start;
    background: white; 
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15);
    box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15); 
`

const DashboardTitle = styled.div` 
    width: 100%;
    height: 50px;  
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start; 
    justify-content: flex-end;
    div:first-child{ 
        justify-content: flex-end; 
    }
    margin-top: 5px;   
    border-bottom: 1px solid #cecece;
`
const DashboardTitleText = styled.p`  
    font-size: 30px; 
    font-weight: bold; 
    padding: 0px;   
    color: #2C324D; 
    text-align: right;
`
const DashboardTitleIcons = styled.div` 
    width: 100%;
    height: 100%;  
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center; 
    justify-content: center;  
`
const DashboardTitleIconsChild = styled.p` 
    font-size: 16px; 
    font-weight: 500; 
    padding: 0px;   
    color: #314570; 
    background: #dbe8f2;
    padding-right: 10px;
    padding-left: 10px; 
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 4px;
    margin: 5px;
    text-align: center; 
    transition: box-shadow ease 0.5s;
    :hover{ 
        -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.10);
        -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.10);
        box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.10);  
    }
`
const DashboardTitleHeaderChild = styled.div`  
    height: 100%; 
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: row;
    align-items: center; 
    justify-content: flex-start;  
    padding: 10px;
    padding-bottom: 20px;
`
const GridView = styled.div`      
    padding: 10px;
    padding-bottom: 50px;
`   

function DashboardHeader (props: any) { 
    const { setMenuRef, setMenuOpen, isMenuOpen } = props;  
    const [set,setset] = useState(false); 
    const store = useStore()  
    return  (    
            <Header className={`dashboard-header`}>  
                <HeaderChild className={`header-child1`}>
                    <Observer>
                        {()=>{
                            return(
                                !store.isMsgRead ? <UserMessageView onClick={()=>{
                                    alert('readmsg') 
                                    store.setMsgRead(true)
                                }} className={`user-message`}>
                                    {3 && <MsgValueView><MsgValue>{3}</MsgValue></MsgValueView>}
                                    <BsBell/>
                                </UserMessageView> :
                                <UserMessageViewReadMsg onClick={()=>alert('read ur msg')} className={`user-message`}>
                                    {/* {3 && <MsgValue>{3}</MsgValue>} */}
                                    <BsBell/>
                                </UserMessageViewReadMsg> 
                            )
                        }}
                    </Observer> 
                    <Block className={`header-block`}>
                        <BlockIcon>
                            |
                        </BlockIcon>
                    </Block> 
                    <HeaderSelectCompany className={`selected-company`}>  
                        <mdIcons.MdExpandMore color={`#334773`} fontSize={30}/>
                        <SelectedCopanyTitle>
                                {`סביבה למיישמים`}
                        </SelectedCopanyTitle> 
                    </HeaderSelectCompany>
                    <BurgerMenuIcon onClick={()=>{  
                            if((setMenuRef.current.style.opacity === '' || setMenuRef.current.style.opacity === '0') || setMenuRef.current.style.zIndex === '-1'){ 
                                setMenuRef.current.style.opacity = `1`; 
                                setMenuRef.current.style.zIndex = `1`;

                            }else { 
                                setMenuRef.current.style.opacity = `0`; 
                                setMenuRef.current.style.zIndex = `-1`; 
                            } 
                        setMenuOpen(!isMenuOpen)
                        if(window.innerWidth <= 680)
                            setMenuOpen(true)
                    }} className={`burger-menu`}>
                        <CgMenuRightAlt color={`#2C324D`} size={60}/> 
                    </BurgerMenuIcon>
                </HeaderChild>
                <HeaderChild className={`header-child2`}>
                    <HeaderCompanyIcon  className={`company-icon-view`}>
                        <CopanyImage/>
                        <CompanyTitle className={`company-title`}> 
                            <Title>
                                {`מערכת הדגמה למיישמים`}
                            </Title>
                        </CompanyTitle>
                    </HeaderCompanyIcon> 
                    <Block className={`header-block`}>
                        <BlockIcon>
                            |
                        </BlockIcon>
                    </Block>
                    <UserTitleView onClick={()=>setset(!set)}>
                        <mdIcons.MdExpandMore color={`#334773`} fontSize={30}/>
                        <UserNameView>
                            <UserName>
                                {`אפ`}
                            </UserName>
                        </UserNameView>
                    </UserTitleView>
                </HeaderChild>
            </Header>  
    ) 
};  
// , width: on ? 'calc(100% - 200px)' : 'calc(100% - 90px)'
function GridlayoutView ({ on, child, styles, setMenuOpen, setMenuRef }:any) {
    const mainProps = useSpring({ position: on ? 'fixed' : 'absolute', width: '95%',height:'100%',overflow:'hidden', from: {  position: on ? 'absolute' : 'fixed' } });  
    const Menu = styled.div` 
        flex:1;   
        background-image: linear-gradient(to top, #121e34 , #314570, #314570, #1e2c4c);
        border-top-left-radius: 10px;
        -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.55);
        -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.55);
        box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.55); 
        margin:0px;
        padding:0px;
    `
    return  <animated.div style={mainProps} >   
                    {child}   
                    1
          </animated.div> 
}; 

function DashboardMain (props: any) { 
    const { setMenuOpen, isMenuOpen } = props; 
    const [set,setset] = useState(false);
    return  (   
          <DashboardMainView>
          <ReactTooltip place={'bottom'}/> 
              <DashboardTitle className={`dashboard-title`}>
                    <DashboardTitleHeaderChild className={`header-child1-dashboard`}> 
                        <DashboardTitleText>
                            {`מבט על`} 
                        </DashboardTitleText>
                    </DashboardTitleHeaderChild>
                    <DashboardTitleHeaderChild className={`header-child2-dashboard`}>
                       <DashboardTitleIcons>
                            <DashboardTitleIconsChild> 
                                {`לורם איפסום`} 
                            </DashboardTitleIconsChild>
                            <DashboardTitleIconsChild> 
                                {`דו"ח הזמנות`} 
                            </DashboardTitleIconsChild>
                            <DashboardTitleIconsChild> 
                                {`פתח קריאה`} 
                            </DashboardTitleIconsChild>
                       </DashboardTitleIcons>
                    </DashboardTitleHeaderChild> 
              </DashboardTitle>
              <MainDashboardContainer>
                <MainDashboarView> 
                    <GridlayoutView on={isMenuOpen} child={
                        <MainBoardView className={`main-border-view`}>
                            <Scrollbars style={{width:'100%', height:'calc(100% - 135px)'  }} >    
                                <GridView>
                                    <LocalStorageLayout isMenuOpen={isMenuOpen}/>
                                </GridView> 
                            {/* <MyFirstGrid/> */}
                            {/* <MainBoardScrollView className={`main-border-scroll-view`}>
                                    <MainBoardViewLeftChild className={`left-border-view`}>
                                        <BorderLeftChild>
                                            <LeftBorderChild style={{marginLeft:10,width:'40%'}}>
                                                1
                                            </LeftBorderChild>
                                            <LeftBorderChild style={{marginRight:10,width:'60%'}}>
                                                2
                                            </LeftBorderChild> 
                                        </BorderLeftChild> 
                                    </MainBoardViewLeftChild>
                                    <MainBoardViewRightChild className={`right-border-view`}>
                                        <BorderRightChild>
                                            <RightBorderChildTop className={`right-top-border-view`}>
                                                <RightTopItem style={{marginLeft:10}}>
                                                    1
                                                </RightTopItem>
                                                <RightTopItem style={{marginLeft:10,marginRight:10}}>
                                                    2
                                                </RightTopItem>
                                                <RightTopItem style={{marginRight:10}}>
                                                    3
                                                </RightTopItem>
                                            </RightBorderChildTop>
                                            <RightBorderChildBottom className={`right-bottom-border-view`}>
                                                <RightBottomItem style={{marginLeft:10,width:'60%'}}>
                                                    1
                                                </RightBottomItem>
                                                <RightBottomItem style={{marginRight:10,width:'40%'}}>
                                                    2
                                                </RightBottomItem> 
                                            </RightBorderChildBottom>
                                        </BorderRightChild>  
                                    </MainBoardViewRightChild>  
                            </MainBoardScrollView> */}
                            </Scrollbars>
                        </MainBoardView> 
                        }/> 
                        
                </MainDashboarView>
              </MainDashboardContainer>
          </DashboardMainView>    
    ) 
};  

function UserDashboard (props: any) {  
    const { setMenuRef, setMenuOpen, isMenuOpen } = props;  
    return  (
        <div className={`dashboard-view`}>    
             <DashboardHeader setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen} setMenuRef={setMenuRef}/>
             <DashboardMain setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen} />
        </div>
    ) 
};  


function MenuView ({ on, child, styles, setMenuOpen, setMenuRef }:any) { 
    const mainProps = useSpring({ width: on ? 200 : 90, from: { width: on ? 200 : 90 } });  
    const Menu = styled.div` 
        flex:1;   
        background-image: linear-gradient(to top, #121e34 , #314570, #314570, #1e2c4c);
        border-top-left-radius: 10px;
        -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.55);
        -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.55);
        box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.55); 
        margin:0px;
        padding:0px;
    `
    return  <animated.div ref={setMenuRef} id={`menu-view`} className={`menu-view ${styles.background}`} style={mainProps} >  
                <Menu className={'menu-styled'}>
                    {child} 
                </Menu>
          </animated.div> 
}; 

function DashboardView ({ on, child, styles, setMenuOpen }:any) {
    const [isDashboardReady,setDashboardReady] = useState(false)
    const mainProps = useSpring({ opacity: isDashboardReady ? 1 : 0, from: { opacity: isDashboardReady ? 1 : 0 } });   
    setTimeout(() => {
        setDashboardReady(true) 
    }, 700);
    const Dashboard = styled.div` 
        width: 100%;
        height: 100vh; 
        display: flex;
        flex-direction: column;  
        align-items: flex-end; 
        justify-content: flex-start;
    `
    return  <animated.div className={`main-dashboard ${styles.background}`} style={mainProps} >    
                <Dashboard>
                    {child}
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
    const [isMenuOpen,setMenuOpen] = useState(false) 
    const [isReady,setIsReady] = useState(false);
    const styles = props.styles; 
    const [ locationKeys, setLocationKeys ]:any = useState([])
    const history = useHistory() 
    const [state, setState]:any = React.useState(initialState);
    const setMenuRef: any = React.useRef(null);
    // const [selectedIndex, setSelectedIndex] = React.useState(1);
    // const [isBackPress,setBackPress] = useState(false);
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
      
    useEffect(()=>{
        console.debug('main useEffect')
        if(!isReady){ 
            setIsReady(true)
            setTimeout(() => {
                store.setEndAnime(true);   
                setMenuOpen(true)   
                setTimeout(() => {
                }, 500);
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
    const MenuItemStyle = styled.div` 
        flex:1;
        :hover { 
            background: ${'#2C324D'}; 
            color: #f1f1f1; 
        }`  
        // onContextMenu={handleClick}
    return( <div onContextMenu={handleClick} className={`main-screen ${styles.background} ${isReady ? styles.transform : ``}`}>
            <ReactTooltip place={'left'}/>  
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
                <DashboardView
                    styles={styles} 
                    setMenuOpen={setMenuOpen} 
                    child={<UserDashboard setMenuRef={setMenuRef} isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />}/>  
                <MenuView  
                    setMenuRef={setMenuRef} 
                    styles={styles} 
                    setMenuOpen={setMenuOpen} 
                    on={isMenuOpen} 
                    child={<UserMenu setMenuRef={setMenuRef} data={data.menuCategories} darkState={props.darkState} isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} styles={styles}/>}/>   
            </div>
        </div>)
}

export default Main;