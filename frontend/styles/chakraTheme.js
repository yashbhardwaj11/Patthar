import { extendTheme } from "@chakra-ui/react";

const chakraTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        backgroundColor: "#0f0f0f", // Set your desired background color here
        color: "lightgray",
      },
    }),
  },
});

export default chakraTheme;
