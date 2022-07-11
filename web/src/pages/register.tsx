/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { VStack, Divider, Heading, Center } from "@chakra-ui/react";
import { RegisterForm } from "../components/RegisterForm";
import { Wrapper } from "../components/Wrapper";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
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
                        Register
                    </Heading>
                </Center>
                <Divider />
                <RegisterForm />
            </Wrapper>
        </VStack>
    );
};

export default Register;
