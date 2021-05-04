import React from 'react';
import * as ReactDOM from "react-dom"
import { Doughnut } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'
import { useStore } from '../storeui/storeui'
import { Observer } from 'mobx-react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip'; 
import { HiOutlineDotsHorizontal } from 'react-icons/hi';   
import  DropdownExampleSearchSelection  from './DropdwonMenu'; 

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
  transition: background ease 0.2s; 
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
  transition: border-bottom ease 0.2s; 
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
}
`
const Header  = styled.div`    
  width: 100%; 
  padding-right: 25px;   
  display: flex;  
  flex-direction: row;
  align-items: center;  
  justify-content: flex-start; 
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


export default function DoughnutChart() { 
  const store = useStore()  
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
        cutout: 85,
        radius: 85,
        borderRadius: {
          outerEnd: 20,
          innerEnd: 20,
          outerStart: 20,
          innerStart: 20
        }
      }]
    };  
    return (
      <ChartContainer> 
        <Header>
          <HeaderMenuIcon> 
            <HiOutlineDotsHorizontal/>
            {/* <DropdownExampleSearchSelection/> */}
          </HeaderMenuIcon>
          <HeaderTitle> 
            {`לורם איפסום`}
          </HeaderTitle>
        </Header>
        <Main>
          <ChartView>
            <Observer>
                {() => (
                <Doughnut   type={`Doughnut`} data={data} options={{ 
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
 