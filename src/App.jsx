import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
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

    // Llamada a getProducts al montar el componente o al abrir por primera vez
    getProducts();
  }, []);

  const deleteProductById = async () => {
    try {
      await axios.delete(`http://localhost:4000/products/${deleteId}`);
      alert("Product deleted");
      setDeleteId(""); // Restablecer el valor del campo de entrada
      window.location.reload()
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };
  
  const deleteProducts = async () => {
    try {
      await axios.delete(`http://localhost:4000/totalproducts`);
      alert("All product deleted");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const getProductById = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:4000/products/${idInput}`
      );
      const product = await respuesta.json();
      setProductId(product[0]);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const updateProductById = async () => {
    try {
      await axios.put(`http://localhost:4000/products/${iduform}`, uform);
      alert("Product updated");
      setUform({
        name: "",
        description: "",
        quantity: "",
      });
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  useEffect(() => {
    // Código que se ejecutará después de que el componente se monte o se actualice
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
      // Código que se ejecutará antes de que el componente se desmonte
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

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    // setErrors(validate({ ...form, [property]: value }));
    // validate({ ...form, [property]: value });
    setForm({ ...form, [property]: value });
  };

  const changeIdHandler = (event) => {
    const value = [event.target.value];

    setIdInput(value);
  };

  const changeuHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    // setErrors(validate({ ...form, [property]: value }));
    // validate({ ...form, [property]: value });
    setUform({ ...uform, [property]: value });
  };

  const changeIduHandler = (event) => {
    const value = [event.target.value];

    setIduform(value);
  };

  const handleChangeDeleteId = (event) => {
    setDeleteId(event.target.value);
  };

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
    window.location.reload()
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
            <div>
              <input
                type="text"
                autoComplete="off"
                value={idInput}
                onChange={(event) => changeIdHandler(event)}
              ></input>
              <button onClick={getProductById}>getById</button>
            </div>
            <div className="prod">
              <p>Id: {productId.id}</p>
              <p>Name: {productId.Name}</p>
              <p>Description: {productId.Description}</p>
              <p>Quantity: {productId.Quantity}</p>
            </div>
          </div>
          {/* div post porduct */}
          <div>
            <form onSubmit={submitHandler}>
              <div>
                <label>name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={changeHandler}
                  name="name"
                />
              </div>
              <div>
                <label>description</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={changeHandler}
                  name="description"
                />
              </div>
              <div>
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
            <form onSubmit={updateProductById}>
              <div>
                <label>Id</label>
                <input
                  type="text"
                  value={iduform}
                  onChange={changeIduHandler}
                  name="id"
                />
              </div>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={uform.name}
                  onChange={changeuHandler}
                  name="name"
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  type="text"
                  value={uform.description}
                  onChange={changeuHandler}
                  name="description"
                />
              </div>
              <div>
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
          <input
  type="text"
  value={deleteId}
  onChange={handleChangeDeleteId}
  name="deleteId"
/>
<button type="button" onClick={deleteProductById}>
  Delete
</button>
<button type="button" onClick={deleteProducts}>Delete All</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
