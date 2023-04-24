import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ImageGallary() {
  const [selectedFile, setSelectedFile] = useState();
  const [loadimage, setLoadImage] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const result = await axios.get("http://localhost:8000/api/list");
    setLoadImage(result.data.reverse());
    
  };

  const handleSubmission = async (e) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", name);
    formData.append("desc", desc);
    await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((result) => {
        loadList();
        setName();
        setDesc();
        setSelectedFile();
      })
      .catch(() => {
        alert("Error in the Code");
      });
  };

  const deleteImage = (productId) => {
    axios
      .get("http://localhost:8000/api/delete/" + productId)
      .then((result) => {
        loadList();
      })
      .catch(() => {
        alert("Error in the Code");
      });
  };

  return (
    <div className="container">
      <h4 >
        Image Gallary in ReactJS
      </h4>
      <div className="row">
        <div >
          <div
            className="box mr-4"
            style={{
              border: "1px solid #b7b7b7",
              backgroundColor: "#rgb(253 253 253)",
            }}
          >
            <h5 >Add Image</h5>
            <table>
              <tbody>
                <tr>
                  <td>
                    <div >
                      <input
                        type="text"
                        name="name"
                     
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Country Name"
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="form-group">
                      <textarea
                        type="text"
                        name="desc"
                       
                        rows="3"
                        cols="23"
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Write Description"
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="form-group">
                      <input
                        type="file"
                        name="file"
                      
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="form-group">
                      <button
                        type="submit"
                        onClick={handleSubmission}
                       
                        name="submit"
                      >
                        Add Gallary
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div >
          <div className="row">
            {loadimage.map((name) => (
              <div >
                <div style={{ width: "12rem" }}>
                  <h5>
                    <a
                      href="#"
                      onClick={() => deleteImage(name.id)}
                      style={{ textDecoration: "none", marginLeft: "162px" }}
                      
                    >
                      <span aria-hidden="true" >
                        &times;
                      </span>
                    </a>
                  </h5>
                  <img
                    key={name.id}
                    src={"http://localhost:8000/" + name.img_path}
                    alt="Card image cap"
                    style={{ height: "110px" }}
                  />

                  <div >
                    <h6 >{name.name}</h6>
                    <span >{name.description}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ImageGallary;
