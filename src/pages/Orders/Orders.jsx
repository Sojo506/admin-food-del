import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Orders.css';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value,
      });

      if (response.data.success) {
        await fetchOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='orders add'>
      <h3>Order Page</h3>

      <div className='order-list'>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className='order-item'>
              <img src={assets.parcel_icon} alt='parcel icon' />

              <div>
                <p className='order-item-food'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return `${item.name} x ${item.quantity}`;
                    } else {
                      return `${item.name} x ${item.quantity}, `;
                    }
                  })}
                </p>

                <p className='order-item-name'>
                  {order.address.firstName} {order.address.lastName}
                </p>

                <div className='order-item-address'>
                  <p>{order.address.street}, </p>
                  <p>
                    {order.address.city}, {order.address.state},{' '}
                    {order.address.country} {order.address.zipCode}
                  </p>
                </div>

                <p className='order-item-phone'>{order.address.phone}</p>
              </div>

              <p>Items: {order.items.length}</p>
              <p>${order.amount}.00</p>

              <select
                onChange={(e) => statusHandler(e, order._id)}
                defaultValue={order.status}
              >
                <option value='Food Processing' defa>
                  Food Processing
                </option>
                <option value='Out for delivery'>Out for delivery</option>
                <option value='Delivered'>Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
