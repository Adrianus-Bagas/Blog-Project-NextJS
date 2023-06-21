"use client";

import { CommentType, PostType, ProductType, TableType } from "@/interface";
import {
  commentsDataAtom,
  postsDataAtom,
  productsDataAtom,
} from "@/store/app.atom";
import { Form, Popconfirm, Table, Typography } from "antd";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { EditableCell } from "./editableCell";

export default function Latihan() {
  const [posts] = useAtom(postsDataAtom);
  const [comments] = useAtom(commentsDataAtom);
  const [products] = useAtom(productsDataAtom);

  const [data, setData] = useState<TableType[]>([]);
  const [editingKey, setEditingKey] = useState<any>(0);

  const [form] = Form.useForm();

  const isEditing = (record: TableType) => record.key === editingKey;

  const edit = (record: TableType) => {
    const { product, comment, post } = record;
    form.setFieldsValue({
      product: product,
      comment: comment,
      post: post,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TableType;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  console.log(data)

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (_: any, record: TableType) => {
        return (
          <p>
            {products.find((i: ProductType) => i.id === record.product).title}
          </p>
        );
      },
      editable: true,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      render: (_: any, record: TableType) => {
        return (
          <p>
            {comments.find((i: CommentType) => i.id === record.comment).body}
          </p>
        );
      },
      editable: true,
    },
    {
      title: "Post",
      dataIndex: "post",
      render: (_: any, record: TableType) => {
        return <p>{posts.find((i: PostType) => i.id === record.post).title}</p>;
      },
      editable: true,
    },
    {
      title: "Action",
      render: (_: any, record: TableType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TableType) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleDefaultData = useCallback(() => {
    const dataTable: TableType[] = posts.map((i: PostType, index: number) => {
      const data: TableType = {
        key: index,
        post: i.id,
        product: products[index].id,
        comment: comments[index].id,
      };
      return data;
    });
    setData(dataTable);
  }, [posts, comments, products, setData]);

  useEffect(() => {
    handleDefaultData();
  }, [handleDefaultData]);

  console.log(data);

  return (
    <>
      <Form form={form} component={false}>
          <Table
            className="database overflow-x-auto"
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
            rowKey={(record: TableType) => record.key}
          />
        </Form>
    </>
  );
}
