import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SECRET_KEY } from "../constants";
import urlAxios from "../utils/urlAxios";

export const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = Number(searchParams.get("amount") ?? "0");
    const body = {
        paymentKey,
        orderId,
        amount,
    };
    const encoded = btoa(SECRET_KEY + ":");
    const authHeader = `Basic ${encoded}`;

    // 서버에 전송할 부분 채워서 쓸 것.
    // const submitPaymentSucccess = async () => {
    //     try{
    //         const res = await urlAxios.post(`/payments/`)
    //     }
    // }
    useEffect(() => {
        if (!paymentKey || !orderId || amount <= 0) {
            return;
        }

        const handlePaymentSuccess = async () => {
            try {
                const res = await axios.post(`https://api.tosspayments.com/v1/payments/confirm`, body, {
                    headers: {
                        Authorization: authHeader,
                    },
                });
                console.log(res.data);
                alert("결제 완료되었습니다.");
                navigate("/");
            } catch (error) {
                // const confirmed = confirm("Payment success error:" + error);
                // if (confirmed) {
                //     navigate("/");
                // }
                console.log("Payment success error:" + error);
            }
        };
        handlePaymentSuccess();
    }, [paymentKey, orderId, amount]);

    return <div>결제 완료중..</div>;
};
