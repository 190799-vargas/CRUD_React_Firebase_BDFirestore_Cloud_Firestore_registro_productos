import { addDoc, collection } from 'firebase/firestore'; // Importar funciones para agregar documentos a la base de datos
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig/firebase';


const Create = () => {
    //1- configuramos los hooks
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState(0)
    const navigate = useNavigate()

    const productsCollection = collection(db, 'products') // Referenciar a la colección 'products'

    const store = async (e) => {
        e.preventDefault()
        await addDoc(productsCollection, {
            description: description,
            stock: stock
        })
        navigate('/')
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h2>Create Product</h2>
                    <form onSubmit={store}>
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
                        <button type='submit' className='btn btn-primary'>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create