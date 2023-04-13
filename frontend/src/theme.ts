import { deepFreeze } from "grommet/utils"

export const theme = deepFreeze({
    "global": {
        "font": {
            "family": "Roboto",
            "size": "18px",
            "height": "20px",
        },
        
        "input": {
            "weight": 300
        },
        "colors": {
            "active": {
                "0": "r",
                "1": "g",
                "2": "b",
                "3": "a",
                "4": "(",
                "5": "2",
                "6": "2",
                "7": "1",
                "8": ",",
                "9": "2",
                "10": "2",
                "11": "1",
                "12": ",",
                "13": "2",
                "14": "2",
                "15": "1",
                "16": ",",
                "17": "0",
                "18": ".",
                "19": "5",
                "20": ")",
                "light": "#E95D22",
                "dark": "#ff4081"
            },
            "brand": "#AFAFAF",
            "control": {
                "dark": "#ffffff",
                "light": "#AFAFAF"
            },
            "focus": "#2AD2C9",
            "accent-1": "#2AD2C9",
            "accent-2": "#FFC107",
            "accent-3": "#9C27B0",
            "accent-4": "#673AB7",
            "neutral-1": "#795548",
            "neutral-2": "rgba(0, 0, 0, .1)",
            "neutral-3": "#8BC34A",
            "neutral-4": "#CDDC39",
            "status-critical": "#FF4081",
            "status-error": "#F44336",
            "status-warning": "#FFEB3B",
            "status-ok": "#4CAF50",
            "status-unknown": "#9E9E9E",
            "status-disabled": "#9E9E9E"
        },
        "drop": {
            "background": "#f8f8f8"
        },
        "focus": {
            "border": {
                "color": "#E95D22"
            }
        },
        "hover": {
            "background": {
                "dark": "#ff4081",
                "light": "rgba(245,0,0,0.77)"
            },
            "color": {
                "dark": "#ff4081",
                "light": "#E95D22"
            }
        },
        "control": {
            "border": {
                "color": "#AFAFAF",
                "radius": "30px"
            }
        }
    },
    "anchor": {
        "color": {
            "dark": "#7986cb",
            "light": "brand"
        }
    },
    "button": {
        "border": {
            "width": "1px"
        },
        "height": "30px",
    },
})

export const greyButtonStyle = {
    borderRadius: "20px",
    borderColor: "#AFAFAF",
    backgroundColor: "white",
    color: "#AFAFAF",
};

export const orangeButtonStyle = {
    borderRadius: "20px",
    borderColor: "#E95D22",
    backgroundColor: "white",
    color: "#E95D22",
};

export const orangeFillButtonStyle = {
    borderRadius: "40px",
    borderColor: "#E95D22",
    backgroundColor: "#E95D22",
    color: "#FFFFFF",
};

// export const mainBox = {
//     width: "650px",
//     margin: "3.5% auto",
//     minHeight: "94vh",

// }
