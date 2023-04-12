import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Emaiil введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль доллжен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль доллжен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль доллжен содержать минимум 8 знаков",
                value: 8
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(
            `email: ${data.email} password: ${data.password} Отправлено!`
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Электронная почта"
                            value={data.email}
                            onChange={handleChange}
                            name="email"
                            error={errors.email}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                            name="password"
                            error={errors.password}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
