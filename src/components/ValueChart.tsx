import styled from 'styled-components';
import { FiTrendingDown } from 'react-icons/fi';  
import {useSpring, animated} from 'react-spring';     
import { useStore } from '../uistore/storeui';

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
  border-bottom: solid 4px ${props=>props.background};
  border-radius: 10px;
  background: #fff;
  transition: background .2s ease; 
  transition: border-bottom .2s ease; 
  :hover{
    background: ${props=>props.background};  
  }
  :hover div p{
    color: #fff; 
  } 
  :hover div{
    color: #fff; 
  }
  :hover :first-child{
    border-bottom: none;
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
const ChartValue = styled.p`   
  color: #202020; 
  font-size: 12px;   
  transition: scale .25s ease; 
}
`
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
  padding-bottom:10px;
}`
export default function ValueChart(pro: any) {  
  const props = pro.props;
  const store = useStore()  
    function AnimeIcon ({ on }:any) { 
      const mainProps = useSpring({ transform: 'translate(0px,0px)', from: { transform: store.isEndAnime ?  'translate(0px,0px)' : 'translate(-250px,-250px)' } });   
      return  <animated.div style={mainProps} >  
               <FiTrendingDown/>
            </animated.div> 
    }; 
    return (
      <ChartContainer onClick={()=>props.onRowPress(`לורם איפסום`)} background={props.background}> 
        <Header> 
          <HeaderTitle> 
            {`לורם איפסום`}
          </HeaderTitle>
        </Header>
        <Main>
          <ChartView data-tip={`3.9% לורם איפסום`}> 
              {/* <FiTrendingDown/> */}
              <AnimeIcon on={false}/>
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
 