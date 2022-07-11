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
import { useRegisterMutation } from "../generated/graphql";

type FormData = {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
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
    firstName: z
        .string({ required_error: "First name is required" })
        .min(1, "First name is required")
        .max(200, "First name is too long"),
    lastName: z.string().optional(),
});

interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
    const [, registerUser] = useRegisterMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const onSubmit = handleSubmit(async (data: FormData) => {
        const response = await registerUser({
            options: { ...data },
        });
        const hasErrors = response.data?.register?.error;
        if (hasErrors) {
            // has errors
            alert(response.data?.register?.message);
        } else {
            // everything is ok -- reset the form
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
                <FormControl isInvalid={!!errors.firstName}>
                    <FormLabel htmlFor='firstName'>First Name</FormLabel>
                    <Input
                        id='firstName'
                        placeholder='First Name'
                        {...register("firstName")}
                    />
                    <FormErrorMessage>
                        {errors.firstName && errors.firstName.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.lastName}>
                    <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                    <Input
                        id='lastName'
                        placeholder='Last Name'
                        {...register("lastName")}
                    />
                    <FormErrorMessage>
                        {errors.lastName && errors.lastName.message}
                    </FormErrorMessage>
                </FormControl>
                {/* Login/Register buttons */}
                <ButtonGroup w='100%' justifyContent='center' pt={6}>
                    <Button
                        w='50%'
                        color='pink.400'
                        borderColor='pink.400'
                        variant='outline'
                        onClick={() => router.push("/login")}
                    >
                        Log in
                    </Button>
                    <Button
                        w='50%'
                        variant='solid'
                        type='submit'
                        bg='pink.400'
                        color='white'
                    >
                        Register
                    </Button>
                </ButtonGroup>
            </VStack>
        </form>
    );
};
