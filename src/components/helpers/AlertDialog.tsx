import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStore } from '../../uistore/storeui';
import { Observer } from 'mobx-react-lite';

export default function AlertDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const { title, text, btnRightTitle, btnLeftTitle, btnRightClick, btnLeftClick} = props;
  const store = useStore();  
  useEffect(()=>{
    if(store.isAlertDialogOpen)
      handleClickOpen()
    else
      handleClose()
  },[store.isAlertDialogOpen])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Observer> 
          {()=> <div>
                  <Dialog
                    open={store.isAlertDialogOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                      {text && <DialogContentText id="alert-dialog-description">
                        {text}
                      </DialogContentText>}
                    </DialogContent>
                    <DialogActions>
                      {btnLeftTitle && btnLeftClick && <Button onClick={()=>btnLeftClick()} color="primary" autoFocus>
                        {btnLeftTitle}
                      </Button>}
                      {btnRightTitle && btnRightClick && <Button onClick={()=>btnRightClick()} color="primary">
                        {btnRightTitle}
                      </Button>}
                    </DialogActions>
                  </Dialog>
                </div>
          }
    </Observer>
  );
}
