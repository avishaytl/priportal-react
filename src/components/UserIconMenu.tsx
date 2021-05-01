import {useSpring, animated} from 'react-spring';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react'; 

function UserIconText ({ on, child }:any) { 
    const mainProps = useSpring({ top: on ? -40 : 0, paddingRight: on ? 15 : 0, paddingTop: on ? 10 : 0, maxWidth: on ? '80%' : '100%', position:'relative' ,  from: { top: on ? 0 : -40, paddingRight: on ? 0 : 15, paddingTop: on ? 0 : 10, maxWidth: on ? '100%' : '80%' } }); 
    return  <animated.div className={`user-icon-text-view`} style={mainProps} >    
                {child} 
          </animated.div> 
}; 
   
function UserIconMenuT ({ on, child, value, darkState }:any) {
    const mainProps = useSpring({ height: on ? 50 : 90, width: on ? 200 : 90,  from: { height: on ? 90 : 50, width: on ? 90 : 200 } });  
    
    let ho = darkState ? '#ffffffa0' : '#000000a0';
    const MenuItem = styled.div`
        padding-top: 3px; 
        max-height: 40px; 
        transition-duration: 0.2s; 
        transition-property: transform;   
        :hover {
            background: ${ho};  
            transform: scale(1.1);
        }
    `
    // const isOn = React.memo(on);
    return  <animated.div className={`user-icon-menu`} style={mainProps} >   
                <MenuItem>
                    {child}
                    <UserIconText on={on} child={<p className={`user-icon-text`}>{value}</p>}/> 
                </MenuItem> 
          </animated.div> 
};
function UserLabelMenu ({ on, child, darkState, value }:any) { 
    const [isOpen,setIsOpen] = useState(on) 
    let ho = darkState ? '#ffffffa0' : '#000000a0';
    const MenuItem = styled.div`
        padding-top: 3px; 
        max-height: 40px; 
        transition-duration: 0.2s; 
        transition-property: transform;   
        :hover {
            background: ${ho};  
            transform: scale(1.1);
        }
    `
    return(
        <div className={`user-icon-menu`} style={{backgroundColor: isOpen ? 'red' : 'yellow', height: isOpen ? 50 : 90}}>
            <MenuItem>
                {child}
                <p className={`user-icon-text`}>{value}</p>
            </MenuItem> 
        </div>
    )
}; 
   
export default  UserLabelMenu;