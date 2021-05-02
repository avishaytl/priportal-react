import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import styled from "styled-components";

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
    -webkit-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15);
    box-shadow: 0px 0px 11px 2px rgba(0,0,0,0.15); 
`
export default class LocalStorageLayout extends React.PureComponent <any|{layout: any}>{
  static defaultProps = {
    className: "layout",
    cols: 16,
    rowHeight: 30,
    onLayoutChange: function() {}
  }; 
  originalLayout: null | [] = null;
  constructor(props: any) {
    super(props);
    this.originalLayout = getFromLS("layout") || [];
    this.state = {
      layout: JSON.parse(JSON.stringify(this.originalLayout))
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }
  componentDidMount(){ 
    this.originalLayout = getFromLS("layout") || [];
  }

  resetLayout() {
    // this.setState({
    //   layout: []
    // });
    this.originalLayout = [];
  }

  onLayoutChange(layout: any) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
    console.debug('layout',layout)
  }

  render() {
    return (
      <div style={{overflow:'hidden'}}>
        <button style={{marginLeft:40}} onClick={removeFromLS}>Reset Layout</button>
        <ReactGridLayout
            style={{minWidth:'100%'}}
          {...this.props}
          layout={this.originalLayout as any}
          onLayoutChange={this.onLayoutChange}
        >
        <div className="grid-box" key="1" data-grid={{ w: 4, h: 10, x: 1, y: 0, static: true  }}>
            <ValueComponent><span>1</span></ValueComponent> 
        </div>
          <div className="grid-box" key="2" data-grid={{ w: 3, h: 10, x: 5, y: 0  }}>
            <ValueComponent><span>2</span></ValueComponent> 
          </div>
          <div className="grid-box" key="3" data-grid={{ w: 2, h: 3, x: 8, y: 0  }}>
            <ValueComponent><span>3</span></ValueComponent> 
          </div>
          <div className="grid-box" key="4" data-grid={{ w: 2, h: 3, x: 10, y: 0}}>
            <ValueComponent><span>4</span></ValueComponent> 
          </div>
          <div className="grid-box" key="5" data-grid={{ w: 2, h: 3, x: 12, y: 0 }}>
            <ValueComponent><span>5</span></ValueComponent> 
          </div>
          <div className="grid-box" key="6" data-grid={{ w: 2, h: 7, x: 8, y: 2  }}>
            <ValueComponent><span>6</span></ValueComponent> 
          </div>
          <div className="grid-box" key="7" data-grid={{ w: 4, h: 7, x: 10, y: 2}}>
            <ValueComponent><span>7</span></ValueComponent> 
          </div> 
        </ReactGridLayout>
      </div>
    );
  }
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

function removeFromLS(key: any) { 
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