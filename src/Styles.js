import {createTheme} from '@mui/material/styles'

const Colors={
    primary:"#445763",
    secondary:"#b5cbb780",
    tertiary:"#C4C4C4",
    
}

const theme = createTheme({
    palette : {
        primary: {
            main: Colors.primary},
            secondary: {
                main: Colors.secondary},
            background:{main:Colors.primary}},
    typography: {
        fontFamily: "Roboto Mono"
            }});

export default theme;