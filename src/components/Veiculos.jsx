import { Pencil, Plus, Trash } from 'lucide-react'
import { useState } from 'react'
import { nanoid } from 'nanoid'

// adicionar marca e adicionar veiculo

export default function Veiculo() {

    const [clicar, setClicar] = useState(false)
    const [clicarAdicionarMarca, setClicarAdicionarMarca] = useState(false)
    const [marcas, setMarcas] = useState([ "hyundai", "toyota", "volkswagen", "fiat", "chevrolet", "jeep", "honda" ])
    const [veiculos, setVeiculos] = useState([])
    const [editarId, setEditarId] = useState(null)
    const [form, setForm] = useState({ status: "" })


    function handleClicar() {
        setClicar((prevClicar) => !prevClicar)
    }

    function handleClicarAdicionarMarca() {
        setClicarAdicionarMarca((prevClicarAdicionarMarca) => !prevClicarAdicionarMarca)
    }

    function handleAdicionarMarca(formData) {
        setMarcas((prevMarcas) => [ ...prevMarcas, formData.get("marca").toLowerCase() ])
        setClicarAdicionarMarca(false)
    }

    function handleMarca(marca) {

        const veiculos = {
            hyundai: [{id: nanoid(), modelo: "HB20", status: "Vendido"}],
            toyota: [
                {id: nanoid(), modelo: "Etios", status: "Vendido"},
                {id: nanoid(), modelo: "Hilux", status: "Disponível"}
            ],
            volkswagen: [
                {id: nanoid(), modelo: "Fusca", status: "Vendido"},
                {id: nanoid(), modelo: "Palio", status: "Disponível"},
                {id: nanoid(), modelo: "Passat", status: "Vendido"},
                {id: nanoid(), modelo: "Gol", status: "Disponível"}
            ],
            fiat: [
                {id: nanoid(), modelo: "Uno", status: "Vendido"},
                {id: nanoid(), modelo: "Elba", status: "Vendido"}
            ],
            chevrolet: [
                {id: nanoid(), modelo: "Celta", status: "Vendido"}
            ],
            jeep: [
                {id: nanoid(), modelo: "Compass", status: "Vendido"}
            ],
            honda: [
                {id: nanoid(), modelo: "Civic", status: "Vendido"}
            ]
        }
            setVeiculos(veiculos[marca])
            setEditarId(null)
    }

    function handleForm(id) {

        const veiculo = veiculos.find(veiculo => veiculo.id === id)
            setForm({
                marca: veiculo.marca,
                modelo: veiculo.modelo,
                status: veiculo.status
            })
        
            setEditarId(id)
    }

    function handleChange(event) {
        const { name, value } = event.target
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))
    }

    function handleEditar() {
        setVeiculos((prevVeiculos) =>
            prevVeiculos.map((veiculo) =>
                veiculo.id === editarId ? {...veiculo, status: form.status} : veiculo
        ))
        setEditarId(null)
    }

    function handleDeletar(id) {
        setVeiculos((prevVeiculos) => prevVeiculos.filter(veiculo => veiculo.id !== id))
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
                <div className="container mx-auto p-6 bg-white rounded-xl shadow-2xl max-w-4xl w-full">
                    <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Concessionária</h1>
                    <div className="flex justify-center mb-8"> 
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase" onClick={handleClicar}>Veículos</button>
                    </div>


                    {clicar ?
                    <>
                        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Marca</h1>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <button onClick={handleClicarAdicionarMarca} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase"><Plus /></button>
                            {marcas.map((marca) => (
                                    <button
                                        key={marca}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase"
                                        onClick={() => handleMarca(marca)}
                                    >{marca}
                                    </button>
                                ))}             
                        </div>
                    </>
                    : null}

                    {clicarAdicionarMarca ?
                        <>
                            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Adicionar marca</h1>
                                <div className="flex flex-wrap justify-center gap-4 mb-8">
                                    <form className="flex flex-col sm:flex-row gap-4 w-full justify-center" action={handleAdicionarMarca}>
                                        <input
                                            type="text"
                                            id="marca"
                                            name="marca"
                                            required
                                            className="w-full sm:w-auto flex-grow px-4 py-2 uppercase border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                            placeholder="Nome da marca"
                                        />
                                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase">Adicionar marca</button>
                                    
                                    </form>
                            </div>
                        </>                  
                    : null}

                    {clicar ? (veiculos.map((veiculo) =>
                    (     
                        <>          
                            <table className="min-w-full bg-white border-collapse rounded-lg">
                                <thead className="bg-gray-200 border-b-2 border-gray-300">
                                <tr>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tl-lg">Modelo</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tl-lg">Status</th>
                                    <th colSpan="2"></th>
                                </tr>                   
                                </thead>
                                <tbody>
                                    <tr className="py-4 px-6 text-base text-gray-700" key={veiculo.id}>
                                        <td className="py-4 px-6 text-base text-gray-700">{veiculo.modelo}</td>
                                        <td className="py-4 px-6 text-base text-gray-700">{veiculo.status}</td>
                                        <td className="py-4 px-6 text-base text-gray-700"><Pencil 
                                        onClick={() => handleForm(veiculo.id)} className="text-indigo-600 hover:text-indigo-800 cursor-pointer w-7 h-7 transform hover:scale-110 transition duration-150"
                                        />
                                            
                                        </td>
                                        <td className="py-4 px-6 text-base text-gray-700"><Trash onClick={() => handleDeletar(veiculo.id)} className="text-indigo-600 hover:text-indigo-800 cursor-pointer w-7 h-7 transform hover:scale-110 transition duration-150"/></td>
                                    </tr>
                                </tbody>
                            </table>
                    </>
                    ))) : null}
                    {clicar && editarId ?
                        (<>
                        
                            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Editar status de {form.modelo}</h1>
                            <form className="flex flex-col items-center gap-4" onSubmit={handleEditar}>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="block p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 text-base"
                                    >
                                    <option value="" disabled>Status</option>
                                    <option value="Disponível">Disponível</option>
                                    <option value="Vendido">Vendido</option>
                                </select>
                                <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transform hover:scale-105 transition duration-300 ease-in-out">Salvar edição</button>
                            </form>
                        </>)
                    : null}
                </div>
            </div>
        </>
    )
}