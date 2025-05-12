'use client'
import { post } from "@/fetcher";
import { useState } from "react";
import { Registration } from "./components/registration";
import { Password } from "./components/password";
import { Verification } from "./components/verification";
import { useRouter } from "next/navigation";
import { Form } from "./components/form";
export default function Signup() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState("");
    const [policyError, setPolicyError] = useState(false);
    const [pageState, setPageState] = useState<"registration" | "verification" | "password" | "form">("form");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const submitVerification = async () => {
        const res = await post({ url: "business/v1/number/verification", data: { phone_number: phone, code: code }, custom: true })
        if(res.statusCode === 200) {
            setPageState("form");
        }
    }

    const submitPassword = async () => {
        setPageState("verification");
    }

    const submit = async () => {
        console.log(phone.length)
        if (phone.length !== 18) {
            return setError("Введите корректный номер телефона");
        } else {
            setError("");
        }
        if (!checked) {
            setPolicyError(true);
            return;
        } else {
            setPolicyError(false);
        }
        const res = await post({ url: "business/v1/number/identification", data: { number: phone }, custom: true })

        if(res.statusCode === 200) {
            setPageState("password");
        }
    }

    if(pageState === "password") {
        return <Password submit={submitPassword} password={password} setPassword={setPassword} setPageState={setPageState} />
    }

    if(pageState === "verification") {
        return <Verification code={code} setCode={setCode} submit={submitVerification} setPageState={setPageState} />
    }

    if(pageState === "form") {
        return <Form setPageState={setPageState} />
    }


    return (  
        <Registration phone={phone} setPhone={setPhone} checked={checked} setChecked={setChecked} error={error} policyError={policyError} submit={submit} />
      );
}
