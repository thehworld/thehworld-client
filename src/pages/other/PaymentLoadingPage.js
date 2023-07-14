import { useState } from "react";





const PaymentLoadingPage = () => {

    const [loading, setloading] = useState(true);

    const checkPaymentStatus = () => {

    }




    return(
        <div>
            <h2>
                Payment Success!!
            </h2>

            <button>
                To Order
            </button>
        </div>
    )
}


export default PaymentLoadingPage;