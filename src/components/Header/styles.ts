import styled from "@emotion/styled"
import { AppBar, Stack, Toolbar } from "@mui/material"

const MuiAppBar = styled(AppBar)`
    position: fixed;
    top: 0px;
    left: auto;
    right: 0px;
    height: 80px;
    z-index: 1101;
    backdrop-filter: blur(6px);
    background-color: rgba(255, 255, 255, 0.8);
`

const MuiToolBar = styled(Toolbar)`
    padding-left: 40px;
    padding-right: 40px;
`

const MuiStack = styled(Stack)`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
    justify-content: flex-end;
`

export {
    MuiAppBar,
    MuiToolBar,
    MuiStack
} 