import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';  
import Fade from '@material-ui/core/Fade';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';    
import { GrDocumentVerified,GrDocumentExcel,GrDocumentDownload } from 'react-icons/gr';        
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
const TableView = styled.div`  
  min-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start;    
  max-height:350px;
  overflow:scroll;
  border-radius:10px;
}
`  
const Item  = styled.li<any>`   
  width: 100%;
  min-height: 40px;
  padding-right: 10px;
  display: flex;  
  flex-direction: row;
  align-items: center; 
  justify-content: flex-start; 
  transition: background ease 0.15s; 
  :hover{
    background: #ececec;   
  }
  :hover p:nth-child(${props=>props.isIcon ? `4` : `3`}){
    font-size: 16px;   
  } 
  :hover p:nth-child(1){
    font-size: 16px;   
  }
}
`
const ItemValue  = styled.p<any>`   
  font-size: 14px;
  font-weight: ${(props)=>props.isValue ? `bold` : `400`};
  color: #202020;  
  transition: font-size ease 0.2s;  
  min-width:15%;
  margin-right:10px;
  margin-left:10px;
}
`
const ItemIcon  = styled.div<any>`    
  min-width:15%; 
  padding-top:5px; 
  display: flex;  
  flex-direction: row;
  align-items: center;  
  justify-content: flex-start; 
  z-index:5;
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
  width: 10px;
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
const OnPressBack = styled.div<any>`  
  width:100%;
  height: 40px;   
  position:absolute;  
}
`
export default function TableChart(props: any) {   
  const { setIsStatic, data, onRowPress, onRowIconPress } = props;
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
          <TableView>
            {data.map((item: any)=>{
              let brColor = item.pos === `1` ? `#82d18c` : item.pos === `2` ? `#f4c162` : `#d18282`
              return <Item isIcon={item.icon1 || item.icon2 || item.icon3} key={item.key} background={`${brColor}6a`}> 
                      {/* <OnPressBack onClick={()=>onRowPress(item.title + item.key)}/> */}
                        <ItemValue isValue>{item.firstVal}</ItemValue>
                        <ItemValue>{item.secVal}</ItemValue>  
                        {(item.icon1 || item.icon2 || item.icon3) && <ItemIcon>
                                            {item.icon1 && <GrDocumentVerified onClick={()=>onRowIconPress(item.key + ' ic1')} style={{opacity:0.5}}/>}
                                            {item.icon2 && <GrDocumentExcel onClick={()=>onRowIconPress(item.key + ' ic2')} style={{opacity:0.5}}/>}
                                            {item.icon3 && <GrDocumentDownload onClick={()=>onRowIconPress(item.key + ' ic3')} style={{opacity:0.5}}/>}
                                </ItemIcon>}
                        <ItemTitle onClick={()=>onRowPress(item.title + item.key)}>{item.title}</ItemTitle>
                        <RightBorder data-tip={item.tip} background={brColor}/>
                    </Item> 
            })}
               
          </TableView>
        </Main>
      </ChartContainer>
    ); 
}
 