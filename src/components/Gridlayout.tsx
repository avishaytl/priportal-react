import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import styled from "styled-components";

const ReactGridLayout = WidthProvider(RGL);
/**
 * This layout demonstrates how to sync to localstorage.
 */

 const LeftBorderChild = styled.div`  
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
  originalLayout = null;
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
    this.setState({
      layout: []
    });
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
      <div>
        {/* <button onClick={this.resetLayout}>Reset Layout</button> */}
        <ReactGridLayout
            style={{minWidth:'100%'}}
          {...this.props}
          layout={this.originalLayout as any}
          onLayoutChange={this.onLayoutChange}
        >
        <div className="grid-box" key="1" data-grid={{ w: 2, h: 3, x: 8, y: 0,isDraggable: false, static: true  }}>
            <LeftBorderChild><span>1</span></LeftBorderChild> 
        </div>
          <div className="grid-box" key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0  }}>
            <LeftBorderChild><span>2</span></LeftBorderChild> 
          </div>
          <div className="grid-box" key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0  }}>
            <LeftBorderChild><span>3</span></LeftBorderChild> 
          </div>
          <div className="grid-box" key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0}}>
            <LeftBorderChild><span>4</span></LeftBorderChild> 
          </div>
          <div className="grid-box" key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0 }}>
            <LeftBorderChild><span>5</span></LeftBorderChild> 
          </div>
          <div className="grid-box" key="6" data-grid={{ w: 2, h: 3, x: 4, y: 0  }}>
            <LeftBorderChild><span>6</span></LeftBorderChild> 
          </div>
          <div className="grid-box" key="7" data-grid={{ w: 2, h: 3, x: 6, y: 0}}>
            <LeftBorderChild><span>7</span></LeftBorderChild> 
          </div>
          <div className="grid-box" key="8" data-grid={{ w: 2, h: 3, x: 8, y: 0 }}>
            <LeftBorderChild><span>8</span></LeftBorderChild> 
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