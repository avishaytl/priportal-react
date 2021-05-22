import React, { useEffect, useState } from 'react';  
import { AiOutlineFolder, AiTwotoneFolderOpen, AiOutlineAppstore } from 'react-icons/ai';  
import { BiNotepad } from 'react-icons/bi';       
import { IoCloseOutline } from 'react-icons/io5';      
import * as mdIcons from 'react-icons/md';      
import ListItem from "@material-ui/core/ListItem"; 
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import styled from 'styled-components'; 
import {useSpring, animated} from 'react-spring';   
import { Scrollbars } from 'react-custom-scrollbars'; 
import { useStore } from '../storeui/storeui' 



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

const MenuItem = styled.div<any>` 
    flex:1; 
    :hover {
        background: ${props => props.ho}; 
    }
`

const UserIconStyle = styled.div<any>`
    padding-top: 3px; 
    max-height: ${props => props.on};  
    background: ${props => props.isSelectedItem === props.value ? `#000000a0;` : `transparent;`} 
    transition: background ease 0.3s;
    :hover {
        background: ${props => props.ho  ? `#ffffffa0` : `#000000a0`};   
    }
`
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
    return (
        <React.Fragment key={props.index}>
            <ListItem key={props.index} onClick={handleClick}> 
                <MenuItem ho={ho} key={props.index}>
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

    let ho = darkState;
    return  <animated.div onClick={()=>{  
                        setSelected(!isSelected)
                        onClick(isSelectedItem === value ? '!' + value : value )  
                    }}  className={`user-icon-menu`} style={store.isRightMenuOpen ? {} : mainPropsIcon} >   
                <UserIconStyle isSelectedItem={isSelectedItem} on={on ? `40px` : `90px`} ho={ho} value={value}>
                    {child}
                    <animated.div className={`user-icon-text-view`} style={store.isRightMenuOpen ? {height: 90} : mainPropsText}>    
                        <p className={`user-icon-text`}>{value}</p>
                    </animated.div>  
                </UserIconStyle> 
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
            <div key={`${i}`} >
            <UserIconMenu isSelectedItem={isSelectedItem} styles={styles} onClick={(value: string)=>{ 
                if(isMenuOpen)
                    handleCategoryClick(items[i].categorie.label)
                else
                    setTimeout(() => {
                            alert(items[i].categorie.label) 
                        }, 250);
                setSelectedItem(value)
            }} setMenuOpen={setMenuOpen} darkState={darkState} value={items[i].categorie.label} on={isMenuOpen} child={
                <div className={`grid-item hvr-grow `}> 
                    { isSelectedItem === items[i].categorie.label ?  <IconSelected 
                    // onClick={()=>{
                    //     setMenuOpen(false)
                    //     setTimeout(() => {
                    //         // alert(items[i].categorie.label) 
                    //     }, 250);
                    // }} 
                    className={`bar-user-icon ${styles.color}`}/>  :  <Icon 
                    // onClick={()=>{
                    //     setMenuOpen(false)
                    //     setTimeout(() => {
                    //         // alert(items[i].categorie.label) 
                    //     }, 250);
                    // }} 
                    className={`bar-user-icon ${styles.color}`}/>  }
                </div>}/>  
            {isCategoryAnime[items[i].categorie.label] && <CategoryListAnime key={`${i}`} on={isCategoryAnime[items[i].categorie.label]} child={<CategoryList setMenuOpen={setMenuOpen} darkState={darkState} data={items[i].category ? items[i].category : []} styles={styles}/>}/> }
            </div>
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

function UserMenu(props: any) { 
    const {styles, setMenuPos, darkState, isMenuOpen, data, setMenuRef} = props;
    const [isCategoryAnime,setIsCategoryAnime]:any = useState({}) 
    const [isSelectedItem,setSelectedItem]:any = useState(false)   
    const setMenuOpen = (pos: boolean) =>{ 
        setSelectedItem(false)
        setMenuPos(pos)
    }
    const handleCategoryClick = (key: string) =>{
        let categories = isCategoryAnime;
        categories[key] = !isCategoryAnime[key] ? true : !isCategoryAnime[key]
        for(let i = 0;i < Object.values(isCategoryAnime).length;i++){
            if(Object.keys(isCategoryAnime)[i] !== key)
                categories[Object.keys(isCategoryAnime)[i]] = false
        }
        setIsCategoryAnime(categories)
    }
    useEffect(()=>{
        setIsCategoryAnime({})
        setSelectedItem(false)
    },[isMenuOpen])
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

export default UserMenu;