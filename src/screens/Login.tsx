import '../App.css'; 
import '../App.scss';  
import { BsArrowRight } from 'react-icons/bs';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useRef, useState } from 'react'; 
// import ReactTooltip from 'react-tooltip';
import { useHistory } from 'react-router-dom'; 
import styled from 'styled-components'; 

interface UserLoginProps{
  position: string; // left, right, mid
  isPriorityUser: boolean;
  userName: string;
  userPass: string;
  imgSrc: string;
  language: string;
  onLoginPress: ()=> void;
  onLangauagePress: ()=> void;
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
  transition: all .1s ease-in-out;
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
  transition: all .1s ease-in-out;
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
  const LoginButton = styled.div` 
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #121e34 , #314570);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.25); 
  transition: all .1s ease-in-out;
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


function Input(props: UserInputProps){
  const { value, type, userRefs, onLoginPress } = props;
  const [inputValue, setInputValue] = useState(value)
  const [isHiddenEye, setHiddenEye] = useState(true)
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
  const { position, isPriorityUser, userName, userPass, imgSrc, language, onLoginPress, onLangauagePress } = props;
  const userRefs = {
    text: useRef(null),
    password: useRef(null),
  }; 
  const UserModal = styled.div` 
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
      ${position === 'mid' ? `` : position === `left` ? `left: 8vw` : `right: 8vw;`}
      `
  const ImageModal = styled.div`  
      width: 200px;
      height: 200px; 
      max-height: 300px;  
      max-width: 300px;   
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;  
      background-image: url(${imgSrc}); 
      `

  return(  
      <UserModal className={`user-modal`}>  
          <ImageModal/>
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
          <LoginButton onClick={onLoginPress}>
            <LoginButtonText>{`כניסה`}</LoginButtonText>
          </LoginButton>
      </UserModal>
  ) 
}

function Login(props: any){    
    const [modalPosition, setModalPosition] = useState('right');   
    const companyImage = 'https://bbware.in/wp-content/uploads/2017/06/8-1.jpg';
    const history = useHistory(); 
    const navigateToMain = () => { 
      history.push('/main')
    };  

    const LoginBackgroundView = styled.div` 
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
        align-items: ${modalPosition === 'mid' ? 'center' : modalPosition === 'left' ? 'flex-start' : 'flex-end'};
        justify-content: center;
        background-image: url(${companyImage}); 
        `
    return(  
        <div className={`login-screen`}> 
          {/* <ReactTooltip/> */}
          <LoginBackgroundView className={`login-back-view`}>
            <LoginUserModal 
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