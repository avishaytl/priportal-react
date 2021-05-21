import React, { useEffect, useState } from 'react';
import * as ReactDOM from "react-dom"
import { Doughnut  } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'
import { useStore } from '../storeui/storeui'
import { Observer } from 'mobx-react';
import styled , {keyframes} from 'styled-components';
import ReactTooltip from 'react-tooltip'; 
import { HiOutlineDotsHorizontal } from 'react-icons/hi';   
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';  
import Fade from '@material-ui/core/Fade';
import DropdwonMenu from './DropdwonMenu'; 

const ChartContainer = styled.div`  
  min-width: 100%;
  min-height: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;  
  overflow: hidden;  
  position: absolute;
  left: 0;
  top: 0; 
}
`
const ChartView = styled.div`  
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  overflow: hidden;  
`
const ChartValueView = styled.div`  
  position: absolute;
  bottom: 85px;  
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;  
}
`
const ChartValue = styled.p`   
  color: #202020; 
  font-size: 40px;   
  line-height: 40px;
}
`
const ChartValueTitle = styled.p`  
  color: #cecece;
  font-size: 12px;
  font-weight: 500;
  max-width: 100px;
  text-align: center;
}
`
const TableView = styled.div`  
  min-width: 50%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start;    
}
` 
const List = styled.ul`  
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start; 
}
`
const Item  = styled.li<any>`  
  min-width: 80%;
  height: 40px;
  display: flex;  
  flex-direction: row;
  align-items: center; 
  justify-content: flex-start;
  margin: 5px; 
  transition: background ease 0.15s; 
  :hover{
    background: #ececec; 
  }
  :hover p{
    font-size: 16px;   
  } 
}
`
const ItemValue  = styled.p`   
  font-size: 14px;
  font-weight: bold;
  color: #202020;  
  transition: font-size ease 0.2s;  
}
`
const ItemTitle  = styled.p`    
  width: 90%;
  font-size: 14px;
  text-align: right; 
  transition: font-size ease 0.2s; 
}
`
const RightBorder  = styled.p<any>`    
  width: 6px;
  height: 17px;
  border-radius: 15px; 
  background: ${props=>props.background};
  margin-left: 7px;
}`

const Main  = styled.div`    
  min-width: 100%;
  max-height: 100%;  
  display: flex;
  flex-direction: row;
  align-items: center; 
  justify-content: center;   
  height: 100%;
  flex: 1; 
}
`
const Header  = styled.div`    
  width: 100%; 
  padding-right: 25px;   
  display: flex;  
  flex-direction: row;
  align-items: center;  
  justify-content: flex-start; 
  border-bottom: 2px solid #e1e1e1;
  max-height: 50px;
}
`
const HeaderTitle  = styled.p`    
  font-size: 18px;
  font-weight: 500;
  text-align: right; 
  width: 100%;
  color: #202020;  
}`
const HeaderMenuIcon  = styled.div` 
  padding: 5px; 
  padding-left: 10px;       
}`

const MenuItemStyle = styled.div` 
  flex:1;
  cursor: default;
  :hover {
      background: ${'#2C324D'}; 
      color: #f1f1f1;
}`  

const svgChartRotate = (props: any) => keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(-${props.value}deg);
  }
`;

const ChartSvg = styled.g<any>`    
`;

export default function PieChart(props: any) { 
  const { setIsStatic } = props;
  const store = useStore()  
  const [isMenuOpen,setMenuOpen] = useState(null);  
    const data = { 
      datasets: [{
        data: [20, 50, 25, 35],
        backgroundColor: [
          '#f8a03b',
          '#e835a8',
          '#82d1cc',
          '#a24dc9'
        ],
        hoverBackgroundColor: [
          '#dc8828',
          '#c32a8c',
          '#70b9b4',
          '#9346b7'
        ],     
        hoverOffset: 3,
        cutout: '80%',
        radius: '60%',
        maintainAspectRatio : false,
        borderRadius: {
          outerEnd: 20,
          innerEnd: 20,
          outerStart: 20,
          innerStart: 20
        }
      }]
    };  
    const options = [
      'העתק',
      'הדבק',
      'קיצור דרך 1',
      'קיצור דרך 2',
      'קיצור דרך 3',
      'קיצור דרך 4',
      'קיצור דרך 5',
      'קיצור דרך 6',
    ];
    const handleMenuItemClick = (event: any, index: any) => {
        // setSelectedIndex(index); 
        alert(index)
    }; 
    const handleMenu = (event: any) => {
      setIsStatic()
      setMenuOpen(event.currentTarget);
    };
    const handleClose = () => {
      setMenuOpen(null);
      setIsStatic()
    };
  
    return (
      <ChartContainer> 
        <Header>
          <HeaderMenuIcon> 
            <HiOutlineDotsHorizontal style={{paddingTop:5,fontSize:24}} aria-controls="fade-menu" onClick={handleMenu}/>
            {/* <DropdwonMenu/> */}
              <Menu  
                  style={{marginTop:55,marginLeft:125}}
                  dir={'rtl'}
                  keepMounted
                  id="fade-menu"
                  open={Boolean(isMenuOpen)}
                  onClose={handleClose} 
                  anchorEl={isMenuOpen} 
                  TransitionComponent={Fade}
                
                  // anchorPosition={
                  // state.mouseY !== null && state.mouseX !== null
                  //     ? { top: state.mouseY, left: state.mouseX }
                  //     : undefined
                  // } 
              > 
                  {options.map((option, index) => (
                  <MenuItem 
                      style={{fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`}}
                      key={option}
                      disabled={index === 0 || index === 1}
                      // selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                  >
                      <MenuItemStyle>
                          {option}
                      </MenuItemStyle>
                  </MenuItem>
                  ))} 
              </Menu>  
          </HeaderMenuIcon>
          <HeaderTitle> 
            {`לורם איפסום`}
          </HeaderTitle>
        </Header>
        <Main> 
              {/* <svg className="circle-chart" viewBox="0 0 33.83098862 33.83098862" width="18vh" height="18vh" xmlns="http://www.w3.org/2000/svg">
                <circle className="circle-chart__background" stroke="#efefef" strokeWidth="2" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
                <circle className="circle-chart__circle" stroke="#314570" strokeWidth="2" strokeDasharray={20 + 30 + 25 + 10} strokeLinecap="round" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
              </svg>   */}
              
              {/* <div className="progress">
                      <div className="barOverflow ">
                        <div className="bar "></div>
                      </div>
                      <span>56.5</span>%
                    </div> */}
        </Main>
      </ChartContainer>
    ); 
}
 