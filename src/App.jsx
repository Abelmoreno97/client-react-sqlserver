import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // ESTADOS
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState([]);
  const [idInput, setIdInput] = useState(0);
  const [deleteId, setDeleteId] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: "",
  });
  const [iduform, setIduform] = useState(0);
  const [uform, setUform] = useState({
    name: "",
    description: "",
    quantity: "",
  });

  // GET ALL PRODUCTS (USE EFFECT)
  useEffect(() => {
    const getProducts = async () => {
      try {
        const respuesta = await fetch("http://localhost:4000/products");
        const products = await respuesta.json();
        setProducts(products);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    getProducts();
  }, []);

  // COUNT ALL PRODUCTS (USE EFFECT)
  useEffect(() => {
    (async () => {
      try {
        const respuesta = await fetch("http://localhost:4000/totalproducts");
        const count = await respuesta.json();
        setCount(count);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    })();

    return () => {
      (async () => {
        try {
          const respuesta = await fetch("http://localhost:4000/totalproducts");
          const count = await respuesta.json();
          setCount(count);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      })();
    };
  }, []);

  // GET PRODUCTS BY ID
  const getProductById = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:4000/products/${idInput}`
      );
      const product = await respuesta.json();
      if (product[0] == null) {
        alert(`product id ${idInput} not found`)
      } else {
        setProductId(product[0]);
      }
      
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  // CREATE NEW PRODUCT
  const submitHandler = (event) => {
    event.preventDefault();
    // agregar peticion al back para enviar formulario
    axios.post(`http://localhost:4000/products`, form);
    alert("product created");
    setForm({
      name: "",
      description: "",
      quantity: "",
    });
    window.location.reload();
  };

  // UPDATE PRODUCT BY ID
  const updateProductById = async () => {
    event.preventDefault()
    try {
      await axios.put(`http://localhost:4000/products/${iduform}`, uform);
     const idarray = products.map((pr)=>(pr.id))
     const idprod = parseInt(iduform[0]) 
     if (idarray.includes(idprod)) {
      alert("Product updated");
      setUform({
        name: "",
        description: "",
        quantity: "",
      });
      window.location.reload();
     } else {
      alert(`product id ${iduform} not found`)
     }
      
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  // DELETE PRODUCTS

  const deleteProductById = async () => {
    try {
      const idarray = products.map((pr)=>(pr.id))
      const idprod = parseInt(deleteId) 
      if (idarray.includes(idprod)) {
        await axios.delete(`http://localhost:4000/products/${deleteId}`);
        alert("Product deleted");
      setDeleteId(""); // Restablecer el valor del campo de entrada
      window.location.reload();
      } else {
        alert(`product id ${deleteId} not found`)
      } 
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const deleteProducts = async () => {
    try {
      await axios.delete(`http://localhost:4000/totalproducts`);
      alert("All product deleted");
      window.location.reload()
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

// CHANGE HANDLER CREATE FORM
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };
// CHANGE HANDLER GET BY ID
  const changeIdHandler = (event) => {
    const value = [event.target.value];

    setIdInput(value);
  };
// CHANGE HANDLER UPDATE FORM
  const changeuHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    
    setUform({ ...uform, [property]: value });
  };
// CHANGE HANDLER ID UPDATE 
  const changeIduHandler = (event) => {
    const value = [event.target.value];

    setIduform(value);
  };
// CHANGE HANDLER ID DELETE
  const handleChangeDeleteId = (event) => {
    setDeleteId(event.target.value);
  };

  return (
    <>
      <div className="card">
        {/* div grande total products */}
        <div>
          <div>
            <h1>TotalProducts:{count}</h1>
          </div>

          <div className="prodContainer">
            {products.map((pr, i) => (
              <div className="prod" key={i}>
                <p>Id: {pr.id}</p>
                <p>Name: {pr.Name}</p>
                <p>Description: {pr.Description}</p>
                <p>Quantity: {pr.Quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* div inferior */}
        <div className="divInferior">
          {/* div product by id */}
          <div>
            <h2>Get product by id</h2>
            <div>
              <input
                type="text"
                autoComplete="off"
                value={idInput}
                onChange={(event) => changeIdHandler(event)}
              ></input>
            </div>
            <div>
            <button onClick={getProductById}>getById</button>
            </div>
            <div className="prod">
              <p>Id: {productId.id}</p>
              <p>Name: {productId.Name}</p>
              <p>Description: {productId.Description}</p>
              <p>Quantity: {productId.Quantity}</p>
            </div>
          </div>
          {/* div create porduct */}
          <div>
          <h2>Create new product</h2>
            <form  onSubmit={submitHandler}>
              <div className="form">
                <label>name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={changeHandler}
                  name="name"
                />
              </div>
              <div className="form">
                <label>description</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={changeHandler}
                  name="description"
                />
              </div>
              <div className="form">
                <label>quantity</label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={changeHandler}
                  name="quantity"
                />
              </div>
              <button type="submit">SUBMIT</button>
            </form>
          </div>
          {/* div update product */}
          <div>
          <h2>Update product</h2>
            <form onSubmit={updateProductById}>
              <div className="form">
                <label>Id</label>
                <input
                  type="text"
                  value={iduform}
                  onChange={changeIduHandler}
                  name="id"
                />
              </div>
              <div className="form">
                <label>Name</label>
                <input
                  type="text"
                  value={uform.name}
                  onChange={changeuHandler}
                  name="name"
                />
              </div>
              <div className="form">
                <label>Description</label>
                <input
                  type="text"
                  value={uform.description}
                  onChange={changeuHandler}
                  name="description"
                />
              </div>
              <div className="form">
                <label>Quantity</label>
                <input
                  type="number"
                  value={uform.quantity}
                  onChange={changeuHandler}
                  name="quantity"
                />
              </div>
              <button type="submit">Update</button>
            </form>
          </div>
          <div>
          <h2>Delete product</h2>
            <div>
            <input
              type="text"
              value={deleteId}
              onChange={handleChangeDeleteId}
              name="deleteId"
            />
            </div>
            <div>
            <button type="button" onClick={deleteProductById}>
              Delete by id
            </button>
            <button type="button" onClick={deleteProducts}>
              DELETE ALL
            </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
