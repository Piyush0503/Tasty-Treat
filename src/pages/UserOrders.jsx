import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/api.js";

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        const fetchUserOrders = async () => {
            try {
                const res = await authFetch(`http://localhost:5050/order/user/${user.userId}`);
                if (res.ok) {
                    const data = await res.json();
                    // Sort by newest first
                    const sortedOrders = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                    setOrders(sortedOrders);
                } else {
                    toast.error("Failed to fetch your orders");
                }
            } catch (err) {
                toast.error("Network error. Could not load orders.");
            }
        };

        fetchUserOrders();
    }, [isLoggedIn, user, navigate]);

    // Format date string
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Helper for status badge colors
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Preparing': return 'bg-warning text-dark';
            case 'Dispatched': return 'bg-info text-white';
            case 'Delivered': return 'bg-success text-white';
            default: return 'bg-secondary text-white'; // Pending
        }
    };

    return (
        <Helmet title="My Orders">
            <CommonSection title="My Orders" />
            <br />
            <ToastContainer />
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            {orders.length === 0 ? (
                                <h5 className="text-center mt-5">You haven't placed any orders yet.</h5>
                            ) : (
                                <div>
                                    <h5 className="mb-4">Order History</h5>
                                    <Table responsive bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Date</th>
                                                <th>Shipping To</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(o => (
                                                <tr key={o.orderId}>
                                                    <td>#{o.orderId}</td>
                                                    <td>{formatDate(o.orderDate)}</td>
                                                    <td>
                                                        {o.shippingName}<br />
                                                        <small>{o.shippingCity}, {o.shippingPostalCode}</small>
                                                    </td>
                                                    <td>${o.totalAmount}</td>
                                                    <td>
                                                        <span className={`badge px-3 py-2 ${getStatusBadgeClass(o.status)}`}>
                                                            {o.status || 'Pending'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default UserOrders;
