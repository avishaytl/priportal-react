import './App.css'; 
import './App.scss'; 
import { create } from 'jss';
import rtl from 'jss-rtl';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles'; 
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; 
import { Scrollbars } from 'react-custom-scrollbars'; 
import LoginScreen from './screens/Login'; 
import MainScreen from './screens/Main';  

document.onkeydown = keyboardDown;
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

function keyboardDown(e: any){
  // console.debug(e.keyCode,e.key)
  // if(e.keyCode === 68){
  //   alert('d')
  // }
}

function keyboardUp(e: any){
  // alert('keyboardUp')
}

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });  

const data = { 
    titleCompanyName: 'Demo System', 
    primaryColor: '#48c0ee',
    secondColor: '#174768', 
}

const AnimatedSwitch = withRouter(({ location, setDarkState, darkState }: any) => {
  const useStyles = makeStyles((theme) => {
      let isDarkState =  theme.palette.background.default === '#303030';
      return({   
        bgImg: { 
          backgroundColor: isDarkState ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0)',
          // filter: isDarkState ? 'brightness(0)' : 'brightness(0.5)'
        }, 
        blurIn: { 
          filter: isDarkState ? 'blur(0) brightness(0.6)' : '',
          backgroundColor: isDarkState ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.3)',
        }, 
        blurOut: { 
          filter: isDarkState ? 'blur(6px) brightness(0.6)' : 'blur(6px)',
        },
        background: {
          background: isDarkState ? '#303030' : '#cecece', 
        },
        menuBackground: {
          background: isDarkState ? '#010101' : '#bebebe',  
        },
        backgroundNative: {
          background: isDarkState ? '#ececec' : '#303030', 
        },
        primaryMenuB: { 
          background: data.secondColor,  
        },
        primaryMenuC: { 
          color: data.secondColor,  
        },
        color: {
          color: isDarkState ? '#cecece' : '#303030',
        },  
        colorNative: {
          color: isDarkState ? '#303030' : '#ececec', 
        },
        menuItem: { 
          borderLeftColor: data.secondColor, 
          borderLeftStyle: 'solid',
          borderLeftWidth: 6, 
        },
        light: {
          color: '#ececec',
        },
        lightB: {
          background: '#ececec',
        },
        dark: {
          color: '#303030', 
        },
        darkB: {
          background: '#303030',
        },
        transform: {
          willChange: 'unset',
        },
    })
  });
  const classes = useStyles(); 
  return (<TransitionGroup>
            <CSSTransition key={location.key} classNames={`slide`} timeout={3000}>
              <Switch location={location}>
                <Route path={`/`} component={()=><LoginScreen  styles={classes} setDarkState={setDarkState} darkState={darkState}/> } exact /> 
                <Route path={`/main`} component={()=><MainScreen  styles={classes} setDarkState={setDarkState} darkState={darkState}/> } />
              </Switch>
            </CSSTransition>
          </TransitionGroup>)
});
 
function App() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? `dark` : `light`;
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
            <Scrollbars style={{width:'100vw',height:'100vh'}}>
              <BrowserRouter>
                <AnimatedSwitch setDarkState={setDarkState} darkState={darkState}/> 
              </BrowserRouter> 
            </Scrollbars> 
        </ThemeProvider>
      </StylesProvider> 
  );
} 


export default App;
