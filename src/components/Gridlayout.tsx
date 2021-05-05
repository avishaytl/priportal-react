import React, { useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import DoughnutChart from './DoughnutChart'

const ReactGridLayout = WidthProvider(RGL);
/**
 * This layout demonstrates how to sync to localstorage.
 */

 const ValueComponent = styled.div`  
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start;
    background: white; 
    border-radius: 10px;
    transition: box-shadow ease 0.5s;
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
  color: #2c324d;
  font-weight: 500;
  transition: font-size ease .15s;
  :hover{
    font-size: 14px;
  }
`
// const ValueChartField = (props: any) =>{
//   const [isStatic,setIsStatic] = useState(false);
//   return(
//     <div className="grid-box" key="7" data-grid={{ w: 4, h: 7, x: 10, y: 2, static: true}}>
//       <ValueComponent>
//         <span>
//           <DoughnutChart setIsStatic={setIsStatic} isStatic={isStatic}/> 
//         </span>
//       </ValueComponent> 
//     </div> )
// }
export default function LocalStorageLayout(props: any){
    const [isStatic,setIsStatic] = useState(false);
    const [originalLayout,setOriginalLayout] = useState(getFromLS("layout") || []); 
    const [layout,setLayout] = useState(false);  
    const getWindowSize = () =>{
      if(window.innerWidth >= 1500)
        return 16;
      if(window.innerWidth >= 1400)
        return 14;
      if(window.innerWidth >= 1300)
        return 12;
      if(window.innerWidth >= 1200)
        return 11;
      if(window.innerWidth >= 900)
        return 9; 
      if(window.innerWidth <= 899)
        return 7;  
    }
    const defaultProps: any = {
      className: "layout",
      cols: getWindowSize(),
      rowHeight: 30,
      onLayoutChange: function(layout: any) {}, 
    }
    function resetLayout() {
      // this.setState({
      //   layout: []
      // });
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
      originalLayout.map((card: any)=>{
        card['static'] = true;
      })  
      saveToLS("layout", originalLayout);   
      setOriginalLayout(originalLayout)
      console.debug('save',originalLayout)   
      // defaultProps.onLayoutChange(layout); // updates status display 
    }
    function removeFromLS(key?: any){ 
      removeFromLSO(key)
      setOriginalLayout([]); 
      saveToLS("layout", originalLayout);
    }
    function onLayoutChange(layout: any) {
      /*eslint no-console: 0*/ 
      saveToLS("layout", layout);
      setOriginalLayout(layout) 
      // defaultProps.onLayoutChange(layout); // updates status display 
    }
    return (
      <div style={{overflow:'hidden'}}> 
        <HeaderIcon left={'20px'} onClick={removeFromLS}>
          {`איפוס`}
        </HeaderIcon>
        <HeaderIcon left={'30px'} onClick={saveOnLS}>
          {`שמירה`}
        </HeaderIcon> 
        {layout ? null : <ReactGridLayout
            style={{minWidth:'100%'}}
          {...defaultProps}
          layout={originalLayout}
          onLayoutChange={onLayoutChange}
        >
        <div className="grid-box" key="table-component1" data-grid={{ w: 4, h: 10, x: 1, y: 0, static: isStatic }}>
            <ValueComponent><span>1</span></ValueComponent> 
        </div>
          <div className="grid-box" key="graph-component1" data-grid={{ w: 3, h: 10, x: 5, y: 0, static: isStatic  }}>
            <ValueComponent><span>2</span></ValueComponent> 
          </div>
          <div className="grid-box" key="value-component1" data-grid={{ w: 2, h: 3, x: 8, y: 0, static: isStatic  }}>
            <ValueComponent><span>3</span></ValueComponent> 
          </div>
          <div className="grid-box" key="value-component2" data-grid={{ w: 2, h: 3, x: 10, y: 0, static: isStatic}}>
            <ValueComponent><span>4</span></ValueComponent> 
          </div>
          <div className="grid-box" key="value-component3" data-grid={{ w: 2, h: 3, x: 12, y: 0, static: isStatic }}>
            <ValueComponent><span>5</span></ValueComponent> 
          </div>
          <div className="grid-box" key="9" data-grid={{ w: 2, h: 7, x: 8, y: 2, static: isStatic  }}>
            <ValueComponent>
              {/* <span> */}
              {/* </span> */}
            </ValueComponent> 
          </div>
          <div className="grid-box" key="10" data-grid={{ w: 1, h: 7, x: 10, y: 2, static: isStatic  }}>
            <ValueComponent>
              {/* <span> */}
              {/* </span> */}
            </ValueComponent> 
          </div>
          <div className="grid-box" key="11" data-grid={{ w: 3, h: 7, x: 11, y: 2, static: isStatic}}>
            <ValueComponent>
              <span>
                <DoughnutChart setIsStatic={onChangeStatic}/> 
              </span>
            </ValueComponent> 
          </div> 
        </ReactGridLayout>}
      </div>
    );
}
// export default class LocalStorageLayout extends React.PureComponent <any|{layout: any}>{
//   static defaultProps = {
//     className: "layout",
//     cols: 16,
//     rowHeight: 30,
//     onLayoutChange: function() {}
//   }; 
//   originalLayout: null | [] = null;
//   constructor(props: any) {
//     super(props);
//     this.originalLayout = getFromLS("layout") || [];
//     this.state = {
//       layout: JSON.parse(JSON.stringify(this.originalLayout))
//     };

//     this.onLayoutChange = this.onLayoutChange.bind(this);
//     this.resetLayout = this.resetLayout.bind(this);
//   }
//   componentDidMount(){ 
//     this.originalLayout = getFromLS("layout") || [];
//   }

//   resetLayout() {
//     // this.setState({
//     //   layout: []
//     // });
//     this.originalLayout = [];
//   }

//   onLayoutChange(layout: any) {
//     /*eslint no-console: 0*/
//     saveToLS("layout", layout);
//     this.setState({ layout });
//     this.props.onLayoutChange(layout); // updates status display
//     console.debug('layout',layout)
//   }

//   render() {
//     return (
//       <div style={{overflow:'hidden'}}>
//         <button style={{marginLeft:40}} onClick={removeFromLS}>Reset Layout</button>
//         <ReactGridLayout
//             style={{minWidth:'100%'}}
//           {...this.props}
//           layout={this.originalLayout as any}
//           onLayoutChange={this.onLayoutChange}
//         >
//         <div className="grid-box" key="table-component1" data-grid={{ w: 4, h: 10, x: 1, y: 0, static: true }}>
//             <ValueComponent><span>1</span></ValueComponent> 
//         </div>
//           <div className="grid-box" key="graph-component1" data-grid={{ w: 3, h: 10, x: 5, y: 0  }}>
//             <ValueComponent><span>2</span></ValueComponent> 
//           </div>
//           <div className="grid-box" key="value-component1" data-grid={{ w: 2, h: 3, x: 8, y: 0  }}>
//             <ValueComponent><span>3</span></ValueComponent> 
//           </div>
//           <div className="grid-box" key="value-component2" data-grid={{ w: 2, h: 3, x: 10, y: 0}}>
//             <ValueComponent><span>4</span></ValueComponent> 
//           </div>
//           <div className="grid-box" key="value-component3" data-grid={{ w: 2, h: 3, x: 12, y: 0 }}>
//             <ValueComponent><span>5</span></ValueComponent> 
//           </div>
//           <div className="grid-box" key="t" data-grid={{ w: 2, h: 7, x: 8, y: 2  }}>
//             <ValueComponent>
//               {/* <span> */}
//               {/* </span> */}
//             </ValueComponent> 
//           </div>
//           <div className="grid-box" key="7" data-grid={{ w: 4, h: 7, x: 10, y: 2, static: true}}>
//             <ValueComponent>
//               <span>
//                 <DoughnutChart setIsStatic={setIsStatic} isStatic={isStatic}/> 
//               </span>
//             </ValueComponent> 
//           </div> 
//         </ReactGridLayout>
//       </div>
//     );
//   }
// }

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