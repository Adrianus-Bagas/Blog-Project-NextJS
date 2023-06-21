"use client";

import { CommentType, PostType, ProductType, TableType } from "@/interface";
import {
  commentsDataAtom,
  postsDataAtom,
  productsDataAtom,
} from "@/store/app.atom";
import { Form, Select } from "antd";
import { useAtom } from "jotai";
import React from "react";

const { Option } = Select;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: TableType;
  index: number;
  children: React.ReactNode;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const [posts] = useAtom(postsDataAtom);
  const [comments] = useAtom(commentsDataAtom);
  const [products] = useAtom(productsDataAtom);

  const inputNode =
    dataIndex === "product" ||
    dataIndex === "comment" ||
    dataIndex === "post" ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Please Input ${title}`,
          },
        ]}
      >
        {dataIndex === "product" ? (
          <Select
            className="w-32 rounded border border-gray-200 p-1"
            value={"tes"}
            style={{ width: 100 }}
          >
            {products
              ?.sort((a: ProductType, b: ProductType) => a.id < b.id)
              .map((item: ProductType) => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
          </Select>
        ) : dataIndex === "post" ? (
          <Select
            className="w-32 rounded border border-gray-200 p-1"
            value={"tes"}
            style={{ width: 100 }}
          >
            {posts
              ?.sort((a: PostType, b: PostType) => a.id < b.id)
              .map((item: PostType) => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
          </Select>
        ) : dataIndex === "comment" ? (
          <Select
            className="w-32 rounded border border-gray-200 p-1"
            value={"tes"}
            style={{ width: 100 }}
          >
            {comments
              ?.sort((a: CommentType, b: CommentType) => a.id < b.id)
              .map((item: CommentType) => (
                <Option key={item.id} value={item.id}>
                  {item.body}
                </Option>
              ))}
          </Select>
        ) : null}
      </Form.Item>
    ) : null;
  return <td {...restProps}>{editing ? inputNode : children}</td>;
};
