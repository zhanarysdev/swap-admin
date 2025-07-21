import { Input } from "@/components/input/input";
import { Label } from "@/components/input/label";
import { useState } from "react";

export const StepEight = ({ form }) => {
    const [cardNumberDisplay, setCardNumberDisplay] = useState("");

    const formatCardNumber = (value: string) => {
        // Remove all non-digits
        const digitsOnly = value.replace(/\D/g, '');

        // Add spaces after every 4 digits
        const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');

        return formatted;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const formatted = formatCardNumber(input);

        // Update display value
        setCardNumberDisplay(formatted);

        // Store only digits in form
        const digitsOnly = input.replace(/\D/g, '');
        form.setValue("card_number", digitsOnly);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-full">
                <Label label="Номер карты" />
                <Input
                    value={cardNumberDisplay}
                    onChange={handleCardNumberChange}
                    placeholder="4000 0000 1111 1118"
                    maxLength={19} // 16 digits + 3 spaces
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Label label="Владелец карты" />
                <Input
                    {...form.register("card_holder")}
                    placeholder="TEST CARDHOLDER"
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Label label="CVC" />
                <Input
                    {...form.register("cvc")}
                    placeholder="123"
                    maxLength={3}
                />
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <Label label="Месяц" />
                    <Input
                        {...form.register("expiry_month")}
                        placeholder="12"
                        maxLength={2}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label label="Год" />
                    <Input
                        {...form.register("expiry_year")}
                        placeholder="2030"
                        maxLength={4}
                    />
                </div>
            </div>
        </div>
    );
}; 