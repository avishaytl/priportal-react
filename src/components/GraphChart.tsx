import { Observer } from 'mobx-react';
import styled from 'styled-components'; 
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';  
import Fade from '@material-ui/core/Fade';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';     
import { useStore } from '../storeui/storeui';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

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
  height: 100%;
  display: grid;  
  grid-template-columns: auto auto;
}
`  
const Item  = styled.div<any>`   
  height: 40px;
  display: flex;  
  flex-direction: row;
  align-items: center; 
  padding: 5px;
  justify-content: flex-end;
  margin: 5px; 
  transition: background ease 0.15s; 
  :hover{
    background: #ececec; 
  }
  :hover :first-child{
    font-size: 16px;   
  } 
 
}
`
const ItemValue  = styled.p`   
  font-size: 14px;
  font-weight: bold;
  color: #202020;  
  transition: font-size ease 0.2s;  
  position: absolute; 
  margin-right:40%
}
`
const ItemTitle  = styled.p`    
  width: 90%;
  font-size: 14px;
  text-align: right; 
}
`
const RightBorder  = styled.p<any>`    
  width: 6px;
  height: 17px;
  border-radius: 15px; 
  background: ${props=>props.background};
  margin-left: 7px;
  transition: background ease 0.2s;  
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
    labels: ['רוני', 'אסף', 'מוטי', 'דוד', 'אורנה', 'לורם'],
    datasetIndex: 15,
    dataIndex: 15,
    datasets: [
      {   
        label: 'לורם איפסום',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [ 
          '#7aa770',
          '#82d1cc',
          '#f3bb7b',
          '#ac6093',
          '#a282e0',
          '#dc597d',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 0,
      },
    ],
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
              <div style={{zIndex:1}}>
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
                        animation: {duration: store.isEndAnime ? 0 : 600}
                    }} />
                    )}
          </Observer>  
          </div>
          <TableView> 
                    <Item data-tip={`30 אל'טרה בע"ה - לורם איפסום`} onClick={()=>alert(`רוני`)} background={`${`#7aa770`}6a`}> 
                        <ItemValue>{`12`}</ItemValue>
                        <ItemTitle>{`רוני`}</ItemTitle>
                        <RightBorder background={`#7aa770`}/>
                    </Item>
                    <Item data-tip={`30 אל'טרה בע"ה - לורם איפסום`} onClick={()=>alert(`אסף`)} background={`${`#82d1cc`}6a`}> 
                        <ItemValue>{`19`}</ItemValue>
                        <ItemTitle>{`אסף`}</ItemTitle>
                        <RightBorder background={`#82d1cc`}/>
                    </Item>
                    <Item data-tip={`30 אל'טרה בע"ה - לורם איפסום`} onClick={()=>alert(`מוטי`)} background={`${`#f3bb7b`}6a`}> 
                        <ItemValue>{`3`}</ItemValue>
                        <ItemTitle>{`מוטי`}</ItemTitle>
                        <RightBorder background={`#f3bb7b`}/>
                    </Item>
                    <Item data-tip={`30 אל'טרה בע"ה - לורם איפסום`} onClick={()=>alert(`דוד`)} background={`${`#ac6093`}6a`}> 
                        <ItemValue>{`5`}</ItemValue>
                        <ItemTitle>{`דוד`}</ItemTitle>
                        <RightBorder background={`#ac6093`}/>
                    </Item>
                    <Item data-tip={`30 אל'טרה בע"ה - לורם איפסום`} onClick={()=>alert(`אורנה`)} background={`${`#a282e0`}6a`}> 
                        <ItemValue>{`2`}</ItemValue>
                        <ItemTitle>{`אורנה`}</ItemTitle>
                        <RightBorder background={`#a282e0`}/>
                    </Item>
                    <Item data-tip={`30 אל'טרה בע"ה - לורם איפסום`} onClick={()=>alert(`לורם`)} background={`${`#dc597d`}6a`}> 
                        <ItemValue>{`3`}</ItemValue>
                        <ItemTitle>{`לורם`}</ItemTitle>
                        <RightBorder background={`#dc597d`}/>
                    </Item>
          </TableView>
        </Main>
      </ChartContainer>
    ); 
}
 