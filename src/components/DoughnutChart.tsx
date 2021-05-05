import React, { useState } from 'react';
import * as ReactDOM from "react-dom"
import { Doughnut } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'
import { useStore } from '../storeui/storeui'
import { Observer } from 'mobx-react';
import styled from 'styled-components';
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
  min-width: 50%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;   
`
const ChartValueView = styled.div`  
  position: absolute;
  bottom: 80px;  
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;  
}
`
const ChartValue = styled.p`   
  color: #202020; 
  font-size: 2vw;   
  line-height: 40px;
}
`
const ChartValueTitle = styled.p`  
  color: #cecece;
  font-size: 0.70vw;
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
  font-size: 0.7vw;
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
  padding-left: 25px;       
}`

const MenuItemStyle = styled.div` 
flex:1;
:hover {
    background: ${'#cecece'}; 
}`  

export default function DoughnutChart(props: any) { 
  const { setIsStatic } = props;
  const store = useStore()  
  const [isMenuOpen,setMenuOpen] = useState(null);
    const data = {
      labels: [
        // 'לביצוע',
        // 'בוצע',
        // 'אקדא'
      ],
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
        radius: '90%',
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
                  style={{marginTop:30,marginLeft:100}}
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
          <ChartView>
            <ChartValueView>
              <ChartValue>
                {`${20 + 30 + 25 + 10}` + `$`}
              </ChartValue>
              <ChartValueTitle>
                {`איפסום לורם`}
              </ChartValueTitle>
            </ChartValueView>
            <Observer>
                {() => (
                <Doughnut type={`Doughnut`} data={data} options={{ 
                  animation: {duration: store.isEndAnime ? 0 : 600}
                }} />
              )}
            </Observer>   
          </ChartView>
          <TableView>
            <List>
              <Item borderColor={`#7aa770`} data-tip={`30 אל'טרה בע"ה - לורם איפסום`}>
                <ItemValue>{`30` + `$`}</ItemValue>
                <ItemTitle>{`לורם איפסום`}</ItemTitle>
                <RightBorder background={`#7aa770`}/>
              </Item>
              <Item data-tip={`25 אל'טרה בע"ה - לורם איפסום`}>
                <ItemValue>{`25` + `$`}</ItemValue>
                <ItemTitle>{`לורם איפסום`}</ItemTitle>
                <RightBorder background={`#82d1cc`}/>
              </Item>
              <Item data-tip={`20 אל'טרה בע"ה - לורם איפסום`}>
                <ItemValue>{`20` + `$`}</ItemValue>
                <ItemTitle>{`לורם איפסום`}</ItemTitle>
                <RightBorder background={`#f3bb7b`}/>
              </Item>
              <Item data-tip={`10 אל'טרה בע"ה - לורם איפסום`}>
                <ItemValue>{`10` + `$`}</ItemValue>
                <ItemTitle>{`לורם איפסום`}</ItemTitle>
                <RightBorder background={`#ac6093`}/>
              </Item>
            </List>
          </TableView> 
        </Main>
      </ChartContainer>
    ); 
}
 