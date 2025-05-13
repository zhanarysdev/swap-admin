import { Button, ButtonBG } from "@/components/button/button";
import { format } from "@react-input/mask";
import { Icon } from "@/components/icons";
import { Input } from "@/components/input/input";
import { InputPhone } from "@/components/input/input-phone";
import { Select } from "@/components/select/select";
import { Spinner } from "@/components/spinner/spinner";
import { post } from "@/fetcher";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const schema = yup.object({
    name: yup.string().required("Название компании обязательно").min(2, "Минимум 2 символа"),
    bin: yup.string()
        .required("БИН обязателен")
        .matches(/^\d{12}$/, "БИН должен содержать 12 цифр"),
    displayNumber: yup.string()
        .required("Номер телефона обязателен"),
    cityID: yup.string().required("Город обязателен"),
    address: yup.string().required("Юридический адрес обязателен"),
    categories: yup.array().of(yup.string()).min(1, "Выберите хотя бы одну категорию").required("Категория бизнеса обязательна"),
    instagram: yup.string()
        .required("Instagram обязателен")
        .matches(/^@[\w\d._]+$/, "Неверный формат Instagram (например: @username)"),
    branches: yup.array().of(yup.string()).default([]),
    numberVerificationToken: yup.string().required(),
    password: yup.string().required("Пароль обязателен")
}).required();

type FormData = yup.InferType<typeof schema>;

export function Form({ setPageState, verificationToken, password }: {
    setPageState: (pageState: "registration" | "verification" | "password" | "form") => void,
    verificationToken: string,
    password: string
}) {
    const router = useRouter();
    const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            numberVerificationToken: verificationToken,
            password: password,
            branches: ["test"]
        }
    });

    const submit = async (data: FormData) => {
        try {
            const response = await post({
                url: "business/v1/signup",
                data: {
                    ...data,
                    // Ensure categories is an array even if single value is selected
                    categories: Array.isArray(data.categories) ? data.categories : [data.categories],
                },
                custom: true
            });

            if (response.token) {
                // Redirect to dashboard or login page after successful signup
                localStorage?.setItem("token", response.token);
                document.cookie = `token=${response.token}; path=/; max-age=2592000; SameSite=Strict`;
                router.push('/ads');
            } else {
                // Handle error response
                console.error('Signup failed:', response);
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    }

    const { data: categoriesData, isLoading } = useSWR({
        url: "v1/business/category/list",
        data: {
            "search": "",
            "sort_by": "",
            "sort_dir": ""
        },
        custom: true
    }, post)

    const cities = useSWR({
        url: "city/count",
        data: {
            "search": "",
            "sort_by": "",
            "sort_dir": ""
        },
    }, post)

    if (isLoading || cities.isLoading) {
        return <Spinner />
    }

    return <div>
        <div className="flex items-center cursor-pointer" onClick={() => setPageState("verification")}>
            <Icon name="DropArrow" className="rotate-90" />
            <span>Назад</span>
        </div>
        <div className="text-white text-[24px] font-[800]">Регистрация</div>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 mt-8 w-[477px]">
            <div>
                <Input
                    placeholder="Название компании"
                    {...register("name")}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
                <Input
                    placeholder="БИН"
                    {...register("bin")}
                />
                {errors.bin && <span className="text-red-500 text-sm">{errors.bin.message}</span>}
            </div>

            <div>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => {
                        const cleaned = String(value).replace(/\D/g, "");
                        const formatted = format(cleaned, {
                            mask: "+_ (___) ___-___-__",
                            replacement: { _: /\d/ },
                        });
                        return (
                            <InputPhone

                                placeholder="+7 Номер телефона отображаемый в приложении"
                                value={formatted}
                                onChange={onChange}
                            />
                        );
                    }}
                    name="displayNumber"
                />
                {errors.displayNumber && <span className="text-red-500 text-sm">{errors.displayNumber.message}</span>}
            </div>

            <div>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            data={value}
                            placeholder="Город"
                            options={cities.data.result.map((item: any) => ({ label: item.name, value: item.id }))}
                            onChange={(val) => onChange(val)}
                        />
                    )}
                    name="cityID"
                />
                {errors.cityID && <span className="text-red-500 text-sm">{errors.cityID.message}</span>}
            </div>

            <div>
                <Input
                    placeholder="Юредический адрес"
                    {...register("address")}
                />
                {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
            </div>

            <div>
                <Controller
                    name="categories"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            data={Array.isArray(value) ? value[0] : value}
                            placeholder="Категория бизнеса"
                            options={categoriesData.result.map((item: any) => ({ label: item.name, value: item.id }))}
                            onChange={(val) => onChange([val])}
                        />
                    )}
                />
                {errors.categories && <span className="text-red-500 text-sm">{errors.categories.message}</span>}
            </div>

            <div>
                <Input
                    placeholder="Instgram Компании (@username)"
                    {...register("instagram")}
                />
                {errors.instagram && <span className="text-red-500 text-sm">{errors.instagram.message}</span>}
            </div>

            <Button bg={ButtonBG.primary} label="Готово" type="submit" />
        </form>
    </div>
}
