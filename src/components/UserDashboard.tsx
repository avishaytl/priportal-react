import '../App.css'; 
import '../App.scss';  
import React, { useState } from 'react'; 
import ReactTooltip from 'react-tooltip'; 
import { BsBell } from 'react-icons/bs';       
import { CgMenuRightAlt } from 'react-icons/cg'; 
import * as mdIcons from 'react-icons/md';      
import styled , {keyframes} from 'styled-components'; 
import {useSpring, animated} from 'react-spring';   
import { Scrollbars } from 'react-custom-scrollbars';
import Gridlayout from '../components/Gridlayout';   
import imgdashboard from '../dashboard.png';    
import { useStore } from '../storeui/storeui'
import { Observer } from 'mobx-react-lite'; 

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
    return  <animated.div style={mainProps} >   
                    {child}   
                    1
          </animated.div> 
}; 

function DashboardMain (props: any) { 
    const { data, setMenuOpen, isMenuOpen } = props; 
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
                                    <Gridlayout data={data} isMenuOpen={isMenuOpen}/>
                                </GridView>  
                            </Scrollbars>
                        </MainBoardView> 
                        }/> 
                        
                </MainDashboarView>
              </MainDashboardContainer>
          </DashboardMainView>    
    ) 
};  

function UserDashboard (props: any) {  
    const { setMenuRef, setMenuOpen, isMenuOpen, data } = props;  
    return  (
        <div className={`dashboard-view`}>    
             <DashboardHeader setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen} setMenuRef={setMenuRef}/>
             <DashboardMain data={data} setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen} />
        </div>
    ) 
};  

export default UserDashboard;