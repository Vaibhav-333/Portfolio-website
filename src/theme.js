export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#BB86FC" },
        secondary: { main: "#03DAC6" },
        background: { default: "#121212", paper: "#1E1E1E" },
        text: { primary: "#FFFFFF", secondary: "#B0B0B0" }
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
        h1: { fontWeight: 700, color: "#BB86FC" },
        body1: { fontSize: "1.1rem", color: "#FFFFFF" }
    }
});