import React, { useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import DoughnutChart from './DoughnutChart'
import ValueChart from './ValueChart'
import PieChart from './PieChart'
import TableChart from "./TableChart";
import GraphChart from "./GraphChart";

const ReactGridLayout = WidthProvider(RGL);

 const ComponentContainer = styled.div`  
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start;
    background: white; 
    border-radius: 10px;
    transition: box-shadow ease 0.3s; 
    -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15);
    box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15); 
    :hover{
      -webkit-box-shadow: 0px 0px 9px 2px rgba(0,0,0,0.25);
      -moz-box-shadow: 0px 0px 9px 2px rgba(0,0,0,0.25);
      box-shadow: 0px 0px 9px 2px rgba(0,0,0,0.25);   
    }
`
const HeaderIcon = styled.button<any>`  
  border: none;
  position: relative;
  left: ${props=>props.left};
  color: ${props=>props.color ? props.color : `#2c324d`};
  font-weight: 500;
  transition: font-size ease .15s;
  :hover{
    font-size: 14px;
  }
`

const htmlLayoutBase = {
  table: { w: 4, h: 10, x: 2, y: 0, static: false },
  graph: { w: 3, h: 10, x: 6, y: 0, static: false  },
  value: { w: 2, h: 3, x: 9, y: 0, static: false  },
  pie: { w: 2, h: 7, x: 9, y: 2, static: false },
  dough: { w: 4, h: 7, x: 11, y: 2, static: false }
}
const htmlLayout1600 = {
  table: { w: 5, h: 10, x: 1, y: 0, static: false },
  graph: { w: 4, h: 10, x: 6, y: 0, static: false },
  value: { w: 3, h: 3, x: 10, y: 0, static: false },
  pie: { w: 3, h: 7, x: 13, y: 0, static: false },
  dough: { w: 5, h: 7, x: 1, y: 2, static: false }
} 
const htmlLayout1300 = {
  table: { w: 6, h: 10, x: 1, y: 0, static: false },
  graph: { w: 5, h: 10, x: 7, y: 0, static: false },
  value: { w: 4, h: 3, x: 12, y: 0, static: false },
  pie: { w: 4, h: 7, x: 7, y: 2, static: false },
  dough: { w: 6, h: 7, x: 1, y: 2, static: false }
} 
const htmlLayout800 = {
  table: { w: 7, h: 10, x: 1, y: 0, static: false },
  graph: { w: 6, h: 10, x: 8, y: 0, static: false },
  value: { w: 5, h: 3, x: 1, y: 1, static: false },
  pie: { w: 5, h: 7, x: 8, y: 2, static: false },
  dough: { w: 7, h: 7, x: 1, y: 2, static: false }
} 
const htmlLayout600 = {
  table: { w: 16, h: 10, x: 0, y: 0, static: false },
  graph: { w: 16, h: 10, x: 0, y: 1, static: false },
  value: { w: 16, h: 3, x: 0, y: 2, static: false },
  pie: { w: 16, h: 7, x: 0, y: 5, static: false },
  dough: { w: 16, h: 7, x: 0, y: 6, static: false }
} 

const data = [
  { type: 'table', position: {x: 0, y: 0}, data:[] },
  { type: 'graph', position: {x: 0, y: 0}, data:[] },
  { type: 'value', position: {x: 0, y: 0}, data:[] },
  { type: 'value', position: {x: 0, y: 0}, data:[] },
  { type: 'value', position: {x: 0, y: 0}, data:[] },
  { type: 'pie', position: {x: 0, y: 0}, data:[] },
  { type: 'dough', position: {x: 0, y: 0}, data:[] },
]

export default function LocalStorageLayout(props: any){
    const [isStatic,setIsStatic] = useState(false);
    const [originalLayout,setOriginalLayout] = useState(getFromLS("layout") || []); 
    const [layout,setLayout] = useState(false); 
    const [lastCardPosition,setLastCardPosition] = useState({x:0,y:0,type:``});  
    const [lastCardKey,setLastCardKey] = useState(''); 

    // useEffect(()=>{ 
    //   if(realDataLayout)
    //     setRealDataLayout(!realDataLayout)
    // },[realDataLayout])

    const getComponentLayout = (type: string) =>{
      let lay = {w: 0,h: 0,}
      let comp: any = getDefaultLayout();  
      for(let field in comp)
        if(field === type){
          lay.w = comp[field].w; 
          lay.h = comp[field].h;
          break;
        }
      return lay;
    }

    const getCards = () =>{
      let result: any = [];
      data.map((component: any, index: number)=>{
        switch(component.type){
          case `table`:
            result.push(
              <div onMouseLeave={()=>setLastCardKey(`component${index}`)} className="grid-box" key={`component${index}`} data-grid={{ w: getComponentLayout(component.type).w, h: getComponentLayout(component.type).h, x: component.position.x, y: component.position.y, static: false }}>
                <ComponentContainer>
                  <TableChart setIsStatic={onChangeStatic}/>   
                </ComponentContainer> 
            </div>); 
            break;
          case `graph`:
            result.push(
              <div onMouseLeave={()=>setLastCardKey(`component${index}`)} className="grid-box" key={`graph-component${index}`} data-grid={{ w: getComponentLayout(component.type).w, h: getComponentLayout(component.type).h, x: component.position.x, y: component.position.y, static: false  }}>
                <ComponentContainer>
                  <GraphChart setIsStatic={onChangeStatic}/>  
                </ComponentContainer> 
            </div>); 
            break;
          case `value`:
            result.push(
              <div onMouseLeave={()=>setLastCardKey(`component${index}`)} className="grid-box" key={`value-component${index}`} data-grid={{ w: getComponentLayout(component.type).w, h: getComponentLayout(component.type).h, x: component.position.x, y: component.position.y, static: false  }}>
                <ComponentContainer>
                  <ValueChart setIsStatic={onChangeStatic}/>
                </ComponentContainer> 
            </div>); 
            break;
          case `pie`:
            result.push(
              <div onMouseLeave={()=>setLastCardKey(`component${index}`)} className="grid-box" key={`pie-component${index}`} data-grid={{ w: getComponentLayout(component.type).w, h: getComponentLayout(component.type).h, x: component.position.x, y: component.position.y, static: false }}>
                <ComponentContainer>
                  <PieChart setIsStatic={onChangeStatic}/>
                </ComponentContainer> 
            </div>); 
            break;
          case `dough`:
            result.push(
              <div onMouseLeave={()=>setLastCardKey(`component${index}`)} className="grid-box" key={`dough-component${index}`} data-grid={{ w: getComponentLayout(component.type).w, h: getComponentLayout(component.type).h, x: component.position.x, y: component.position.y, static: false }}>
                <ComponentContainer> 
                  <DoughnutChart setIsStatic={onChangeStatic}/>  
                </ComponentContainer> 
            </div>); 
            break;
        }  
      })
      return result
    }


    const getDefaultLayout = () =>{
      if(window.innerWidth >= 1600)
        return htmlLayoutBase; 
      if(window.innerWidth >= 1300)
        return htmlLayout1600;
      if(window.innerWidth >= 800)
        return htmlLayout1300;
      if(window.innerWidth >= 600)
        return htmlLayout800; 
      if(window.innerWidth <= 599)
        return htmlLayout600;  
    }

    const getWindowSize = () =>{   
      if(window.innerWidth >= 600)
        return 17;  
      return 16;  
    }
    
    const defaultProps: any = {
      className: "layout",
      cols: getWindowSize(),
      defaultLayout: getFromLS("layout") || [],
      rowHeight: 30,
      onLayoutChange: function(layout: any) {}, 
    }
     
    function resetLayout() {
      setLayout(!layout); 
      setTimeout(() => {
        setLayout(false)
      }, 500);
    }

    function onChangeStatic(){
      setIsStatic(!isStatic) 
    }

    function saveOnLS(){  
      resetLayout()
      removeFromLSO()
      originalLayout.map((card: any) => {
        card['static'] = true;
      })  
      saveToLS("layout", originalLayout);   
      setOriginalLayout(originalLayout)
      console.debug('save',originalLayout)   
    }

    function removeFromLS(key?: any){ 
      removeFromLSO(key)
      setOriginalLayout([]); 
      saveToLS("layout", originalLayout);
    }

    function onLayoutChange(layout: any) {
      /*eslint no-console: 0*/ 
      let i = parseInt(lastCardKey.split('component')[1]);
      if(layout && layout.length)  
          if(layout[i] && originalLayout[i])
            if(layout[i].x !== originalLayout[i].x || layout[i].y !== originalLayout[i].y)
              setLastCardPosition({x: layout[i].x, y: layout[i].y, type: layout[i].i.split('-')[0]})
      saveToLS("layout", layout);
      setOriginalLayout(layout) 
    }

    return (
      <div style={{overflow:'hidden'}}>   
        <HeaderIcon left={'30px'} onClick={removeFromLS}>
          {`איפוס`}
        </HeaderIcon>
        <HeaderIcon left={'40px'} onClick={saveOnLS}>
          {`שמירה`}
        </HeaderIcon> 
        <HeaderIcon color={`#cecece`} left={'50px'} onClick={removeFromLS}>
          {`ע ${lastCardPosition.x} ש ${lastCardPosition.y} ${lastCardPosition.type}`}
        </HeaderIcon>
        {
        //   realDataLayout ? <ReactGridLayout
        //     style={{minWidth:'100%'}}
        //   {...defaultProps}
        //   layout={originalLayout}
        //   onLayoutChange={onLayoutChange}
        // > 
        // <div className="grid-box" key="component1" data-grid={getDefaultLayout()?.table}>
        //     <ComponentContainer><span>1</span></ComponentContainer> 
        // </div>
        //   <div className="grid-box" key="graph-component2" data-grid={getDefaultLayout()?.graph}>
        //     <ComponentContainer><span>2</span></ComponentContainer> 
        //   </div>
        //   <div className="grid-box" key="value-component3" data-grid={getDefaultLayout()?.value}>
        //     <ComponentContainer><span>3</span></ComponentContainer> 
        //   </div> 
        //   <div className="grid-box" key="pie-component6" data-grid={getDefaultLayout()?.pie}>
        //     <ComponentContainer><span>6</span></ComponentContainer> 
        //   </div> 
        //   <div className="grid-box" key="dough-component7" data-grid={getDefaultLayout()?.dough}>
        //     <ComponentContainer> 
        //         <DoughnutChart setIsStatic={onChangeStatic}/>  
        //     </ComponentContainer> 
        //   </div> 
        // </ReactGridLayout> :
            layout ? null : <ReactGridLayout
              style={{minWidth:'100%'}}
            {...defaultProps}
            layout={originalLayout}
            onLayoutChange={onLayoutChange} 
          > 
          {getCards()}
          </ReactGridLayout>
        }
     
      </div>
    );
}

function getFromLS(key: any) {
  let ls:any = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7") as string) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function removeFromLSO(key?: any) { 
  if (global.localStorage) {
    try {
        global.localStorage.removeItem("rgl-7") 
    } catch (e) {
      /*Ignore*/
    }
  } 
}

function saveToLS(key: any, value: any) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

// if (process.env.STATIC_EXAMPLES === true) {
//   import("../test-hook.jsx").then(fn => fn.default(LocalStorageLayout));
// }