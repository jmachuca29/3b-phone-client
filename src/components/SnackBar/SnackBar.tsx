import { Alert, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"
import useAppStore from "src/store/store"

const SnackBar = () => {
  const [snackPack, setFn] = useAppStore(state => [state.snackPack, state.setFn])
  const [open, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState<any>(null)

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] })
      setFn.removeSnackbar()
      setOpen(true)
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false)
    }
  }, [snackPack, messageInfo, open])

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(null)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
    >
      <Alert
        variant='filled'
        onClose={handleClose}
        severity={messageInfo?.type}
        sx={{ width: '100%' }}
      >
        {messageInfo ? messageInfo.message : undefined}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar