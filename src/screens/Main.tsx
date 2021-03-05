import '../App.css'; 
import '../App.scss';  
import React, { useState } from 'react'; 
import ReactTooltip from 'react-tooltip'; 
import { push as Menu } from 'react-burger-menu'; 
import { FiSettings, FiSearch } from 'react-icons/fi'; 
import { BiMessageRoundedDetail } from 'react-icons/bi'; 
import { AiFillFileAdd, AiOutlineStar, AiFillHome, AiFillFolderOpen, AiFillFolder, AiOutlineFolderOpen, AiOutlineFolder, AiOutlineUser  } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { HiOutlineDocumentSearch } from 'react-icons/hi';       
import { RiPinDistanceLine, RiSendPlaneFill } from 'react-icons/ri';       
import { MdLocalOffer, MdLocalHospital } from 'react-icons/md';

const tooltip = {
    homeIcon: 'הוספה למסך בית',
    settingsIcon: 'הגדרות',
    msgIcon: 'הודעות',
}
  
const data = { 
    barCompanyName: 'סביבת הדגמה', 
    primaryColor: '#48c0ee',
    secondColor: '#174768', 
    userMsg: 3,
}

function ContextMenu(props: any) {
    const styles = props.styles;
    return ( 
      <Menu burgerBarClassName={styles.backgroundNative} isOpen={props.isMenuOpen} pageWrapId={props.pageWrapId} outerContainerId={props.outerContainerId} className={`burger-menu ${styles.background}`} right >
        <a id={`menu1`} className={`menu-item`} href={`/`}>מסך בית</a>
        <a id={`menu2`} className={`menu-item`} href={`/about`}>מטבחים ואיים צפים</a>
        <a id={`menu3`} className={`menu-item`} href={`/contact`}>שידות ומזנון</a>
        <a id={`menu4`} className={`menu-item`} href={`/about`}>ארונות ומיטות</a>
        <a id={`menu5`} className={`menu-item`} href={`/contact`}>שולחנות וכלי ישיבה</a>   
      </Menu> 
    );
} 

function UserMenu(props: any) {
    const styles = props.styles;
    return ( 
        <div className={`main-user-bar ${styles.primaryMenuColor}`}>
            <div onClick={()=>props.setMenuOpen(!props.isMenuOpen)}  className={`user-bar-bg-click`}/> 
            <p className={`user-bar-title ${styles.light}`}>
                {data.barCompanyName}
            </p>
            <div className={`user-bar-img ${styles.background}`}>
                <img className={`bar-img`} src='http://demo.softsolutions.co.il/images/mobilelogo.png' alt='logo'/>    
            </div> 
            <div className={`user-bar-container`}>
                <div className={`user-bar-grid-icons`}> 
                    <div className={`grid-item hvr-grow`}>
                        <FiSearch data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.colorNative}`}/>
                    </div>
                    <div className={`grid-item hvr-grow`}>
                        <AiFillFileAdd data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.colorNative}`}/>
                    </div>
                    <div className={`grid-item hvr-grow`}>
                        <AiOutlineStar data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.colorNative}`}/>
                    </div>  
                    <div className={`grid-item hvr-grow`}>
                        <AiFillHome data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.colorNative}`}/>
                    </div>
                    <div className={`grid-item hvr-grow`}>
                        <AiFillFolderOpen data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.colorNative}`}/>
                    </div>
                    <div className={`grid-item hvr-grow`}>
                        <AiFillFolder data-tip={tooltip.settingsIcon} className={`bar-user-icon ${styles.colorNative}`}/>
                    </div>
                </div> 
            </div>
            <div className={`user-bar-footer`}>
                <div className={`bar-footer-icons`}>
                    <div className={`hvr-grow`}> 
                        {data.userMsg ? <div className={`user-msg-ball`}>
                            <p className={`margin0-padding0 msg-text`}>{data.userMsg}</p>
                        </div> : null}
                        <BiMessageRoundedDetail style={{fontSize:34}} data-tip={tooltip.msgIcon} className={`footer-user-icon ${styles.colorNative}`}/>
                    </div>
                    <div className={`hvr-grow`}> 
                        <FiSettings data-tip={tooltip.settingsIcon} className={`footer-user-icon ${styles.colorNative}`}/>
                    </div>
                </div>
            </div>
        </div>
    );
} 

function Main(props: any) { 
    const [isMenuOpen,setMenuOpen] = useState(false)
    const styles = props.styles;
    return(
        <div className={`main-screen ${styles.background}`}>
          <ReactTooltip /> 
          <div id={`outer-container`}>
            <ContextMenu isMenuOpen={isMenuOpen} pageWrapId={ `page-wrap` } outerContainerId={ `outer-container` } styles={styles}/> 
            <main id={`page-wrap`}> 
              <div className={'main-container'}>
                <UserMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} styles={styles}/>
              </div>
            </main>
          </div>
        </div> 
    )
}

export default Main;