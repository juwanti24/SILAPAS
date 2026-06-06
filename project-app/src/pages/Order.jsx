import PageHeader from "../components/PageHeader";
import data_order from "../data_order.json";

export default function Orders() {
  return (
    <div id="order-container">
      <PageHeader title="Orders" breadcrumb="Orders List">Order </PageHeader>
      <div className="p-8">
        {data_order.map((item) => (
          <div key={item.order_id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-bold text-gray-800">{item.customer_name}</h2>
            <p className="text-sm text-gray-500">
              Status: <span className="font-bold text-gray-800">{item.status}</span>
            </p>
            <p className="text-sm text-gray-500">
              Total Price: <span className="font-bold text-gray-800">{item.total_price}</span>
            </p>
            <p className="text-sm text-gray-500">
              Order Date: <span className="font-bold text-gray-800">{item.order_date}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}