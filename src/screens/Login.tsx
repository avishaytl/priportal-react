import '../App.css'; 
import '../App.scss';  
import { BsArrowRight } from 'react-icons/bs';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useRef, useState } from 'react';  
import { useHistory } from 'react-router-dom'; 
import styled from 'styled-components'; 
import LazyImage from '../components/LazyImage';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface UserLoginProps{
  position: string; // left, right, mid
  isPriorityUser: boolean;
  userName: string;
  userPass: string;
  imgSrc: string;
  language: string;
  onLoginPress: ()=> void;
  onLangauagePress: ()=> void;
  colors: object
}

interface UserInputProps{
  value: string;
  type: string;
  userRefs: any; 
  onLoginPress: ()=> void;
}

const TitleModal = styled.h1` 
  color: #383838;
  font-weight: 600;
  font-size: 4vh;
  margin: 15px;
  text-align: center;
`
const LangButton = styled.div` 
  width: 44px;
  height: 24px; 
  background: #dbe8f2;
  border-radius: 18px / 12px; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 2px;
  transition: all ease-in-out .1s;
  margin-bottom: 0px;
  margin-top: 0px;
  :hover{ 
    background: #bfd1e0;
    -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.05);
    -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.05);
    box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.05); 
  }
`
const UserInputView = styled.div` 
  width: 100%;
  height: 80px; 
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center; 
  margin-top: 2px;
  margin-bottom: 2px; 
` 
const UserInput = styled.div` 
  width: 100%;
  height: 50px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #ececec; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start; 
  border-radius: 8px;  
  transition: all ease-in-out .1s;
  border: solid 1px #cecece;
  :hover{
    transform: scale(1.02); 
    -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.05);
    -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.05);
    box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.05); 
  }
` 
const UserInputLabel = styled.label`  
  display: block;
  position: relative; 
  margin-bottom: 3px;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`  
const LangValue = styled.p` 
  font-size: 14px;
  color: #314570;
  font-weight: 500;
  `
  const LoginButton = styled.div<any>` 
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, ${props => props.colors.primary},${props => props.colors.secondary});
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.25); 
  transition: all ease-in-out .1s;
  :hover{
    transform: scale(1.02);  
  }
`
const LoginButtonText = styled.p` 
  color: #ececec;
  font-weight: 400;
  font-size: 18px;
`
const PriorityUserView = styled.div` 
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end; 
` 
const PriorityUserLabel = styled.label`  
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;  
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const UserModal = styled.div<any>` 
    width: 450px;
    height: 65vh;
    background: #ffffffc0;
    position: absolute;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.25);
    max-width: 90vw;
    min-height: 600px;
    max-height: 100vh;
    padding-left: 50px; 
    padding-right: 50px; 
    ${props => props.position === 'mid' ? `` : props.position === `left` ? `left: 8vw` : `right: 8vw;`}
    `
// const ImageModal = styled.div<any>`  
//     width: 200px;
//     height: 200px; 
//     max-height: 300px;  
//     max-width: 300px;   
//     background-position: center;
//     background-size: cover;
//     background-repeat: no-repeat;  
//     background-image: url(${props => props.imgSrc}); 
//     `

const LoginBackgroundView = styled.div<any>` 
    flex:1;
    max-width: 100vw;
    height: 100vh;  
    max-height: 100vh;  
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat; 
    min-width: 100vw;
    display: flex;
    flex-direction: column; 
    align-items: ${props => props.modalPosition === 'mid' ? 'center' : props.modalPosition === 'left' ? 'flex-start' : 'flex-end'};
    justify-content: center; 
    `

