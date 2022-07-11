/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    ButtonGroup,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import router from "next/router";
import { useLoginMutation } from "../generated/graphql";

interface LoginFormProps {}

type FormData = {
    email: string;
    password: string;
};

const schema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email")
        .max(200, "Email is too long"),
    password: z
        .string({ required_error: "Password is required" })
        .min(3, "Password is too short")
        .max(200, "Password is too long"),
});

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
    const [, login] = useLoginMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const onSubmit = handleSubmit(async (data: FormData) => {
        const response = await login({ ...data });
        const hasErrors = response.data?.login?.error;
        if (hasErrors) {
            const message = response.data?.login?.message;
            alert(message);
        } else {
            reset();
        }
    });

    return (
        <form onSubmit={onSubmit}>
            <VStack h='100%' w='100%' p={4} spacing={4}>
                {/* Input fields */}
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input
                        id='email'
                        placeholder='Email'
                        type='email'
                        {...register("email")}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input
                        id='password'
                        placeholder='Password'
                        type='password'
                        {...register("password")}
                    />
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>
                {/* Login/Register buttons */}
                <VStack w='100%'>
                    <ButtonGroup w='100%' justifyContent='center' pt={6}>
                        <Button
                            w='50%'
                            color='pink.400'
                            borderColor='pink.400'
                            variant='outline'
                            onClick={() => router.push("/register")}
                        >
                            Register
                        </Button>
                        <Button
                            w='50%'
                            variant='solid'
                            type='submit'
                            bg='pink.400'
                            color='white'
                        >
                            Log In
                        </Button>
                    </ButtonGroup>
                    <Button pt={4} variant='link' color='pink.400'>
                        Forgot your password?
                    </Button>
                </VStack>
            </VStack>
        </form>
    );
};
