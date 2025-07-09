import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'; // Importar funciones de Firestore
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import { db } from '../firebaseConfig/firebase'; // Importar la base de datos

import Swal from 'sweetalert2'; // Importar SweetAlert, para las alertas
import withReactContent from 'sweetalert2-react-content'; // Importar SweetAlert, para las alertas
const MySwal = withReactContent(Swal) // Crear una instancia de SweetAlert

const Show = () => {
    //1 - configuramos los hooks
    const [products, setProducts] = useState([]) // Crear un estado para los productos


    //2 - referenciamos a la DB firestore
    const productsCollection = collection(db, 'products') // Referenciar a la colección 'products'
    
    //3- funcion para mostrar todos los docs
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        setProducts(
            data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
        )
        console.log(products)
    }
    //4- funcion para eliminar un doc
    const deleteProduct = async (id) => {
        const productDoc= doc(db, 'products', id)
        await deleteDoc(productDoc)
        getProducts()
    }
    //5- funcion para mostrar el modal de confirmacion con sweetalert
    const confirmDelete = (id) => {
        MySwal.fire({
            title: '¿ eliminar el producto ?',
            text: 'No podras revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
                MySwal.fire(
                    'Eliminado',
                    'El producto ha sido eliminado',
                    'success'
                )
            }
        })
    }
    //6- usamos useEffect para mostrar los docs al cargar la pagina
    useEffect(() => {
        getProducts()
    }, [])
    //7- retornamos la vista de nuestro componente
    return (
        
        <div className="container">
            <div className="row">
                <div className='col'>
                    <div className='d-grid gap-2 '>
                        <Link to='/create' className='btn btn-secondary mt-2 mb-2'>Create</Link>
                    </div>

                    <table className='table table-dark table-hover'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.description}</td>
                                    <td>{product.stock}</td>

                                    <td>
                                        <Link to={`/edit/${product.id}`} className='btn btn-light'><i className="fa-solid fa-pen-to-square"></i></Link>
                                        <button className='btn btn-danger' onClick={() => {confirmDelete(product.id)}}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                </div> 
            </div>
        </div>
        
        
    )
}

export default Show;
