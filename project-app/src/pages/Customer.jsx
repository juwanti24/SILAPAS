import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import data_cust from "../data_cust.json";

const loyaltyColor = (loyalty) => {
  if (loyalty === "Gold") return "bg-yellow-100 text-yellow-600";
  if (loyalty === "Silver") return "bg-gray-100 text-gray-600";
  return "bg-orange-100 text-orange-600";
};

export default function Customers() {
  return (
    <div>
      <PageHeader title="Customers" breadcrumb="Customer List" > customer</PageHeader>
      <div className="p-8">
        {data_cust.map((item) => (
          <div key={item.customer_id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-bold text-gray-800">{item.customer_name}</h2>
            <p className="text-sm text-gray-500">
              ID: <span className="font-bold text-gray-800">{item.customer_id}</span>
            </p>
            <p className="text-sm text-gray-500">
              Email: <span className="font-bold text-gray-800">{item.email}</span>
            </p>
            <p className="text-sm text-gray-500">
              Phone: <span className="font-bold text-gray-800">{item.phone}</span>
            </p>
            <p className="mt-2">
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${loyaltyColor(item.loyalty)}`}>
                {item.loyalty}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}