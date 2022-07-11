import React from "react";
import { VStack, Divider, Heading, Center } from "@chakra-ui/react";
import { LoginForm } from "../components/LoginForm";
import { Wrapper } from "../components/Wrapper";

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
    return (
        <VStack
            h='100vh'
            w='100vw'
            justifyContent='center'
            alignItems='center'
            bg='brand.background'
        >
            <Wrapper variant='sm'>
                <Center w='100%'>
                    <Heading p={4} size='lg'>
                        Log In
                    </Heading>
                </Center>
                <Divider />
                <LoginForm />
            </Wrapper>
        </VStack>
    );
};

export default login;
