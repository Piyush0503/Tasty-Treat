import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/api.js";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('users');
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn || user?.role !== 'ADMIN') {
            navigate('/home');
            return;
        }

        const fetchData = async () => {
            try {
                const usersRes = await authFetch("http://localhost:5050/users/all");
                const ordersRes = await authFetch("http://localhost:5050/order/all");

                if (usersRes.ok) setUsers(await usersRes.json());
                if (ordersRes.ok) setOrders(await ordersRes.json());
            } catch (err) {
                toast.error("Failed to fetch dashboard data");
            }
        };

        fetchData();
    }, [isLoggedIn, user, navigate]);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const res = await authFetch(`http://localhost:5050/order/${orderId}/status`, {
                method: "PUT",
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                toast.success("Order status updated!");
                setOrders(orders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
            } else {
                toast.error("Failed to update status");
            }
        } catch (err) {
            toast.error("Network error updating status");
        }
    };

    if (user?.role !== 'ADMIN') return null;

    return (
        <Helmet title="Admin Dashboard">
            <CommonSection title="Admin Dashboard" />
            <br />
            <ToastContainer />
            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5 d-flex gap-4 border-bottom pb-2">
                            <Button
                                color={activeTab === 'users' ? "danger" : "secondary"}
                                onClick={() => setActiveTab('users')}
                            >
                                Manage Users
                            </Button>
                            <Button
                                color={activeTab === 'orders' ? "danger" : "secondary"}
                                onClick={() => setActiveTab('orders')}
                            >
                                Manage Orders
                            </Button>
                        </Col>

                        <Col lg="12">
                            {activeTab === 'users' && (
                                <div>
                                    <h4 className="mb-4">Total Users: {users.length}</h4>
                                    <Table responsive bordered hover>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(u => (
                                                <tr key={u.userId}>
                                                    <td>{u.userId}</td>
                                                    <td>{u.username}</td>
                                                    <td>{u.email}</td>
                                                    <td>
                                                        <span className={`badge ${u.role === 'ADMIN' ? 'bg-danger' : 'bg-secondary'}`}>
                                                            {u.role}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}

                            {activeTab === 'orders' && (
                                <div>
                                    <h4 className="mb-4">Total Orders: {orders.length}</h4>
                                    <Table responsive bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer info</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(o => (
                                                <tr key={o.orderId}>
                                                    <td>#{o.orderId}</td>
                                                    <td>
                                                        {o.shippingName}<br />
                                                        <small>{o.shippingEmail}</small><br />
                                                        <small>{o.shippingCity}</small>
                                                    </td>
                                                    <td>${o.totalAmount}</td>
                                                    <td>
                                                        <span className="fw-bold text-primary">{o.status}</span>
                                                    </td>
                                                    <td>
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={o.status || "Pending"}
                                                            onChange={(e) => updateOrderStatus(o.orderId, e.target.value)}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Preparing">Preparing</option>
                                                            <option value="Dispatched">Dispatched</option>
                                                            <option value="Delivered">Delivered</option>
                                                        </select>
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

export default AdminDashboard;
