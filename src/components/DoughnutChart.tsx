import React, { useState } from 'react'; 
import { Doughnut } from 'react-chartjs-2'; 
import { useStore } from '../storeui/storeui'
import { Observer } from 'mobx-react';
import styled from 'styled-components'; 
import { HiOutlineDotsHorizontal } from 'react-icons/hi';   
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';  
import Fade from '@material-ui/core/Fade'; 
import { ValueCounter } from './ValueCounter';
import { GrDocumentVerified,GrDocumentExcel,GrDocumentDownload } from 'react-icons/gr';    

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
  bottom:  ${ window.innerWidth <= 800 ? `none` : `75px`};  
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;  
  z-index:0; 
}
`
const ChartValue = styled.p`   
  color: transparent; 
  font-size: 50px;   
  line-height: 40px;
}
`
const ChartValueTitle = styled.p`  
 padding-top: 10px;
  color: #cecece;
  font-size: ${ window.innerWidth <= 800 ? `12px` : `14px`};
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
  max-height:229px;
  overflow:scroll;
  border-radius:10px; 
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
  width:100%;
  height: 40px; 
  display: flex;  
  flex-direction: row;
  align-items: center; 
  padding: 10px;
  justify-content: flex-start; 
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
  margin-right:10px; 
  min-width:15%;
}
`
const ItemTitle  = styled.p`    
flex:1;
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
  padding-right: 15px;   
  display: flex;  
  flex-direction: row;
  align-items: center;  
  justify-content: flex-start; 
  border-bottom: 2px solid #e1e1e1;
  max-height: 50px;
}
`
const HeaderTitle  = styled.p`    
  font-size: 16px;
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
 
const ItemIcon  = styled.div<any>`      
display: flex;  
flex-direction: row;
align-items: center;  
justify-content: flex-end;  
}
`
export default function DoughnutChart(props: any) { 
  const { setIsStatic } = props;
  const doughData = props.data;
  const store = useStore()  
  const [isMenuOpen,setMenuOpen] = useState(null); 
    const data = {
      labels: [ 
      ],
      datasets: [{
        data: [0],
        backgroundColor: store.backgroundColors,
        hoverBackgroundColor: store.backgroundColorsA,
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
    let counter = 0;
    data.datasets[0].data = doughData.map((item:any)=>{
      counter += parseInt(item.value);
      return parseInt(item.value);
    })
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
              <Menu  
                  style={{marginTop:55,marginLeft:125}}
                  dir={'rtl'}
                  keepMounted
                  id="fade-menu"
                  open={Boolean(isMenuOpen)}
                  onClose={handleClose} 
                  anchorEl={isMenuOpen} 
                  TransitionComponent={Fade} 
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
          <ChartView className={`table-view-chart-doug`}>
            <ChartValueView>
              <ValueCounter value={counter} isEndAnime={store.isEndAnime}/>
              <ChartValue>
                {`${counter}$`}
                </ChartValue>
              <ChartValueTitle>
                {`איפסום לורם`}
              </ChartValueTitle>
            </ChartValueView> 
              {/* <svg className="circle-chart" viewBox="0 0 33.83098862 33.83098862" width="18vh" height="18vh" xmlns="http://www.w3.org/2000/svg">
                <circle className="circle-chart__background" stroke="#efefef" strokeWidth="2" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
                <circle className="circle-chart__circle" stroke="#314570" strokeWidth="2" strokeDasharray={20 + 30 + 25 + 10} strokeLinecap="round" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
              </svg>   */}
              <div style={{maxWidth: window.innerWidth <= 600 ? 130 : window.innerWidth <= 1100 ? 150 : window.innerWidth <= 1600 ? 200 : 210,zIndex:1}}>
                <Observer>
                    {() => (
                    <Doughnut   type={`Doughnut`} data={data} options={{ 
                        animation: {duration: store.isEndAnime ? 0 : 1200}
                    }} />
                 )}
               </Observer>  
              </div>
          </ChartView>
          <TableView className={`table-view-list-doug`}>
            <List>
              {doughData.map((item:any,index:number)=>{
                return <Item key={item.key} >
                  <ItemValue>{`${item.value}$`}</ItemValue>
                        {(item.icon1 || item.icon2 || item.icon3) && <ItemIcon>
                                            {item.icon1 && <GrDocumentVerified onClick={()=>alert(item.key + ' ic1')} style={{opacity:0.5}}/>}
                                            {item.icon2 && <GrDocumentExcel onClick={()=>alert(item.key + ' ic2')} style={{opacity:0.5}}/>}
                                            {item.icon3 && <GrDocumentDownload onClick={()=>alert(item.key + ' ic3')} style={{opacity:0.5}}/>}
                                </ItemIcon>}
                  <ItemTitle>{`${item.title}`}</ItemTitle>
                  <RightBorder data-tip={`${item.tip}`} background={store.getBackgroundColor(index)}/>
                </Item>
              })} 
            </List>
          </TableView> 
        </Main>
      </ChartContainer>
    ); 
}
 