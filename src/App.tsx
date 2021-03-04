import './App.css'; 
import './App.scss'; 
import { create } from 'jss';
import rtl from 'jss-rtl';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles'; 
import { FiArrowLeft } from 'react-icons/fi';
import { IoEarthOutline, IoHomeOutline, IoContrastOutline } from 'react-icons/io5'; 
import Checkbox from '@material-ui/core/Checkbox';
import React, { useEffect, useRef, useState } from 'react';
import {useSpring, animated} from 'react-spring'; 
import { FullScreen, useFullScreenHandle } from "react-full-screen"; 
import ClipLoader from "react-spinners/ClipLoader";
import Title from './Title';
import ReactTooltip from 'react-tooltip';
import { BrowserRouter, Link, Route, Switch, useHistory, withRouter} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group"; 
import { Scrollbars } from 'react-custom-scrollbars'; 

const tooltip = {
  homeIcon: 'הוספה למסך בית',
  earthIcon: 'שפה',
  theme: 'ערכת נושא',
}

const data = {
  errorMsg: 'שם משתמש או סיסמא שגויים',
  earthIcon: 'החלפת שפה',
  forgotPassword: 'שכחתי סיסמא?',
  priorityUser: 'משתמש פריוריטי',
  user: 'שם משתמש',
  password: 'סיסמא',
  titleEntry: 'כניסה',
  titleCompanyName: 'Demo System', 
  primaryColor: '#48c0ee',
  secondColor: '#174768',
  softsolutions: 'developered by Softsolutions LTD 2021 ● v.24'
}

const jss = create({ plugins: [...jssPreset().plugins, rtl()] }); 

const LoginScreen = (props: any) => {  
  const handle = useFullScreenHandle();
  const [showUserTitle, setUserTitleAnime] = useState(true);
  const [showLoginView, setLoginView] = useState(false);
  const [isLoading, setLoadingTime] = useState(false); 
  const [isErrorMsg, setErrorMsg] = useState(false);  
  const userRef: any = useRef(null);  
  const passRef: any = useRef(null);  
  const history = useHistory();
  const styles = props.styles;
  const navigateToDashboard = () => history.push('/dashboard'); 

  const CompanyTitleAnime = ({ on }:any) => {
    const iconProps = useSpring({ opacity: on ? 1 : 0, from: { opacity: on ? 0 : 1} }); 
    return  <animated.div style={iconProps} >    
                <Title entry={data.titleEntry} subColor={styles.text} title={data.titleCompanyName} background={data.secondColor}/>
            </animated.div> 
  }; 

  const userProps = useSpring({ opacity: isLoading ? 0 : 1, from: { opacity: 1 }}); 
  const loaderProps = useSpring({ opacity: isLoading ? 1 : 0, from: { opacity: 0 }}); 
  
  return( 
    <FullScreen handle={handle}> 
      <ReactTooltip />
      <div className={`login-screen`}> 
          <div className={'background-img'}> 
            <div className={`bg-blur ${styles.bgImg}`}></div>
            <img className={'bg-img'} src='http://demo.softsolutions.co.il/priportal//bg-demo.jpg' alt='logo'/> 
          </div>
          {isLoading && <animated.div style={loaderProps}>
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
          <div className={'container'}> 
            <div className="super-box"> 
                {!showLoginView && <CompanyTitleAnime on={showUserTitle}/> } 
                <div className="super-box-container"/>  
                    <div style={showLoginView  ? { opacity: 1, transform:'scale(.9)' } : {}} dir='rtl' className="login-view" onClick={()=>{ 
                        if(!showLoginView){ 
                          setUserTitleAnime(false)
                          setLoginView(true);  
                        }
                      }}>   
                      <animated.div  style={userProps}>
                        <p className={`company-title ${styles.text}`}>
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
                              setLoadingTime(true); 
                              setTimeout(() => {   
                                navigateToDashboard()
                              }, 2000);
                        }} className={`input-btn ${styles.btn}`}>
                          <FiArrowLeft className={'input-icon-btn'}/>
                        </div>
                        <input disabled style={{fontSize:'1.3rem',margin:10,boxShadow:'none',border:0,height:45,backgroundColor:'transparent'}}/>
                      </div>
                      <input ref={passRef} onKeyDown={(e)=>{
                          if (e.key === 'Enter') {
                            if(!isErrorMsg)
                              setTimeout(() => {  
                                setErrorMsg(true)
                                setLoadingTime(false);
                              }, 3000);
                            else{
                              setTimeout(() => {   
                                navigateToDashboard()
                              }, 1000);
                            }
                            setLoadingTime(true)
                          }
                      }} type={'password'} placeholder={data.password} 
                      style={{backgroundColor:'rgba(0,0,0,0.3)',color:'#ececec',fontSize:'1.3rem',margin:10,boxShadow:'none',height:45,paddingRight:10}}/>
                    </div> 
                    <div className={'priority-user'}>
                      <Checkbox
                        defaultChecked 
                        style ={{
                          color: data.secondColor,
                        }} 
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                      />  
                      <p className={`margin0-padding0 ${styles.text}`}>
                      {data.priorityUser}
                      </p>
                    </div>
                      <p style={{marginTop:10, cursor:'pointer'}} className={`margin0-padding0 ${styles.text}`}> 
                      {data.forgotPassword}
                      </p> 
                      {isErrorMsg && <p style={{marginTop:10, color:'#e72222',fontWeight:'bold'}} className={'margin0-padding0'}>
                      {data.errorMsg}
                      </p> }
                </animated.div> 
              </div>   
          </div> 
          <div className={'footer'}> 
            <div className={'footer-child'} style={{justifyContent:'flex-start',paddingLeft: 30}}>
              <p className={`footer-text ${styles.text}`}>{data.softsolutions}</p>
            </div> 
            <div className={'footer-child'} style={{justifyContent:'flex-end',paddingRight: 30}}>
              <IoHomeOutline data-tip={tooltip.homeIcon} className={`footer-icon ${styles.text}`}/>
              <IoEarthOutline data-tip={tooltip.earthIcon} className={`footer-icon ${styles.text}`}/>
              <IoContrastOutline onClick={()=> props.setDarkState(!props.darkState) } data-tip={tooltip.theme} className={`footer-icon ${styles.text}`}/>
            </div>
          </div> 
          </div> 
        </div> 
    </FullScreen>
  )
};

