import "@/app/components/ui/wabtn.css";
import { FaWhatsapp } from "react-icons/fa";
export default function Wabtn() {
    return (
        <div>
          {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"> */}
<div className="floating_btn">
    <a target="_blank" href="https://api.whatsapp.com/send/?phone=916383070725&text=Hi!+I'm+interested+in+ordering+the+cakes">
      <div className="contact_icon">
        <FaWhatsapp />
      </div>
    </a>
    <p className="text_icon">Talk to us?</p>
  </div>
        </div>
    )
}