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
  const useStyles = makeStyles((theme: any) => {
      let isDarkState =  theme.palette.background.default !== '#303030';
      return({   
        bgImg: { 
          backgroundColor: isDarkState ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0)', 
        }, 
        blurIn: { 
          filter: isDarkState ? 'blur(0) brightness(0.6)' : '',
          backgroundColor: isDarkState ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.3)',
        }, 
        blurOut: { 
          filter: isDarkState ? 'blur(6px) brightness(0.6)' : 'blur(6px)',
        },
        background: {
          background: !isDarkState ? '#191919' : '#f1f1f1', 
        },
        menuBackground: {
          background: isDarkState ? '#010101' : '#bebebe',  
        },
        backgroundNative: {
          background: isDarkState ? '#f1f1f1' : '#202020', 
        },
        primaryMenuB: { 
          background: data.secondColor,  
        },
        primaryMenuC: { 
          color: data.secondColor,  
        },
        color: {
          color: !isDarkState ? '#202020' : '#f1f1f1',
        },  
        colorNative: {
          color: isDarkState ? '#202020' : '#f1f1f1', 
        },
        menuItem: { 
          borderLeftColor: '#f1f1f1',// data.secondColor, 
          borderLeftStyle: 'dashed', 
          borderLeftWidth: 1,   
        },
        loginText: {
          color:  isDarkState ? '#f1f1f1' : '#202020',
        },
        lightB: {
          background: '#f1f1f1',
        },
        dark: {
          color: '#202020', 
        },
        darkB: {
          background: '#202020',
        },
        transform: {
          willChange: 'unset',
        },
        mainBackground: {
          background: isDarkState ? '#202020 !important' : '#f1f1f1 !important', 
        },
        mainWidthOpen: {
          position:'absolute',
          width: 'calc(100% - 300px)',
          left: 0, 
        }, 
        mainWidthClose: {
          position:'absolute',
          width: '100%',
          left: 0, 
        }
    })
  });
  const classes = useStyles(); 
  return (<TransitionGroup>
            <CSSTransition key={location.key} classNames={`slide`} timeout={1000}>
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
              <BrowserRouter>
                <AnimatedSwitch setDarkState={setDarkState} darkState={darkState}/> 
              </BrowserRouter>  
        </ThemeProvider>
      </StylesProvider> 
  );
} 


export default App;