const Second = () => <div className="second"  style={{backgroundColor:'#3b3b3b',width:'100vw',height:'100vh'}}>Second Component</div>;

const AnimatedSwitch = withRouter(({ location, setDarkState, darkState }: any) => {
  const useStyles = makeStyles((theme) => {
    let isDarkState =  theme.palette.background.default === '#303030';
    return({ 
      bgImg: { 
        backgroundColor: isDarkState ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
        filter: isDarkState ? 'brightness(0)' : 'brightness(0.5)'
      }, 
      text: {
        color: isDarkState ? '#ececec' : '#303030',
      }, 
      btn: {
        backgroundColor:'#cecece4f',
      },  
  })
  });
  const classes = useStyles(); 
  return (<TransitionGroup>
            <CSSTransition key={location.key} classNames="slide" timeout={2000}>
              <Switch location={location}>
                <Route path="/" component={()=><LoginScreen  styles={classes} setDarkState={setDarkState} darkState={darkState}/> } exact /> 
                <Route path="/dashboard" component={Second} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>)
});
 
function App() {
  const [darkState, setDarkState] = useState(true);
  const palletType = darkState ? "dark" : "light";
  const theme = createMuiTheme({
      direction:'rtl',
      palette: {
          secondary: {
              main: 'rgba(0,0,0,0.5)', 
          },
          type: palletType,
      },
  });
  return (   
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Scrollbars style={{width:'100vw',height:'100vh'}}>
              <BrowserRouter>
                <AnimatedSwitch setDarkState={setDarkState} darkState={darkState}/> 
              </BrowserRouter> 
            </Scrollbars>
          </div>
        </ThemeProvider>
      </StylesProvider> 
  );
} 


export default App;
