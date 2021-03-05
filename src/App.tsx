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
        backgroundColor: isDarkState ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
        filter: isDarkState ? 'brightness(0)' : 'brightness(0.5)'
      }, 
      background: {
        background: isDarkState ? '#303030' : '#ececec', 
      },
      backgroundNative: {
        background: isDarkState ? '#ececec' : '#303030', 
      },
      primaryMenuColor: { 
        background: data.secondColor,  
      },
      color: {
        color: isDarkState ? '#ececec' : '#303030',
      },  
      colorNative: {
        color: isDarkState ? '#303030' : '#ececec', 
      },
      light: {
        color: '#ececec',
      },
      dark: {
        color: '#303030', 
      }  
  })
  });
  const classes = useStyles(); 
  return (<TransitionGroup>
            <CSSTransition key={location.key} classNames={`slide`} timeout={2000}>
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
