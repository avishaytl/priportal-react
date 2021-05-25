import { useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import DoughnutChart from './DoughnutChart'
import ValueChart from './ValueChart'
import PieChart from './PieChart'
import TableChart from "./TableChart";
import GraphChart from "./GraphChart";
import AlertDialog from "./helpers/AlertDialog";
import { useStore } from "../uistore/storeui";

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
  dough: { w: 7, h: 7, x: 1, y: 2, static: false }
} 
const htmlLayout800 = {
  table: { w: 8, h: 10, x: 1, y: 0, static: false },
  graph: { w: 6, h: 10, x: 8, y: 0, static: false },
  value: { w: 5, h: 3, x: 1, y: 1, static: false },
  pie: { w: 5, h: 7, x: 8, y: 2, static: false },
  dough: { w: 9, h: 7, x: 1, y: 2, static: false }
} 
const htmlLayout700 = {
  table: { w: 9, h: 10, x: 1, y: 0, static: false },
  graph: { w: 6, h: 10, x: 8, y: 0, static: false },
  value: { w: 5, h: 3, x: 1, y: 1, static: false },
  pie: { w: 5, h: 7, x: 8, y: 2, static: false },
  dough: { w: 10, h: 7, x: 1, y: 2, static: false }
} 
const htmlLayout600 = {
  table: { w: 16, h: 10, x: 0, y: 0, static: false },
  graph: { w: 16, h: 10, x: 0, y: 1, static: false },
  value: { w: 16, h: 3, x: 0, y: 2, static: false },
  pie: { w: 16, h: 7, x: 0, y: 5, static: false },
  dough: { w: 16, h: 7, x: 0, y: 6, static: false }
} 

// function getRandomArbitrary(min: number, max: number) { 
//   return `${(Math.random() * (max - min) + min).toFixed(0)}`;
// }

// const tableData = [
//   {key:1, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `208$`, secVal: `19.2.2`, icon1: true, icon2: false, icon3: true,title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
//   {key:2, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `258$`, secVal: `18.2.2`, icon1: false, icon2: true, icon3: false, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
//   {key:3, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `8$`, secVal: `17.2.2`, icon1: true, icon2: true, icon3: false, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
//   {key:4, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `28$`, secVal: `16.2.2`, icon1: true, icon2: true, icon3: true, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
//   {key:5, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `0$`, secVal: `15.2.2`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
//   {key:6, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `25$`, secVal: `14.2.2`, icon1: false, icon2: true, icon3: true, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
//   {key:7, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `58$`, secVal: `13.2.2`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
//   {key:8, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `250$`, secVal: `12.2.2`, icon1: true, icon2: true, icon3: false, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
//   {key:9, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `208$`, secVal: `11.2.2`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
//   {key:10, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `2508$`, secVal: `1.2.2`, icon1: false, icon2: true, icon3: false, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
//   {key:11, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, firstVal: `258$`, secVal: `2.2.2`, icon1: true, icon2: true, icon3: true, title: `לורם איפסום`, pos: getRandomArbitrary(1,3)},
// ]

// const graphData = [
//   {key:1, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `12`, icon1: true, icon2: true, icon3: true, title: `מאי`, cTitle: `מאי`},
//   {key:2, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `19`, icon1: false, icon2: true, icon3: true, title: `יוני`, cTitle: `יוני`},
//   {key:3, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `9`, icon1: true, icon2: false, icon3: false, title: `יולי`, cTitle: `יולי`},
//   {key:4, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `5`, icon1: true, icon2: true, icon3: true, title: `אוגוסט`, cTitle: `אוג`},
//   {key:5, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `8`, icon1: true, icon2: true, icon3: false, title: `ספטמבר`, cTitle: `ספט`},
//   {key:6, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `3`, icon1: false, icon2: false, icon3: true, title: `נובמבר`, cTitle: `נוב`},
//   {key:7, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `10`, icon1: true, icon2: true, icon3: false, title: `דצמבר`, cTitle: `דצמ`},
//   {key:8, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `1`, icon1: true, icon2: true, icon3: true, title: `ינואר`, cTitle: `ינו`},
// ] 

// const valueData = [
//   {key: 1,background: '#01cb9e'},
//   {key: 2,background: '#e84949'},
//   {key: 3,background: '#fad16b'}
// ]

// const doughData = [
//   {key:1, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `30`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`},
//   {key:2, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `25`, icon1: true, icon2: false, icon3: false, title: `לורם איפסום`},
//   {key:3, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `20`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`},
//   {key:4, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `10`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`}, 
//   {key:5, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `30`, icon1: true, icon2: true, icon3: true, title: `לורם איפסום`},
//   {key:6, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `25`, icon1: true, icon2: false, icon3: true, title: `לורם איפסום`},
//   {key:7, tip: `30 אל'טרה בע"ה - דצמבר איפסום`, value: `20`, icon1: true, icon2: true, icon3: true, title: `לורם איפסום`}, 
// ] 


