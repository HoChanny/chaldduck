import { useEffect, useRef } from "react";
import { TOSS_CLIENT_KEY } from "../constants";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { TossPendingOrderData } from "./TossPaymentModal";

interface OwnProps {
    show: boolean;
    buyerId: number | null;
    amount: number;
    orderNo: string;
    orderName: string;
    customerName: string;
    customerPhone: string;
    pendingOrderData: TossPendingOrderData;
    onClose: () => void;
    onSuccess: () => void;
    onFail: (message: string) => void;
}

export const TossTest = ({ show, buyerId, amount, orderNo, orderName, customerName, customerPhone, pendingOrderData, onClose, onSuccess, onFail }: OwnProps) => {
    const callbacksRef = useRef({ onClose, onSuccess, onFail });
    callbacksRef.current = { onClose, onSuccess, onFail };
    const hasStartedRef = useRef(false);

    useEffect(() => {
        if (!show) {
            hasStartedRef.current = false;
            return;
        }
        if (hasStartedRef.current) return;
        hasStartedRef.current = true;

        const requestPayment = async () => {
            if (!buyerId) {
                callbacksRef.current.onFail("구매자 정보를 먼저 입력해주세요. 이름과 연락처 입력 후 주문확인을 눌러주세요.");
                callbacksRef.current.onClose();
                return;
            }
            try {
                const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
                const payment = tossPayments.payment({ customerKey: "USER_ID_" + buyerId });

                await payment.requestPayment({
                    method: "CARD",
                    amount: {
                        currency: "KRW",
                        value: amount,
                    },
                    orderId: orderNo,
                    orderName: orderName,
                    successUrl: window.location.origin + "/success",
                    failUrl: window.location.origin + "/fail",
                    //customerEmail: "customer123@gmail.com",
                    customerName: customerName,
                    card: {
                        useEscrow: false,
                        flowMode: "DEFAULT",
                        useCardPoint: false,
                        useAppCardOnly: false,
                    },
                });

                callbacksRef.current.onSuccess();
            } catch (error: any) {
                const message = error?.message ?? "결제 요청 중 오류가 발생했습니다.";
                callbacksRef.current.onFail(message);
            } finally {
                callbacksRef.current.onClose();
            }
        };

        void requestPayment();
    }, [show, amount, orderNo, orderName, customerName, buyerId]);

    return null;
};
