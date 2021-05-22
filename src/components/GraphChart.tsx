import { Observer } from 'mobx-react';
import styled from 'styled-components'; 
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';  
import Fade from '@material-ui/core/Fade';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';     
import { useStore } from '../storeui/storeui';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { GrDocumentVerified,GrDocumentExcel,GrDocumentDownload } from 'react-icons/gr';       

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

const Main  = styled.div`    
  min-width: 100%;
  max-height: 100%;
  height: 100%;
  flex: 1; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;   
}
`  
const TableView = styled.div`  
  width: 100%;
  min-height: 100%;
  display: grid;   
  grid-template-columns: 100%;  
  padding: 0;
  margin: 0;
  max-height:200px;
  overflow:scroll;
  border-radius:10px;
}
`  
const Item  = styled.div<any>`   
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
  text-align:left;
  min-width:15%;
}
`
const ItemTitle  = styled.p`     
  font-size: 14px;
  text-align: right; 
  flex:1; 
  transition: font-size ease 0.2s;    
}
` 
const RightBorder  = styled.p<any>`    
  width: 5px;
  height: 17px;
  border-radius: 15px; 
  background: ${props=>props.background}; 
  margin-left: 7px;
}`
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
const ItemIcon  = styled.div<any>`      
  display: flex;  
  flex-direction: row;
  align-items: center;  
  justify-content: flex-end;  
}
`
const OnPressBack = styled.div<any>`  
  width:100%;
  height: 40px;   
  position:absolute; 
}
`
export default function GraphChart(props: any) {   
  const { setIsStatic, onRowPress, onRowIconPress } = props;
  const graphData = props.data;
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
  const data = {
    labels: [''],
    datasetIndex: 15,
    dataIndex: 15,
    datasets: [
      {   
        label: 'לורם איפסום',
        data: [0],
        backgroundColor: store.backgroundColors,
        borderColor: store.backgroundColorsA,
        borderWidth: 0,
      },
    ],
  }; 
  data.labels = graphData.map((item:any)=>{
    return item.cTitle;
  })
  data.datasets[0].data = graphData.map((item:any)=>{
    return parseInt(item.value);
  })
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
              <div style={{maxWidth: window.innerWidth <= 1100 ? 180 : window.innerWidth <= 1600 ? 250 : 300,zIndex:1,borderBottom:'2px solid #e1e1e1'}}>
            <Observer>
                    {() => (
                    <Bar  type={`Bar`}  data={data} options={{
                        scales: {
                            yAxes: [
                            {
                                ticks: {
                                beginAtZero: true,
                                },
                            },
                            ],
                        }, 
                        animation: {duration: store.isEndAnime ? 0 : 1200}
                    }} />
                    )}
          </Observer>  
          </div>
          <TableView dir={`rtl`}> 
            {graphData.map((item:any,index: number)=>{
              return <Item key={item.key}> 
              <OnPressBack onClick={()=>onRowPress(item.title + item.key)}/>
                  <RightBorder data-tip={item.tip}  background={store.getBackgroundColor(index)}/>
                  <ItemTitle>{item.title}</ItemTitle>   
                        {(item.icon1 || item.icon2 || item.icon3) && <ItemIcon>
                                            {item.icon1 && <GrDocumentVerified onClick={()=>onRowIconPress(item.key + ' ic1')} style={{opacity:0.5}}/>}
                                            {item.icon2 && <GrDocumentExcel onClick={()=>onRowIconPress(item.key + ' ic2')} style={{opacity:0.5}}/>}
                                            {item.icon3 && <GrDocumentDownload onClick={()=>onRowIconPress(item.key + ' ic3')} style={{opacity:0.5}}/>}
                                </ItemIcon>}
                  <ItemValue>{`${item.value}$`}</ItemValue>  
              </Item>
            })}
                    
          </TableView>
        </Main>
      </ChartContainer>
    ); 
}
 