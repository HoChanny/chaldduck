import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/success" element={<PaymentSuccessPage />} />
            </Routes>
        </>
    );
};

export default App;
