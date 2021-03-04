import './App.css'; 
import './App.scss'; 
import { create } from 'jss';
import rtl from 'jss-rtl';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
// import { BiUser } from 'react-icons/bi'; 
import { FiArrowLeft } from 'react-icons/fi';
import { IoEarthOutline, IoHomeOutline } from 'react-icons/io5'; 
import Checkbox from '@material-ui/core/Checkbox';
import React, { useEffect, useRef } from 'react';
import {useSpring, animated} from 'react-spring'; 
import { FullScreen, useFullScreenHandle } from "react-full-screen";
// import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Title from './Title';
import ReactTooltip from 'react-tooltip';

const tooltip = {
  homeIcon: 'הוספה למסך בית',
  earthIcon: 'החלפת שפה'
}

const data = {
  errorMsg: 'שם משתמש או סיסמא שגויים',
  earthIcon: 'החלפת שפה',
  forgotPassword: 'שכחתי סיסמא?',
  priorityUser: 'משתמש פריוריטי',
  user: 'שם משתמש',
  password: 'סיסמא',
  titleCompanyName: 'Demo System', 
  primaryColor: '#48c0ee',
  secondColor: '#174768',
  softsolutions: 'developered by Softsolutions LTD 2021 ● v.24'
}

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const useStyles = makeStyles((theme) => ({  
  body:{  
    display: 'flex',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',  
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
     fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;`,  
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
  direction: 'rtl', 
});

function App() {
  const styles = useStyles();
  const [showUserTitle, setUserTitleAnime] = React.useState(true);
  const [showLoginView, setLoginView] = React.useState(false);
  const [isVerifyLogin, setVerifyLogin] = React.useState(false); 
  const [isErrorMsg, setErrorMsg] = React.useState(false);  
  const userRef: any = React.useRef(null);  
  const passRef: any = React.useRef(null);  
  
  const TitleAnime = ({ on }:any) => {
    const titleProps = useSpring({ display: on ? 'flex' : 'none', from: { display: 'flex' } }); 
    return  <animated.div style={titleProps} >   
              <div className="text"> 
                <p className="title">
                  {data.titleCompanyName}
                </p> 
              </div>
            </animated.div> 
  };

  const IconAnime = ({ on }:any) => {
    const iconProps = useSpring({ opacity: on ? 1 : 0, from: { opacity: on ? 0 : 1} }); 
    return  <animated.div style={iconProps} >    
                <Title title={data.titleCompanyName} background={data.primaryColor}/>
            </animated.div> 
  }; 

  const userProps = useSpring({ opacity: isVerifyLogin ? 0 : 1, from: { opacity: 1 }}); 
  const loaderProps = useSpring({ opacity: isVerifyLogin ? 1 : 0, from: { opacity: 0 }}); 
  const handle = useFullScreenHandle();

  return (   
  <FullScreen handle={handle}> 
    <ReactTooltip />
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
        <div className={styles.body}> 
          <div className={styles.backgroundImg}> 
            <img className={styles.bgImg} src='http://demo.softsolutions.co.il/priportal//bg-demo.jpg' alt='logo'/> 
          </div>
          {isVerifyLogin && <animated.div style={loaderProps}>
                <div style={{position:'absolute', 
                width:'100vw',
                height:'100vh', 
                zIndex:10,
                alignItems:'center',justifyContent:'center',
                display:'flex',
                left:0,
                top:0, 
              alignSelf:'center'}}> 
                  <ClipLoader color={'#ececec'} loading={true} size={60} /> 
                </div>
              </animated.div>}
          <div className={styles.container}> 
          <div className="super-box"> 
              <IconAnime on={showUserTitle}/>   
              <div className="super-box-container"/>  
        <div style={showLoginView  ? { opacity: 1, transform:'scale(.9)' } : {}} dir='rtl' className="login-view" onClick={()=>{ 
                      if(!showLoginView){ 
                        setUserTitleAnime(false)
                        setLoginView(true);
                        handle.enter();
                      }
                    }}>   
                    <animated.div  style={userProps}>
                      <p className={styles.title}>
                      {data.titleCompanyName}
                    </p> 
                  <input ref={userRef} onKeyDown={(e)=>{
                        if (e.key === 'Enter') { 
                          if(passRef && passRef.current)
                            passRef.current.focus();
                        }
                    }} placeholder={data.user} style={{backgroundColor:'rgba(0,0,0,0.3)',color:'#ececec',fontSize:'1.3rem',margin:10,boxShadow:'none',height:45,paddingRight:10}}/>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'flex-end'}}> 
                    <div style={{width:45,height:45,overflow:'hidden',position:'absolute',left:10,marginBottom: 10}}>
                      <div onClick={()=>{ 
                            setVerifyLogin(true); 
                      }} className={`input-btn ${styles.inputBtn}`}>
                        <FiArrowLeft className={'input-icon-btn'}/>
                      </div>
                      <input disabled style={{fontSize:'1.3rem',margin:10,boxShadow:'none',border:0,height:45,backgroundColor:'transparent'}}/>
                    </div>
                    <input ref={passRef} onKeyDown={(e)=>{
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
                    }} type={'password'} placeholder={data.password} 
                    style={{backgroundColor:'rgba(0,0,0,0.3)',color:'#ececec',fontSize:'1.3rem',margin:10,boxShadow:'none',height:45,paddingRight:10}}/>
                  </div> 
                  <div className={styles.priorityUser}>
                    <Checkbox
                      defaultChecked 
                      color='default'
                      inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />  
                    <p className={styles.priorityUserText}>
                    {data.priorityUser}
                    </p>
                  </div>
                    <p style={{margin:0,padding:0,marginTop:10, cursor:'pointer'}} className={styles.priorityUserText}> 
                    {data.forgotPassword}
                    </p> 
                    {isErrorMsg && <p style={{margin:0,padding:0,marginTop:10, color:'#e72222',fontWeight:'bold'}} className={styles.priorityUserText}>
                    {data.errorMsg}
                    </p> }
              </animated.div> 
              </div>   
          </div> 
          <div className={styles.footer}> 
            <div className={styles.headerChild} style={{justifyContent:'flex-start',paddingLeft: 30}}>
              <p className={styles.footerText}>{data.softsolutions}</p>
            </div> 
            <div className={styles.headerChild} style={{justifyContent:'flex-end',paddingRight: 30}}>
              <IoHomeOutline data-tip={tooltip.homeIcon} className={styles.footerIcon}/>
              <IoEarthOutline data-tip={tooltip.earthIcon} className={styles.footerIcon}/>
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
