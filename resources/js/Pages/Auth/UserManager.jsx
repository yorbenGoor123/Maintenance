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
import { Roles } from "@/enums";

function Register(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [errors, setErrors] = useState({});
    const [role, setRole] = useState("");

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
        axios
            .post("/register", {
                name,
                email,
                password,
                password_confirmation,
                role,
                authRole: props.auth.user.role
            })
            .then((response) => {
                toast.success("User succesfully added");
                userStore.addUser({
                    name,
                    email,
                    password,
                    password_confirmation,
                    role,
                });
                setEmail("");
                setPassword("");
                setPassword_confirmation("");
                setName("");
                setErrors({});
            })
            .catch((error) => {
                setErrors(error.response.data.errors);
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

                                <div className="mt-4">
                                    <Label
                                        forInput="password_confirmation"
                                        value="Role"
                                    />
                                    <select
                                        id="role"
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option selected value="user">
                                            Choose a role
                                        </option>
                                        <option value={Roles.User}>
                                            {Roles.User}
                                        </option>
                                        <option value={Roles.User}>
                                            {Roles.Admin}
                                        </option>
                                    </select>
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
                                                <th
                                                    scope="col"
                                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Email verified
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
                                                            {x.role}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {x.email_verified_at !==
                                                            null && typeof(x.email_verified_at) === "string" ? (
                                                                <svg
                                                                    class="h-5 w-5 text-green-500"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    stroke-width="2"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                >
                                                                    {" "}
                                                                    <path
                                                                        stroke="none"
                                                                        d="M0 0h24v24H0z"
                                                                    />{" "}
                                                                    <path d="M5 12l5 5l10 -10" />
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    class="h-5 w-5 text-red-500"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    stroke-width="2"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                >
                                                                    {" "}
                                                                    <path
                                                                        stroke="none"
                                                                        d="M0 0h24v24H0z"
                                                                    />{" "}
                                                                    <line
                                                                        x1="18"
                                                                        y1="6"
                                                                        x2="6"
                                                                        y2="18"
                                                                    />{" "}
                                                                    <line
                                                                        x1="6"
                                                                        y1="6"
                                                                        x2="18"
                                                                        y2="18"
                                                                    />
                                                                </svg>
                                                            )}
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