function Input(props: UserInputProps){
  const { value, type, userRefs, onLoginPress } = props;
  const [inputValue, setInputValue] = useState(value)
  const [isHiddenEye, setHiddenEye] = useState(true)
  const handleFocus = (e:any) => {
    if(type === `text`)
      e.target.select();
  };
  return <> 
    {type === `password` && (!isHiddenEye ? <FaRegEye onClick={()=>setHiddenEye(!isHiddenEye)}/> : <FaRegEyeSlash onClick={()=>setHiddenEye(!isHiddenEye)}/>)}
    <input 
        onKeyDown={(e)=>{
            if (e.key === 'Enter')
              if(type === `text` && userRefs[`password`])
                userRefs[`password`].current.focus();
              else 
                onLoginPress() 
        }} 
        ref={userRefs[type]} 
        defaultValue={inputValue} 
        onChange={(e)=>setInputValue(e.target.value)} 
        className={`user-login-input`} 
        autoFocus={type === `text`} 
        // onFocus={handleFocus}
        type={type === `text` || !isHiddenEye ? `text` : `password`} />
  </>
}

function InputCheckbox(props: {value: boolean}){
  const { value } = props;
  const [isCheck, setIsCheck] = useState(value) 
  return <label className="user-login-priority-label">{`משתמש פריוריטי`}  
          <input onChange={()=>setIsCheck(!isCheck)} checked={isCheck} type="checkbox"/>
          <span className="user-login-priority-span"></span>
        </label> 
}

function LoginUserModal(props: UserLoginProps){
  const { colors, position, isPriorityUser, userName, userPass, imgSrc, language, onLoginPress, onLangauagePress } = props;
  const userRefs = {
    text: useRef(null),
    password: useRef(null),
  }; 

  return(  
      <UserModal position={position} className={`user-modal`}>  
          {/* <ImageModal imgSrc={imgSrc}/> */}
          <LazyImage image={{
                container: {width:'200px',height:'200px'},
                alt: 'company img?',
                src: imgSrc,
            }}/>
          <LangButton onClick={onLangauagePress}>
            <LangValue>{language === 'Il' ? 'En' : 'Il'}</LangValue>
            <BsArrowRight style={{paddingTop:2}}/>
          </LangButton>
          <TitleModal className={`user-login-title`}>{`כניסה למערכת`}</TitleModal> 
          <UserInputView>
            <UserInputLabel>{`שם משתמש`}</UserInputLabel>
            <UserInput>
              <Input onLoginPress={onLoginPress} userRefs={userRefs} value={userName} type={`text`}/> 
            </UserInput> 
          </UserInputView>
          <UserInputView>
            <UserInputLabel>{`סיסמא`}</UserInputLabel>
            <UserInput> 
              <Input onLoginPress={onLoginPress} userRefs={userRefs} value={userPass} type={`password`}/> 
            </UserInput> 
          </UserInputView>
          <PriorityUserView>
            <PriorityUserLabel> 
              <InputCheckbox value={isPriorityUser}/>
            </PriorityUserLabel> 
          </PriorityUserView>
          <LoginButton colors={colors} onClick={onLoginPress}>
            <LoginButtonText>{`כניסה`}</LoginButtonText>
          </LoginButton>
      </UserModal>
  ) 
}

function Login(props: any){    
    const [modalPosition, setModalPosition] = useState('right'); // right, left, mid  
    const companyImage = 'https://wallpaperaccess.com/full/521095.jpg';
    const colors = {primary: '#121e34',secondary:'#314570', tertiary: '#1e2c4c'}
    const history = useHistory(); 
    const navigateToMain = () => { 
      history.push('/main')
    };  

    return(  
        <div className={`login-screen`}> 
          {/* <ReactTooltip/> */}
          <LoginBackgroundView modalPosition={modalPosition} className={`login-back-view`}>
            <LazyImage image={{
                container: {width:'100vw',height:'100vh'},
                alt: 'company img?',
                src: companyImage,
            }}/>
            <LoginUserModal 
                colors={colors}
                position={modalPosition} 
                isPriorityUser={false} 
                userName={`avishay`} 
                userPass={`P0O9i8u7`} 
                imgSrc={`https://demo.softsolutions.co.il/images/softlogo.png`}
                language={`Il`}
                onLoginPress={()=>{
                  navigateToMain();
                }}
                onLangauagePress={()=>{
                  alert('onLangauagePress')
                }} 
              />
          </LoginBackgroundView> 
        </div>   
    )
};

export default Login;