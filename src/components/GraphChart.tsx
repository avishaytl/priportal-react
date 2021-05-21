// import * as ReactDOM from "react-dom"
// import { Doughnut } from 'react-chartjs-2';
// import { ChartOptions } from 'chart.js'
// import { useStore } from '../storeui/storeui'
// import { Observer } from 'mobx-react';
import styled from 'styled-components';
// import ReactTooltip from 'react-tooltip'; 
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';  
import Fade from '@material-ui/core/Fade';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';    
import { FiTrendingDown } from 'react-icons/fi';    
import { useStore } from '../storeui/storeui';
import { useState } from 'react';

const ChartContainer = styled.div<any>`  
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
  min-width: 30%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;    
`
// const ChartValueView = styled.div`  
//   position: absolute;
//   bottom: 85px;  
//   display: flex;
//   flex-direction: column;
//   align-items: center; 
//   justify-content: center;  
// }
// `
const ChartValue = styled.p`   
  color: #202020; 
  font-size: 12px;   
  transition: scale .25s ease; 
}
`
// const ChartValueTitle = styled.p`  
//   color: #cecece;
//   font-size: 12px;
//   font-weight: 500;
//   max-width: 100px;
//   text-align: center;
// }
// ` 
const TableValue  = styled.p`   
  font-size: 40px;
  font-weight: bold;
  color: #202020;   
  transition: transform .2s; 
}
`
// const ItemTitle  = styled.p`    
//   width: 90%;
//   font-size: 14px;
//   text-align: right; 
//   transition: font-size ease 0.2s; 
// }
// `
// const RightBorder  = styled.p<any>`    
//   width: 6px;
//   height: 17px;
//   border-radius: 15px; 
//   background: ${props=>props.background};
//   margin-left: 7px;
// }`

const Main  = styled.div`    
  min-width: 100%;
  max-height: 100%;
  height: 100%;
  flex: 1; 
  display: flex;
  flex-direction: row;
  align-items: center; 
  justify-content: center;   
}
` 
// const HeaderMenuIcon  = styled.div` 
//   padding: 5px; 
//   padding-left: 25px;       
// }`

// const MenuItemStyle = styled.div` 
// flex:1;
// :hover {
//     background: ${'#2C324D'}; 
//     color: #f1f1f1;
// }`  

// const svgChartRotate = (props: any) => keyframes`
//   from {
//     transform: rotate(0);
//   }

//   to {
//     transform: rotate(-${props.value}deg);
//   }
// `;

// const ChartSvg = styled.g<any>`    
// `;

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
export default function GraphChart(props: any) {   
  const { setIsStatic } = props;
  const store = useStore()  
  const [isMenuOpen,setMenuOpen] = useState(null); 
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
          {/* <TableView>
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
          </TableView>  */}
        </Main>
      </ChartContainer>
    ); 
}
 