import React, { Fragment, useEffect, useState, useRef } from "react";
import "antd/dist/antd.css";
import HeadBar from "./HeadBar";
import { Link } from "react-router-dom";
import {
  Table,
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
  Select,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

/*Form */

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

/* end form*/
const Staff = (props) => {
  const [staffs, setStaffs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fresh, setFresh] = useState(false);
  const [itemToEdit,setItemToEdit]=useState("");
  const form = useRef();
  const isInitialMount = useRef(true);

  ////////////////////////////// get token

  const getToken=()=>{
    return (localStorage.token)?localStorage.getItem("token"):sessionStorage.getItem("token");
  }

  /////////////////////////////

  useEffect(() => {
    axios
      .get("/api/staffs")
      .then((res) => {
        console.log("staffs", res.data);
        setStaffs(res.data.staffs);
      })
      .catch((error) => {
        if (error.response) {
          console.log("error", error.response);
        }
      });
  }, [fresh]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Image",
      dataIndex: "image",
    },
    {
      title: "Job",
      dataIndex: "job",
    },
    {
      title: "Facebook",
      dataIndex: "facebook",
    },
    {
      title: "Instagram",
      dataIndex: "instagram",
    },
    {
      title: "Desccription",
      dataIndex: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 150,
    },
  ];

  const data = staffs?
  staffs.map((item) => {
        return {
          key: item.id,
          first_name: item.first_name,
          last_name: item.last_name,
          facebook: item.facebook,
          instagram: item.instagram,
          job: item.job,
          image: (
            <img
              src={item.image.encoded ? item.image.encoded : ""}
              width="100"
            />
          ),
          description: item.description.slice(0, 30) + "...",
          action: (
            <div className="d-flex">
              <button className="btn btn-primary mr-md-1" onClick={()=>{showModal(item.id)}}>Edit</button>
              <button className="btn btn-danger" onClick={()=>{deleteItem(item.id)}}>Delete</button>
            </div>
          ),
        };
      })
    : "";

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  /* Delete */
  const deleteItem=(id)=>{
      let token=getToken();  
      axios.delete(`/api/staffs/${id}`,{ headers: { "Authorization": `Bearer ${token}` } }).then(res=>{
        if(res.data.success){
          message.success(res.data.msg);
          setFresh(!fresh);
        }
        else if(res.data.error){
          message.error(res.data.msg);
        }
      })
  }
  /* end delete */

  /* Modal of add data */
  const showModal = (id) => {
    setItemToEdit("");
    setImageUrl("");
    if(id==0){
      setIsModalVisible(true);
    }
    else{
      var staff=staffs.filter(item=>item.id==id);
      if(staff){
        setItemToEdit(staff);
        setImageUrl(staff[0].image.encoded)
        setIsModalVisible(true);
      }
    }
  };

  const handleOk = () => {
    form.current.resetFields();
    setIsModalVisible(false)
  };

  const handleCancel = () => {
    form.current.resetFields();
    setIsModalVisible(false);
  };

  /* end of modal*/

  // Form
  const onFinish =itemToEdit.length?(
    (values) => {
      var token=getToken();  
      axios.patch(`/api/staffs/${itemToEdit[0].id}`, {
          first_name: values.first_name,
          last_name: values.last_name,
          description: values.description,
          facebook:values.facebook,
          instagram:values.instagram,
          job:values.job,
          image: imageUrl?imageUrl:"",
          img:itemToEdit[0].image.basename
        },{ headers: { "Authorization": `Bearer ${token}` } })
        .then((res) => {
          setIsModalVisible(false);
          setFresh(!fresh);
          form.current.resetFields();
          message.success(res.data.msg);
        })
        .catch((error) => {
          if (error.response.data.errors) {
            console.log(error.response.data);
            message.warning(Object.values(error.response.data.errors).map(item=>{return (<li>{item.join("\n")}</li>)}))
          }
          else if(error.response.data.message){
            console.log(error.response.data);
            message.warning(error.response.data.message);
          }
          console.log(error.response.data);
        });
    }
  ):((values) => {
    var token=getToken(); 
    axios
      .post("/api/staffs", {
        first_name: values.first_name,
        last_name: values.last_name,
        description: values.description,
        facebook:values.facebook,
        instagram:values.instagram,
        job:values.job,
        image: imageUrl,
      },{ headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        setIsModalVisible(false);
        setFresh(!fresh);
        form.current.resetFields();
        message.success("Food added with success");
      })
      .catch((error) => {
        if (error.response.data.errors) {
          console.log(error.response.data);
          message.warning(Object.values(error.response.data.errors).map(item=>{return (<li>{item.join("\n")}</li>)}))
        }
        else if(error.response.data.message){
          console.log(error.response.data);
          message.warning(error.response.data.message);
        }
        console.log(error.response.data);
      });
  });
  // end of form

  //Upload image

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error("Image must smaller than 10 MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        console.log("image url", imageUrl);
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  //end upload image

  return (
    <Fragment>
      <div className="col-md-9 px-0">
        <HeadBar />
        <div className="p-4">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                staff
              </li>
            </ol>
          </nav>
          <div className="content my-5">
            <h3 className="mb-4">Staff table</h3>
            <Button type="primary float-md-right mb-3" onClick={()=>{showModal(0)}}>
              Add new 
            </Button>
            <Modal
              title={itemToEdit.length ? "Edit":"Add new staff"}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              destroyOnClose={true}
            >
              <Form
                {...layout}
                ref={form}
                name="control-ref"
                onFinish={onFinish}
                initialValues={
                  itemToEdit.length?(
                      {
                        first_name:itemToEdit[0].first_name,
                        last_name:itemToEdit[0].last_name,                   
                        description:itemToEdit[0].description,
                        job:itemToEdit[0].job,
                        facebook:itemToEdit[0].facebook,
                        instagram:itemToEdit[0].instagram,
                    
                      }
                  ):({})      
              }
              >
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[{ required: true, message: "Please input a first name!" }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[{ required: true, message: "Please input a last name!" }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                  label="Job"
                  name="job"
                  rules={[{ required: true, message: "Please input a job!" }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                  label="Facebook"
                  name="facebook"
                  rules={[{ required: true, message: "Please input you facebook url!" }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                  label="Instagram"
                  name="instagram"
                  rules={[{ required: true, message: "Please input your instagram url!" }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: "Please input a description!" },
                    {
                      min: 4,
                      message:
                        "Please enter a desciption with 4 caracter at least",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  label="Image"
                  name="image"
                  rules={[
                    { required:itemToEdit.length?false:true, message: "Please download image!" },
                  ]}
                >
                  <Upload
                    name="image"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="image"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
              bordered
              pagination={{ pageSize: 5 }}
              scroll={{ x: 1300, y: 300 }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Staff;