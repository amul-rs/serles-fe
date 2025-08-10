import Link from "next/link";

export default function Breadcrumb({ title, items = [] }) {
  return (
    <div className="breadcrumb-option">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="breadcrumb__text ">
              <h2 className="text-uppercase h2">{title}</h2>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="breadcrumb__links">
              <Link href="/">Home</Link>
              {items.map((item, index) => (
                <span key={index}>
                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    item.label
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 