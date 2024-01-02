import React, { useState, useEffect, ChangeEvent } from "react";
import { Table } from "antd";
import qs from "qs";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import "./orders.css";
import OrderService from "../../services/orders.service";
import { IOrder } from "../../types/interface";
import { formatPrice } from "../../common/formatPrice";
import OrderDetail from "../orderDetail/orderDetail";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/reducers/update";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const Orders = (): JSX.Element => {
  const [onOrderDetails, setOnOrderDetails] = useState<boolean>(false);
  const [orderById, setOrderById] = useState<IOrder>();
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.update);
  const columns: ColumnsType<IOrder> = [
    {
      title: "Name User",
      dataIndex: "userName",
      width: "20%",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "20%",
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      render: (dataIndex) => <span>{formatPrice(dataIndex)}</span>,
      width: "15%",
      sorter: (a: any, b: any) => Number(a.totalPrice) - Number(b.totalPrice),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      render: (dataIndex, record: IOrder) => {
        return (
          <select
            value={record.status}
            onChange={(e) => onChangeStatus(e, Number(record.id))}
            className="selectStatus"
          >
            <option disabled={(dataIndex === 2 || dataIndex === 3) ? true : false} value="1">Pending...</option>
            <option disabled={dataIndex === 3 ? true : false} value="2">Shipping...</option>
            <option value="3">Finished</option>
          </select>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id) => (
        <div>
          <button
            onClick={() => {
              setOnOrderDetails(true);
              handleGetOrderById(id);
            }}
            className="btnActionUsers"
          >
            View
          </button>
        </div>
      ),
      width: "10%",
    },
  ];
  const onChangeStatus = async (
    e: ChangeEvent<HTMLSelectElement>,
    id:number
  ) => {
    await orderService.changeStatusOrder(
      id,
      Number(e.target.value)
    );
    
    dispatch(update());
  };
  const handleGetOrderById = async (id: number) => {
    const data = await orderService.getOrderById(id);
    setOrderById(data);
  };
  const offOrderDetails = () => {
    setOnOrderDetails(false);
  };
  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  const orderService = new OrderService();
  const [data, setData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [valueSearchOrder, setValueSearchOrder] = useState<string>("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    const data: any = await orderService.getAllOrders();

    setData(data);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: data.length,
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), status]);

  const handleTableChange: any = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IOrder>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const handleSearchOrder = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 0) {
      setValueSearchOrder(e.target.value);
    }
  };
  useEffect(() => {
    const getData = async () => {
      const data = await orderService.searchOrderByDate(valueSearchOrder);
      setData(data);
    };
    setTimeout(() => {
      getData();
    }, 1000);
  }, [valueSearchOrder]);

  return (
    <section className="orders">
      <div className="searchOrders">
        <input
          autoFocus
          onChange={handleSearchOrder}
          value={valueSearchOrder}
          placeholder="Search by date..."
          type="text"
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      {onOrderDetails ? (
        <OrderDetail orderById={orderById} offOrderDetails={offOrderDetails} />
      ) : null}
    </section>
  );
};

export default Orders;