// const data = [
//   { type: 'table', position: {x: 0, y: 0}, data: tableData },
//   { type: 'graph', position: {x: 0, y: 0}, data: graphData },
//   { type: 'value', position: {x: 0, y: 0}, data: valueData[0]},
//   { type: 'value', position: {x: 0, y: 0}, data: valueData[1]},
//   { type: 'value', position: {x: 0, y: 0}, data: valueData[2]},
//   { type: 'pie', position: {x: 0, y: 0}, data:[] },
//   { type: 'dough', position: {x: 0, y: 0}, data: doughData },
// ]

export default function Gridlayout(props: any){
    const { data } = props;
    const [isStatic,setIsStatic] = useState(false);
    const [originalLayout,setOriginalLayout] = useState(getFromLS("layout") || []); 
    const [layout,setLayout] = useState(false); 
    const [lastCardPosition,setLastCardPosition] = useState({x:0,y:0,type:``});  
    const [lastCardKey,setLastCardKey] = useState(''); 
    const store = useStore()  
    const [isSetScreenProps,setScreenProps] = useState(false)

    const setScreenProps1 = () =>{  
      if(!isSetScreenProps && ((window.innerWidth <= 580 && window.innerWidth >= 570) || (window.innerWidth <= 700 && window.innerWidth >= 710) || (window.innerWidth <= 880 && window.innerWidth >= 870) || (window.innerWidth <= 1050 && window.innerWidth >= 1040)) ){
        setScreenProps(!isSetScreenProps)
        store.setAlertDialogOpen(true)
        // setScreenProps(true)
        // await removeFromLS();
        // setScreenProps(false)
      }
    }
    useEffect(()=>{ 
      window.addEventListener('resize',setScreenProps1)
    })
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
                  <TableChart onRowPress={component.onRowPress} onRowIconPress={component.onRowIconPress} data={component.data} setIsStatic={onChangeStatic}/>   
                </ComponentContainer> 
            </div>); 
            break;
          case `graph`:
            result.push(
              <div onMouseLeave={()=>setLastCardKey(`component${index}`)} className="grid-box" key={`graph-component${index}`} data-grid={{ w: getComponentLayout(component.type).w, h: getComponentLayout(component.type).h, x: component.position.x, y: component.position.y, static: false  }}>
                <ComponentContainer>
                  <GraphChart onRowPress={component.onRowPress} onRowIconPress={component.onRowIconPress} data={component.data} setIsStatic={onChangeStatic}/>  
                </ComponentContainer> 
            </div>); 
            break;
          case `value`:
            result.push(
              <div onMouseLeave={()=>setLastCardKey(`component${index}`)} className="grid-box" key={`value-component${index}`} data-grid={{ w: getComponentLayout(component.type).w, h: getComponentLayout(component.type).h, x: component.position.x, y: component.position.y, static: false  }}>
                <ComponentContainer>
                  <ValueChart onRowPress={component.onRowPress} onRowIconPress={component.onRowIconPress} props={{
                    background: component.data.background,
                  }} setIsStatic={onChangeStatic}/>
                </ComponentContainer> 
            </div>); 
            break;
          case `pie`:
            result.push(
              <div onMouseLeave={()=>setLastCardKey(`component${index}`)} className="grid-box" key={`pie-component${index}`} data-grid={{ w: getComponentLayout(component.type).w, h: getComponentLayout(component.type).h, x: component.position.x, y: component.position.y, static: false }}>
                <ComponentContainer>
                  <PieChart onRowPress={component.onRowPress} onRowIconPress={component.onRowIconPress} setIsStatic={onChangeStatic}/>
                </ComponentContainer> 
            </div>); 
            break;
          case `dough`:
            result.push(
              <div onMouseLeave={()=>setLastCardKey(`component${index}`)} className="grid-box" key={`dough-component${index}`} data-grid={{ w: getComponentLayout(component.type).w, h: getComponentLayout(component.type).h, x: component.position.x, y: component.position.y, static: false }}>
                <ComponentContainer> 
                  <DoughnutChart onRowPress={component.onRowPress} onRowIconPress={component.onRowIconPress} data={component.data} setIsStatic={onChangeStatic}/>  
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
      if(window.innerWidth >= 700)
          return htmlLayout800; 
      if(window.innerWidth >= 600)
        return htmlLayout700;
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
        <HeaderIcon color={`#cecece`} left={'50px'}>
          {`ע ${lastCardPosition.x} ש ${lastCardPosition.y} ${lastCardPosition.type}`}
        </HeaderIcon>
        { 
            layout ? null : <ReactGridLayout
              style={{minWidth:'100%'}}
            {...defaultProps}
            layout={originalLayout}
            onLayoutChange={onLayoutChange} 
          > 
          {getCards()}
          </ReactGridLayout>
        } 
        <AlertDialog  
          title={`Dont try me ✌️`}  
          btnRightTitle={`Sory`} 
          btnRightClick={async()=>{
            store.setAlertDialogOpen(false)
            await removeFromLS()
            setScreenProps(!isSetScreenProps)
          }}  />
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
 