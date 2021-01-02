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

/* end form */
const Foods = (props) => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [galleryUrl, setGalleryUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fresh, setFresh] = useState(false);
  const [itemToEdit,setItemToEdit]=useState("");
  const [fileList,setFileList]=useState([]);
  const form = useRef();
  const isInitialMount = useRef(true);

  ////////////////////////////// get token

  const getToken=()=>{
    return (localStorage.token)?localStorage.getItem("token"):sessionStorage.getItem("token");
  }

  /////////////////////////////

  useEffect(() => {
    axios
      .get("/api/foods")
      .then((res) => {
        console.log("foods", res.data);
        setFoods(res.data.foods);
        setCategories(res.data.categories);
      })
      .catch((error) => {
        if (error.response) {
          console.log("error s", error.response);
        }
      });
  }, [fresh]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
    },
    {
      title: "Desccription",
      dataIndex: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 1,
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 150,
    },
  ];

  const data = foods
    ? foods.map((item) => {
        return {
          key: item.id,
          name: item.name,
          image: (
            <img
              src={item.image.encoded ? item.image.encoded : item.image}
              width="100"
            />
          ),
          description: item.description.slice(0, 30) + "...",
          category: item.category?item.category.name:"undifined",
          price: item.price,
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
      axios.delete(`/api/foods/${id}`,{ headers: { "Authorization": `Bearer ${token}` } }).then(res=>{
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
      var food=foods.filter(item=>item.id==id);
      if(food){
        setItemToEdit(food);
        setImageUrl(food[0].image.encoded)
        let gallery=[];
        let fileList=[];
        food[0].gallery.forEach((item,key)=>{
            gallery.push(item.encoded)
            fileList.push({uid:key,url:item.encoded})
        });
        setFileList(fileList);
        setGalleryUrl(gallery);
        setIsModalVisible(true);
      }
    }
  };

  const handleOk = () => {
    form.current.resetFields();
    setIsModalVisible(false)
    setGalleryUrl([]);
  };

  const handleCancel = () => {
    form.current.resetFields();
    setIsModalVisible(false);
    setGalleryUrl([]);
  };

  /* end of modal*/

  // Form
  const onFinish =itemToEdit.length?(
    (values) => {
      var token=getToken();  
      axios.patch(`/api/foods/${itemToEdit[0].id}`, {
          name: values.name,
          description: values.description,
          category: values.category,
          price: values.price,
          image: imageUrl?imageUrl:"",
          gallery:galleryUrl?galleryUrl:"",
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
      .post("/api/foods", {
        name: values.name,
        description: values.description,
        category: values.category,
        price: values.price,
        image: imageUrl,
        gallery:galleryUrl
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
    const isLt2M = file.size / 1024 / 1024 < 40;
    if (!isLt2M) {
      message.error("Image must smaller than 4 MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const beforeUpload2 = (file) => {
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

  
  const handleChange2 = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (image) => {
        let gallery=galleryUrl;
        gallery.push(image);
        setGalleryUrl(gallery);
        setLoading(false);
      });
    }
    else if(info.file.status!="error"){
      let gallery=[];
      info.fileList.forEach(item=>{
        gallery.push(item.url || item.thumbUrl);
      })
      setGalleryUrl(gallery);
    }
    console.log("galley",galleryUrl);
    console.log("file list",info.fileList)
  };


  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  //end upload image
 //
    

 //
  //Select
  const selectList = categories ? (
    categories.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    })
  ) : (
    <Select.Option value="0">No category</Select.Option>
  );


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
                Foods
              </li>
            </ol>
          </nav>
          <div className="content my-5">
            <h3 className="mb-4">Foods table</h3>
            <Button type="primary float-md-right mb-3" onClick={()=>{showModal(0)}}>
              Add new 
            </Button>
            <Modal
              title={itemToEdit.length ? "Edit":"Add new food"}
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
                          name:itemToEdit[0].name,
                          description:itemToEdit[0].description,
                          category:itemToEdit[0].category_id,
                          price:itemToEdit[0].price,
                      }
                  ):({})      
              }
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please input a name!" }]}
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
                <Form.Item label="Category" name="category">
                  <Select>{selectList}</Select>
                </Form.Item>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: true, message: "Please input a price!" }]}
                >
                  <InputNumber />
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
                <Form.Item
                  label="Gallery"
                  name="galley"
                  rules={[
                    { required:itemToEdit.length?false:true, message: "Please download image!" },
                  ]}
                >
                  <Upload
                    name="gallery"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={true}
                    multiple={true}
                    defaultFileList={fileList}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload2}
                    onChange={handleChange2}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
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

export default Foods;
