import React from "react";
import { Box } from "@chakra-ui/react";

interface WrapperProps {
    variant?: "sm" | "md";
    children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({
    variant = "md",
    children,
}) => {
    return (
        <Box
            mt={8}
            mx='auto'
            maxW={variant === "md" ? "800px" : "400px"}
            w='100%'
            background={"gray.100"}
            rounded={"md"}
        >
            {children}
        </Box>
    );
};
