import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal, Form, Input } from "antd";
import axios from "axios";

const PlantDetailList: React.FC = () => {
    const [plants, setPlants] = useState<any[]>([]);
    const [selectedPlantIds, setSelectedPlantIds] = useState<number[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPlant, setEditingPlant] = useState<any>(null); // Store the current plant being edited
    const [form] = Form.useForm();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get("/api/getPlants");
        setPlants(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
        message.error("Failed to fetch plant data.");
      }
    };

    fetchPlants();
  }, []);

  const handleDelete = async () => {
    if (selectedPlantIds.length === 0) {
      message.warning("No plants selected for deletion.");
      return;
    }

    try {
      const response = await axios.post("/api/deletePlant", { ids: selectedPlantIds });
      if (response.data.success) {
        setPlants((prevPlants) =>
          prevPlants.filter((plant) => !selectedPlantIds.includes(plant.plant_id))
        );
        message.success("Deleted selected plants successfully!");
        setSelectedPlantIds([]);
      } else {
        message.error("Failed to delete selected plants.");
      }
    } catch (error) {
      console.error("Error deleting plants:", error);
      message.error("Failed to delete selected plants.");
    }
  };

  const handleSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedPlantIds(selectedRowKeys as number[]);
  };


  const handleEdit = (record: any) => {
    setEditingPlant(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      plant_name: record.plant_name,
      scientific_name: record.scientific_name,
      description: record.description,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingPlant(null);
  };

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.put("/api/updatePlant", {
        ...values,
        plant_id: editingPlant.plant_id,
      });

      if (response.data.success) {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.plant_id === editingPlant.plant_id ? { ...plant, ...values } : plant
          )
        );
        message.success("Plant updated successfully!");
        setIsModalVisible(false);
      } else {
        message.error("Failed to update plant.");
      }
    } catch (error) {
      console.error("Error updating plant:", error);
      message.error("Failed to update plant.");
    }
  };


  const columns = [
    {
      title: "Select",
      dataIndex: "plant_id",
      render: (text: any, record: any) => <input type="checkbox" value={text} />,
    },
    { title: "Plant ID", dataIndex: "plant_id", key: "plant_id" },
    { title: "Plant Name", dataIndex: "plant_name", key: "plant_name" },
    { title: "Scientific Name", dataIndex: "scientific_name", key: "scientific_name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        rowSelection={{
          selectedRowKeys: selectedPlantIds,
          onChange: handleSelectChange,
        }}
        columns={columns}
        dataSource={plants}
        rowKey="plant_id"
      />
      <Button
        type="danger"
        onClick={handleDelete}
        disabled={selectedPlantIds.length === 0}
        style={{
          marginTop: 16,
          backgroundColor: "red",
          borderColor: "red",
          color: "white",
        }}
      >
        Delete Selected
      </Button>

      {/* Modal for editing plant details */}
      <Modal
        title="Edit Plant"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            plant_name: editingPlant?.plant_name,
            scientific_name: editingPlant?.scientific_name,
            description: editingPlant?.description,
          }}
        >
          <Form.Item
            name="plant_name"
            label="Plant Name"
            rules={[{ required: true, message: "Please enter the plant name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="scientific_name"
            label="Scientific Name"
            rules={[{ required: true, message: "Please enter the scientific name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlantDetailList;
