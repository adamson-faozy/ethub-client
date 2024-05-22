import { extendTheme } from "@chakra-ui/react"
import '@fontsource/material-icons';
import '@fontsource-variable/open-sans/wdth-italic.css';


export const theme = extendTheme({
    colors: {
        brand: {
            100: "#FF3c00"
        },
    },
    fonts: {
        body: "Open Sans Variable, Material Icons, sans-serif"
    },
    styles: {
        global: () => ({
            body: {
                bg: "white.200",
            }
        })
    },
    components: {

    }
})