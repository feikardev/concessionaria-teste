import { Pencil, Plus, Trash } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Veiculo() {
    const [clicarAdicionarMarca, setClicarAdicionarMarca] = useState(false)
    const [clicarAdicionarVeiculo, setClicarAdicionarVeiculo] = useState(false)
    const [clicarEditarMarca, setClicarEditarMarca] = useState(false)
    const [marcas, setMarcas] = useState([])
    const [currentMarca, setCurrentMarca] = useState(null)
    const [currentVeiculos, setCurrentVeiculos] = useState([])
    const [editarId, setEditarId] = useState(null)
    const [form, setForm] = useState({ modelo: '', status: '' })

    const API_BASE_URL = 'http://localhost:5000/api'

        useEffect(() => {
            async function fetchMarcas() {
                try {
                    const res = await axios.get(`${API_BASE_URL}/marcas`)
                    setMarcas(res.data)
                } catch (error) {
                    console.log('Erro ao buscar marcas.', error)
                }
            }
            fetchMarcas()
        })

        useEffect(() => {
            async function fetchVeiculos() {
                if (currentMarca && currentMarca.id) {
                    try {
                        const res = await axios.get(`${API_BASE_URL}/veiculos/marca/${currentMarca.id}`)
                        setCurrentVeiculos(res.data)
                    } catch (error) {
                        console.log('Erro ao buscar veículos.', error)
                        setCurrentVeiculos([])
                    }
                }
            }
            fetchVeiculos()
        })

    function handleClicarAdicionarMarca() {
        setClicarAdicionarMarca((prevClicarAdicionarMarca) => !prevClicarAdicionarMarca)
        setEditarId(null)
        setCurrentMarca(null)
        setClicarAdicionarVeiculo(false)
    }

    function handleClicarAdicionarVeiculo() {
        setClicarAdicionarVeiculo((prevClicarAdicionarVeiculo) => !prevClicarAdicionarVeiculo)
        setEditarId(null)
    }

    function handleClicarEditarMarca() {
        setClicarEditarMarca((prevClicarEditarVeiculo) => !prevClicarEditarVeiculo)
        setEditarId(null)
    }

    async function handleAdicionarMarca(formData) {
        const nome = formData.get('marca').toLowerCase()
        try {
            const res = await axios.post(`${API_BASE_URL}/marcas/create`, { nome })
            setMarcas((prevMarcas) => [...prevMarcas, res.data])
            setClicarAdicionarMarca(false)
        } catch (error) {
            console.log('Erro ao adicionar marca.', error)
        }
    }


    function handleMarca(marca) {
        setCurrentMarca(marca)
        setEditarId(null)
        setClicarAdicionarVeiculo(false)
        setClicarAdicionarMarca(false)
        setClicarEditarMarca(false)
    }

    async function handleEditarMarca(formData) {
        const newNome = formData.get('marca').toLowerCase()
        try {
            const res = await axios.put(`${API_BASE_URL}/marcas/update/${currentMarca.id}`, { nome: newNome })
            setMarcas((prevMarcas) =>
                prevMarcas.map((marca) => (marca.id === res.data.id ? res.data : marca))
            )
            setCurrentMarca(res.data)
            setClicarEditarMarca(false)
        } catch (error) {
            console.log('Erro ao editar marca.', error)
        }
    }

    async function handleDeletarMarca() {
        try {
            await axios.delete(`${API_BASE_URL}/marcas/delete/${currentMarca.id}`)
            setMarcas((prevMarcas) => prevMarcas.filter(marca => marca.id !== currentMarca.id))
            setCurrentMarca(null)
            setCurrentVeiculos([])
        } catch (error) {
            console.log('Erro ao deletar marca.', error)
        }

        }

    async function handleAdicionarVeiculo(formData) {
        const modelo = formData.get('modelo')
        const status = formData.get('status')
        try {
            const res = await axios.post(`${API_BASE_URL}/veiculos/create`, { modelo, status, marcaId: currentMarca.id })
            setCurrentVeiculos((prevCurrentVeiculos) => [...prevCurrentVeiculos, res.data])
            setClicarAdicionarVeiculo(false)
        } catch (error) {
            console.log('Erro ao adicionar veículo.', error)
        }
        setClicarAdicionarVeiculo(false)
    }

    function handleForm(veiculo) {
        setForm({
            modelo: veiculo.modelo,
            status: veiculo.status
        })
        setEditarId(veiculo.id)
        setClicarAdicionarVeiculo(false)
    }

    async function handleEditarVeiculo(formData) {
        const modelo = formData.get('modelo')
        const status = formData.get('status')
        try {
            const res = await axios.put(`${API_BASE_URL}/veiculos/update/${editarId}`, { modelo: modelo, status: status })
            setCurrentVeiculos((prevCurrentVeiculos) =>
                prevCurrentVeiculos.map((veiculo) =>
                    veiculo.id === res.data.id ? res.data : veiculo
                )
            )
            setEditarId(null)
            setForm({ modelo: '', status: '' })
        } catch (error) {
            console.log('Erro ao editar veículo.', error)
        }
    }

    async function handleDeletarVeiculo(id) {
        try {
            await axios.delete(`${API_BASE_URL}/veiculos/delete/${id}`)
            setCurrentVeiculos((prevCurrentVeiculos) => prevCurrentVeiculos.filter(veiculo => veiculo.id !== id))
            setEditarId(null)
        } catch (error) {
            console.log('Erro ao deletar veículo.', error)
        }
    }

    return (
            <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans'>
                <div className='container mx-auto p-6 bg-white rounded-xl shadow-2xl max-w-4xl w-full'>
                    <h1 className='text-4xl font-extrabold mb-8 text-center text-gray-800 uppercase'>{currentMarca ? currentMarca.nome : 'Marca'}</h1>

                    <div className='flex flex-wrap justify-center gap-4 mb-8'>
                    <button onClick={handleClicarAdicionarMarca} className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase'><Plus /></button>
                        {marcas.map((marca) => (
                                <button
                                    key={marca.id}
                                    className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase'
                                    onClick={() => handleMarca(marca)}
                                >{marca.nome}
                                </button>
                            ))}
                    </div>

                    {currentMarca ?
                    <div className='flex flex-wrap justify-center gap-4 mb-8'>
                        <Pencil onClick={() => handleClicarEditarMarca()} className='text-indigo-600 hover:text-indigo-800 cursor-pointer w-7 h-7 transform hover:scale-110 transition duration-150'/>
                        <Trash onClick={() => handleDeletarMarca()} className='text-indigo-600 hover:text-indigo-800 cursor-pointer w-7 h-7 transform hover:scale-110 transition duration-150'/>
                    </div>
                    : null}

                    {clicarEditarMarca && currentMarca ?
                    <>
                        <h1 className='text-4xl font-extrabold mb-8 text-center text-gray-800 uppercase'>Editar marca</h1>
                            <div className='flex flex-wrap justify-center gap-4 mb-8'>
                                <form className='flex flex-col sm:flex-row gap-4 w-full justify-center' action={handleEditarMarca}>
                                    <input
                                        type='text'
                                        id='marca'
                                        name='marca'
                                        required
                                        className='w-full sm:w-auto flex-grow px-4 py-2 uppercase border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
                                        placeholder='Nome da marca'
                                    />
                                    <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase'>Salvar</button>

                                </form>
                        </div>
                    </>
                    : null}

                            {clicarAdicionarMarca ?
                                <>
                                    <h1 className='text-4xl font-extrabold mb-8 text-center text-gray-800 uppercase'>Adicionar marca</h1>
                                        <div className='flex flex-wrap justify-center gap-4 mb-8'>
                                            <form className='flex flex-col sm:flex-row gap-4 w-full justify-center' action={handleAdicionarMarca}>
                                                <input
                                                    type='text'
                                                    id='marca'
                                                    name='marca'
                                                    required
                                                    className='w-full sm:w-auto flex-grow px-4 py-2 uppercase border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
                                                    placeholder='Nome da marca'
                                                />
                                                <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase'>Salvar</button>

                                            </form>
                                    </div>
                                </>
                            : null}

                            {currentMarca ?
                            <div className='flex flex-col items-center justify-center w-full'>
                                {currentVeiculos.map((veiculo) =>
                                    (
                                        <>
                                            <table className='min-w-full bg-white border-collapse rounded-lg'>
                                                <thead className='bg-gray-200 border-b-2 border-gray-300'>
                                                <tr>
                                                    <th className='py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tl-lg'>Modelo</th>
                                                    <th className='py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tl-lg'>Status</th>
                                                    <th colSpan='2'></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className='py-4 px-6 text-base text-gray-700' key={veiculo.id}>
                                                        <td className='py-4 px-6 text-base text-gray-700 uppercase'>{veiculo.modelo}</td>
                                                        <td className='py-4 px-6 text-base text-gray-700 uppercase'>{veiculo.status}</td>
                                                        <td className='py-4 px-6 text-base text-gray-700'><Pencil
                                                        onClick={() => handleForm(veiculo.id)} className='text-indigo-600 hover:text-indigo-800 cursor-pointer w-7 h-7 transform hover:scale-110 transition duration-150'
                                                        />

                                                        </td>
                                                        <td className='py-4 px-6 text-base text-gray-700'><Trash onClick={() => handleDeletarVeiculo(veiculo.id)} className='text-indigo-600 hover:text-indigo-800 cursor-pointer w-7 h-7 transform hover:scale-110 transition duration-150'/></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </>
                                    ))}
                                <button onClick={handleClicarAdicionarVeiculo} type='submit' className='mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase'>Adicionar veículo
                                </button>
                            </div>
                            : null}

                            {clicarAdicionarVeiculo && !editarId ?
                                <>
                                    <h1 className='text-4xl gap-4 font-extrabold mb-8 text-center text-gray-800 uppercase'>Adicionar veículo</h1>
                                    <form className='flex flex-col items-center gap-4' action={handleAdicionarVeiculo}>
                                        <label htmlFor='modelo' className='block text-sm font-semibold uppercase mb-2'>Modelo</label>
                                        <input
                                            type='text'
                                            id='modelo'
                                            name='modelo'
                                            required
                                            className='w-1/6 px-4 py-2 uppercase border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
                                            placeholder='Modelo'
                                        />

                                        <label htmlFor='status' className='block text-sm font-semibold uppercase mb-2 uppercase'>Status</label>
                                        <select
                                            name='status'
                                            className='block p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 text-base uppercase'
                                        >
                                            <option value='' disabled>Status</option>
                                            <option value='disponivel'>Disponível</option>
                                            <option value='vendido'>Vendido</option>
                                        </select>
                                        <button type='submit' className='bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transform hover:scale-105 transition duration-300 ease-in-out uppercase'>Salvar</button>
                                    </form>
                                </>
                            : null}

                            {editarId ?
                                <>
                                    <h1 className='text-4xl font-extrabold mb-8 text-center text-gray-800 uppercase'>Editar {form.modelo}</h1>
                                    <form className='flex flex-col items-center gap-4' action={handleEditarVeiculo}>
                                        <label htmlFor='modelo' className='block text-sm font-semibold uppercase mb-2'>Modelo</label>
                                        <input
                                                type='text'
                                                id='modelo'
                                                name='modelo'
                                                required
                                                className='w-1/6 px-4 py-2 uppercase border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
                                                placeholder='Modelo'
                                        />

                                        <label htmlFor='status' className='block text-sm font-semibold uppercase mb-2 uppercase'>Status</label>
                                        <select
                                            name='status'
                                            className='block p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 text-base uppercase'
                                            >
                                            <option value='' disabled>Status</option>
                                            <option value='disponivel'>Disponível</option>
                                            <option value='vendido'>Vendido</option>
                                        </select>
                                        <button className='bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transform hover:scale-105 transition duration-300 ease-in-out uppercase'>Salvar</button>
                                    </form>
                                </>
                            : null}
                            </div>
                        </div>
    )
}