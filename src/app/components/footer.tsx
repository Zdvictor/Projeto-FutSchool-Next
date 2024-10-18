import { CiInstagram } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";



import "./footer.css"


const Footer: React.FC = () => {

    return (

        <footer>

            <h2>TODOS OS DIREITOS RESERVADOS @FUTSCHOOL 2024</h2>

            <i>
                
                <FaWhatsapp />
                <CiInstagram />
                <CiFacebook />


            </i>

        </footer>

    )

}


export default Footer