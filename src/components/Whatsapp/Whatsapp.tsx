import Iconify from "../Iconify/Iconify";
import MuiFab from "./styles";

const WhatsappFab = () => {

    const sendWhatsAppMessage = () => {
        const mobileNumber = '955047323'
        const message = 'Hola tengo una consulta sobre la plataforma Vende tu iPhone'

        // Regex expression to remove all characters which are NOT alphanumeric 
        let number = mobileNumber.replace(/[^\w\s]/gi, "").replace(/ /g, "");

        // Appending the phone number to the URL
        let url = `https://api.whatsapp.com/send?phone=${number}`;

        // Appending the message to the URL by encoding it
        url += `&text=${encodeURI(message)}&app_absent=0`;

        // Open our newly created URL in a new tab to send the message
        window.open(url);

    };

    return (
        <MuiFab color="primary" aria-label="add" onClick={sendWhatsAppMessage}>
            <Iconify icon="ic:baseline-whatsapp" />
        </MuiFab>
    )
}

export default WhatsappFab