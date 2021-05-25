 import React from "react"; 
function MemoComponent({child}:any) { 
    return (
        child
    );
}
export default React.memo(MemoComponent);