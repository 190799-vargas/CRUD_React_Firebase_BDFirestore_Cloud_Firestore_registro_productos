import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Importar funciones de Firestore, para obtener y actualizar documentos
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importar useNavigate y useParams, para la navegación y los parámetros de la URL
import { db } from '../firebaseConfig/firebase'; // Importar la base de datos

const Edit = () => {
    //1- configuramos los hooks
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState(0)
    const navigate = useNavigate()
    const {id} = useParams()
    
    //2 - funcione para  actualizar un doc
    const updateProduct = async (e) => {
        e.preventDefault()
        const productDoc = doc(db, 'products', id)
        const data = {description: description, stock: stock}
        await updateDoc(productDoc, data)
        navigate('/')
    }
    
    //3 - funcion para obtener un doc
    const getProductById = async () => {
        const productDoc = await getDoc(doc(db, 'products', id))
        if(productDoc.exists()){
            //console.log(productDoc.data())
            setDescription(productDoc.data().description)
            setStock(productDoc.data().stock)
        }
        else{
            console.log('el producto no existe')
            navigate('/create')
        }
    }
    //4 - usamos useEffect para obtener el doc al cargar la pagina
    useEffect(() => {
        getProductById()
    }, [])

    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h2>Edit Product</h2>
                    <form onSubmit={updateProduct}>
                        <div className='mb-3'>
                            <label htmlFor='description' className='form-label'>Description</label>
                            <input
                            type='text'
                            className='form-control'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='stock' className='form-label'>Stock</label>
                            <input
                            type='number'
                            className='form-control'
                            value={stock}
                            onChange={(e) => setStock(e.target.value)} />
                        </div>
                        <button type='submit' className='btn btn-primary'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit