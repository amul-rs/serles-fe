import { FaFlask, FaStar, FaCheckSquare, FaSmile } from "react-icons/fa";

// Static JSON data for milestones
const milestonesData = [
  {
    icon: <FaFlask size={32} color="#fff" />,
    label: "QUALITY INGREDIENTS",
    value: "100%",
  },
  {
    icon: <FaStar size={32} color="#fff" />,
    label: "YEARS OF EXPERIENCE",
    value: "5+",
  },
  {
    icon: <FaCheckSquare size={32} color="#fff" />,
    label: "CAKES DELIVERED",
    value: "500+",
  },
  {
    icon: <FaSmile size={32} color="#fff" />,
    label: "HAPPY CLIENTS",
    value: "400+",
  },
];

// Reusable MilestoneItem component
function MilestoneItem({ icon, label, value }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center px-2 px-md-4">
      <div
        style={{
          background: "#ff91a4",
          padding: "12px",
          borderRadius: "6px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          color: "#fff",
          fontWeight: 600,
          fontSize: "0.85rem",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "4px",
          textAlign: "center",
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: "#fff",
          fontWeight: 800,
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        {value}
      </div>
    </div>
  );
}

// MilestoneBar component
export default function MilestoneBar({ data = milestonesData }) {
  return (
    <section
      style={{
        background: "#231f20",
        padding: "36px 0 24px 0",
        borderBottom: "4px solid #fff",
      }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {data.map((item, idx) => (
            <div
              className="col-6 col-md-3 mb-4 mb-md-0 d-flex justify-content-center"
              key={idx}
            >
              <MilestoneItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
