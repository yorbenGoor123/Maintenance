import React, { useEffect, useReducer, useState } from "react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import css from "./Register.module.css";
import { useStore } from "@/hooks/useStore";
import { Observer } from "mobx-react-lite";
import axios from "axios";
import { toast } from "react-toastify";

function Register(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [errors, setErrors] = useState({});

    const { userStore } = useStore();

    useEffect(() => {
        userStore.getUsers();
        return () => {
            setData({
                password: "",
                password_confirmation: "",
            });
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        //axios.post('register', {
        //    name: name,
        //    email: email,
        //    password: password,
        //    password_confirmation: password_confirmation
        //}).then((r) => {
        //    toast.success("User succesfully added");
        //    userStore.addUser({
        //        name,
        //        email,
        //        password,
        //        password_confirmation
        //    });
        //    console.log(r);
        //    setEmail("");
        //    setPassword("");
        //    setPassword_confirmation("");
        //    setName("");
        //}).catch((r) => {
        //    console.log();
        //    toast.error("Something went wrong");
        //})

        axios
            .post("/register", {
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation,
            })
            .then((response) => {
                toast.success("User succesfully added");
                userStore.addUser({
                    name,
                    email,
                    password,
                    password_confirmation,
                });
                setEmail("");
                setPassword("");
                setPassword_confirmation("");
                setName("");
            })
            .catch((error) => {
                console.log(error.response);
                setErrors(error.response.data.errors)
                toast.error("Something went wrong");
            });
    };

    return (
        <Observer>
            {() => (
                <Authenticated
                    auth={props.auth}
                    errors={props.errors}
                    header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            User manager
                        </h2>
                    }
                >
                    <div className={css["register__wrapper"]}>
                        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                            <Head title="Register" />

                            <ValidationErrors errors={errors} />

                            <form onSubmit={submit}>
                                <div>
                                    <Label forInput="name" value="Name" />

                                    <Input
                                        type="text"
                                        name="name"
                                        value={name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        handleChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label forInput="email" value="Email" />

                                    <Input
                                        type="email"
                                        name="email"
                                        value={email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        handleChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label
                                        forInput="password"
                                        value="Password"
                                    />

                                    <Input
                                        type="password"
                                        name="password"
                                        value={password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        handleChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label
                                        forInput="password_confirmation"
                                        value="Confirm Password"
                                    />

                                    <Input
                                        type="password"
                                        name="password_confirmation"
                                        value={password_confirmation}
                                        className="mt-1 block w-full"
                                        handleChange={(e) =>
                                            setPassword_confirmation(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-4">
                                        Add new user
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="flex flex-col m-10">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full">
                                        <thead class="bg-white border-b">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    #
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Name
                                                </th>

                                                <th
                                                    scope="col"
                                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Role
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userStore.users?.map(function (
                                                x,
                                                i
                                            ) {
                                                return (
                                                    <tr className="bg-white border-b">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {i + 1}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {x.email}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {x.name}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            Admin
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Authenticated>
            )}
        </Observer>
    );
}

export default Register;
