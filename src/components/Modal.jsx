import Lottie from "lottie-react";
import animationData from "../success.json";

export function Modal({ currentClaim, selectedQuote, setOverlay }) {
  return (
    <div className="modal-box">
      <p className="modal-title">{currentClaim.description}</p>
      <Lottie
        animationData={animationData}
        loop={false}
        autoplay={true}
        // style={{ width: 400, height: 400 }}
      />
      <h2 className="modal-congrats">"{selectedQuote.quote}"</h2>
      <small>{selectedQuote.author}</small>

      <button className="btn-modal-close" onClick={() => setOverlay(false)}>
        Close
      </button>
    </div>
  );
}
