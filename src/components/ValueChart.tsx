// import * as ReactDOM from "react-dom"
// import { Doughnut } from 'react-chartjs-2';
// import { ChartOptions } from 'chart.js'
// import { useStore } from '../storeui/storeui'
// import { Observer } from 'mobx-react';
import styled from 'styled-components';
// import ReactTooltip from 'react-tooltip'; 
// import { HiOutlineDotsHorizontal } from 'react-icons/hi';   
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';  
// import Fade from '@material-ui/core/Fade';
// import DropdwonMenu from './DropdwonMenu'; 
import { FiTrendingDown } from 'react-icons/fi';    

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
  border-bottom: solid 6px ${props=>props.background};
  border-radius: 10px;
  background: #f1f1f1;
  transition: background .2s ease; 
  :hover{
    background: ${props=>props.background}; 
  }
  :hover div p{
    color: #fff; 
  }
  :hover div:nth-child(2) p{
    transform: scale(1.1); 
  }
  :hover div{
    color: #fff; 
  }
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
const TableView = styled.div`  
  min-width: 70%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start;  
}
`
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
  display: flex;
  flex-direction: row;
  align-items: center; 
  justify-content: center;   
}
`
const Header  = styled.div`    
  width: 100%; 
  padding-right: 20px;   
  display: flex;  
  flex-direction: row;
  align-items: center;  
  justify-content: flex-start;    
}
`
const HeaderTitle  = styled.p`    
  font-size: 14px;
  font-weight: 500;
  text-align: right; 
  width: 100%;
  color: #202020;   
  padding-bottom:10px;
}`
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

export default function ValuetChart(props: any) {  
//   const store = useStore()  
//   const [isMenuOpen,setMenuOpen] = useState(null); 
//     const data = {
//       labels: [
//         // 'לביצוע',
//         // 'בוצע',
//         // 'אקדא'
//       ],
//       datasets: [{
//         data: [20, 50, 25, 35],
//         backgroundColor: [
//           '#f8a03b',
//           '#e835a8',
//           '#82d1cc',
//           '#a24dc9'
//         ],
//         hoverBackgroundColor: [
//           '#dc8828',
//           '#c32a8c',
//           '#70b9b4',
//           '#9346b7'
//         ],     
//         hoverOffset: 3,
//         cutout: '80%',
//         radius: '90%',
//         borderRadius: {
//           outerEnd: 20,
//           innerEnd: 20,
//           outerStart: 20,
//           innerStart: 20
//         }
//       }]
//     };  
//     const options = [
//       'העתק',
//       'הדבק',
//       'קיצור דרך 1',
//       'קיצור דרך 2',
//       'קיצור דרך 3',
//       'קיצור דרך 4',
//       'קיצור דרך 5',
//       'קיצור דרך 6',
//     ];
//     const handleMenuItemClick = (event: any, index: any) => {
//         // setSelectedIndex(index); 
//         alert(index)
//     }; 
//     const handleMenu = (event: any) => {
//       setIsStatic()
//       setMenuOpen(event.currentTarget);
//     };
//     const handleClose = () => {
//       setMenuOpen(null);
//       setIsStatic()
//     };
  
    return (
      <ChartContainer onClick={()=>alert(`לורם איפסום`)} background={'#01cb9e'}> 
        <Header> 
          <HeaderTitle> 
            {`לורם איפסום`}
          </HeaderTitle>
        </Header>
        <Main>
          <ChartView> 
              <FiTrendingDown/>
              <ChartValue> 
                {`3.9%`}
              </ChartValue>
          </ChartView>
          <TableView> 
              <TableValue> 
                {`580$`}
              </TableValue>
          </TableView> 
        </Main>
      </ChartContainer>
    ); 
}
 