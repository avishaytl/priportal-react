import './App.css'; 
import './App.scss'; 
import { create } from 'jss';
import rtl from 'jss-rtl';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { BiUser } from 'react-icons/bi'; 
import { FiArrowLeft } from 'react-icons/fi';
import { IoEarthOutline, IoHomeOutline } from 'react-icons/io5'; 
import Checkbox from '@material-ui/core/Checkbox';
import React, { useEffect } from 'react';
import {useSpring, animated} from 'react-spring'; 
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Title from './Title';


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const useStyles = makeStyles((theme) => ({  
  body:{  
    display: 'flex',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden', 
  },
  backgroundImg: { 
    position:'absolute',
    right: 0,
    display: 'flex', 
    width: '100vw',
    height: '100vh',
    objectFit: 'fill',
    justifyContent: 'flex-end',
    filter: 'blur(1px)',
    overflow: 'hidden', 
  },
  bgImg: {
    minHeight:'110vh', 
    filter: 'brightness(0.5)',
    minWidth: '100vw'
  },
  container: { 
    // backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex', 
    width: '100vw',
    height: '100vh', 
    justifyContent: 'center',  
    alignItems: 'center',
    paddingBottom: '10vh',
    zIndex: 1
  }, 
  input: {
    backgroundColor: 'rgba(0,0,0,0)',
    border: 'none',
    fontSize: 28
  },
  button: { 
    marginTop: 5
  },
  btnText: {
    margin:5,
    color: '#ececec',
    padding: 0,
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  priorityUser: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    padding: 0,
    margin: 0
  },
  priorityUserText: {
    color:'#ececec',
    padding: 0,
    margin: 0
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#ececec',
    letterSpacing: 1,
    fontFamily: 'Trebuchet MS',   
    marginRight:5,
    marginLeft:5
  },
  header: {
    position:'absolute',
    top:10,
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  headerChild: {
    width: '50%', 
    display:'flex',
  },
  footerIcon:{
    fontSize: 30,
    color: '#ececec',
    cursor:'pointer', 
    marginRight:10,
    marginLeft:10
  },
  inputBtn: {
    width: 45,
    height: 49,
    position:'absolute',
    backgroundColor:'#cecece4f',
    cursor:'pointer',
    justifyContent:'center',
    alignItems:'center',
    display:'flex'
  },
  title: {
     color: '#ececec',
     fontFamily: 'Trebuchet MS',  
     fontSize: 40, 
     padding: 0,
     margin: 5
  },
  subTitle: {
    color: '#ececec', 
    fontSize: 16,
    margin: 0,
    padding: 0 
  }
  
}));
const theme = createMuiTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
// const loginSvg = <svg id="bold" enableBackground="new 0 0 24 24" height="50" fill='#ececec' viewBox="0 0 24 24" width="50"><g><path d="m21.822.015c-.025-.002-.046-.015-.072-.015h-10.75c-1.654 0-3 1.346-3 3v1c0 .552.448 1 1 1s1-.448 1-1v-1c0-.551.449-1 1-1h4.659l-.305.102c-.81.28-1.354 1.043-1.354 1.898v15h-3c-.551 0-1-.449-1-1v-2c0-.552-.448-1-1-1s-1 .448-1 1v2c0 1.654 1.346 3 3 3h3v1c0 1.103.897 2 2 2 .214 0 .417-.031.637-.099l6.008-2.003c.811-.28 1.355-1.043 1.355-1.898v-18c0-1.166-1.005-2.08-2.178-1.985z"/><path d="m10.707 9.293-4-4c-.286-.286-.716-.372-1.09-.217-.373.155-.617.52-.617.924v3h-4c-.552 0-1 .448-1 1s.448 1 1 1h4v3c0 .404.244.769.617.924.374.155.804.069 1.09-.217l4-4c.391-.391.391-1.023 0-1.414z"/></g></svg>
function App() {
  const styles = useStyles();
  const [showUserTitle, setUserTitleAnime] = React.useState(true);
  const [showLoginView, setLoginView] = React.useState(false);
  const [isVerifyLogin, setVerifyLogin] = React.useState(false); 
  const [isErrorMsg, setErrorMsg] = React.useState(false);  
  
  const TitleAnime = ({ on }:any) => {
    const titleProps = useSpring({ display: on ? 'flex' : 'none', from: { display: 'flex' } }); 
    return  <animated.div style={titleProps} >   
              <div className="text"> 
                <p className="title">
                  Demo System
                </p> 
              </div>
            </animated.div> 
  };

  const IconAnime = ({ on }:any) => {
    const iconProps = useSpring({ opacity: on ? 1 : 0, from: { opacity: on ? 0 : 1} });
    let companyName = 'Demo System';
    let words = companyName.split(' ')
    let title = '';
    for(let i = 0;i < words.length;i++)
      title += words[i].slice()[0]
    return  <animated.div style={iconProps} >    
                <Title title={'Demo Company'} background={'#48c0ee'}/>
            </animated.div> 
  }; 

  const userProps = useSpring({ opacity: isVerifyLogin ? 0 : 1, from: { opacity: 1 }}); 
  const loaderProps = useSpring({ opacity: isVerifyLogin ? 1 : 0, from: { opacity: 0 }}); 
  const handle = useFullScreenHandle();

  return (   
  <FullScreen handle={handle}> 
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
      <div className={styles.body}> 
        <div className={styles.backgroundImg}>
          {/* http://demo.softsolutions.co.il/priportal//bg-demo.jpg */}
          <img className={styles.bgImg} src='https://www.wallpapers4u.org/wp-content/uploads/laptop_room_on_the_desk_keyboard_mouse_apple_window_interior_73963_1920x1080.jpg' alt='logo'/> 
        </div>
        <div className={styles.container}> 
        <div className="super-box"> 
            <IconAnime on={showUserTitle}/>   
			      <div className="super-box-container"/>  
      <div style={showLoginView  ? { opacity: 1, transform:'scale(.8)' } : {}} dir='rtl' className="login-view" onClick={()=>{ 
                    if(!showLoginView){ 
                      setUserTitleAnime(false)
                      setLoginView(true);
                      handle.enter();
                    }
                  }}>  
                  {/* <UserFormAnime on={isVerifyLogin}/> */}
                  <animated.div  style={userProps}>
                    <p className={styles.title}>
                    Demo System
                  </p> 
                <input placeholder={'שם משתמש'} style={{backgroundColor:'rgba(0,0,0,0.3)',color:'#ececec',fontSize:'1.5rem',margin:10,boxShadow:'none',height:45,paddingRight:10}}/>
                <div style={{display:'flex',flexDirection:'row',alignItems:'flex-end'}}> 
                  <div style={{width:45,height:47,overflow:'hidden',position:'absolute',left:10,marginBottom: 10}}>
                    <div onClick={()=>{ 
                        // setATitleAnime(!showTitle)
                    }} className={`input-btn ${styles.inputBtn}`}>
                      <FiArrowLeft className={'input-icon-btn'}/>
                    </div>
                    <input disabled style={{fontSize:'1.5rem',margin:10,boxShadow:'none',border:0,height:45,backgroundColor:'transparent'}}/>
                  </div>
                  <input onKeyDown={(e)=>{
                      if (e.key === 'Enter') {
                        if(!isErrorMsg)
                          setTimeout(() => {  
                            setErrorMsg(true)
                            setVerifyLogin(false);
                          }, 3000);
                        else{
                          setTimeout(() => {  
                            alert('navigate test')
                          }, 1000);
                        }
                        setVerifyLogin(true)
                      }
                  }} type={'password'} placeholder={'סיסמא'} style={{backgroundColor:'rgba(0,0,0,0.3)',color:'#ececec',fontSize:'1.5rem',margin:10,boxShadow:'none',height:45,paddingRight:10}}/>
                </div> 
                <div className={styles.priorityUser}>
                  <Checkbox
                    defaultChecked 
                    color='default'
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                  />  
                  <p className={styles.priorityUserText}>
                  משתמש פריוריטי
                  </p>
                </div>
                  <p style={{margin:0,padding:0,marginTop:10, cursor:'pointer'}} className={styles.priorityUserText}>
                  שכחתי סיסמא?
                  </p> 
                  {isErrorMsg && <p style={{margin:0,padding:0,marginTop:10, cursor:'pointer', color:'#cb1717'}} className={styles.priorityUserText}>
                  שם משתמש או סיסמא שגויים, נסה שנית
                  </p> }
            </animated.div>
            {isVerifyLogin && <animated.div style={loaderProps}>
              <div style={{position:'absolute',alignSelf:'center',top:150,left:130}}> 
                <ClipLoader color={'#ffffff'} loading={true} size={60} /> 
              </div>
            </animated.div>}
            </div>  
        {/* <TitleAnime on={showUserTitle}/> */}
        </div> 
        <div className={styles.footer}> 
          <div className={styles.headerChild} style={{justifyContent:'flex-start',paddingLeft: 20}}>
            <p className={styles.footerText}>developered by Softsolutions LTD 2021 ● v.24</p>
          </div> 
          <div className={styles.headerChild} style={{justifyContent:'flex-end',paddingRight: 20}}>
            <IoHomeOutline className={styles.footerIcon}/>
            <IoEarthOutline className={styles.footerIcon}/>
          </div>
        </div> 
        </div> 
      </div>
      </ThemeProvider>
    </StylesProvider>
    </FullScreen>
  );
} 


export default App;
