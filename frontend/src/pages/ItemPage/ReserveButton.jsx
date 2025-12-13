import { useState } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import  ReservationConfirmationDialog  from "./ReservationConfirmationDialog";


const API_BASE = "http://localhost:8080/api";

export default function ReserveButton(props) {
    const quantity = props.quantity;
    const outOfStock = props.outOfStock;
      
    const [isLoading, setIsLoading] = useState(false);
    const [reserved, setReserved] = useState(false);
    const [reservation, setReservation] = useState(null);
    const [isError, setIsError] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams();
    

    const reservationData = {
        "quantity" : quantity,
        "itemId" : id,
        "type" : "reservation",
        // Hardcoded userId. We don't have login :(
        "userId" : "00000000-0000-0000-0000-000000000001"
    }
    

    const reserve = async () => {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });

        if(!response.ok){
            setIsError(true);
            setIsLoading(false);
            return;
        }
        const data = await response.json();

        setIsLoading(false);
        setReserved(true);
        setReservation(data);
    }


    return (
        <div>
            <Button
                label={reserved ? t("item.reserved") : t("item.reserve")}
                icon={reserved ? "pi pi-check" : ""}
                iconPos="left"
                className="reserve-btn"
                onClick={reserve}
                disabled={reserved || outOfStock}
                loading={isLoading}
            />
            {isError && <p class="error">{t("item.reserveError")}</p>}
            <ReservationConfirmationDialog visible={reserved} setVisible = {setReserved} reservation = {reservation}/>
        </div>
    )
}