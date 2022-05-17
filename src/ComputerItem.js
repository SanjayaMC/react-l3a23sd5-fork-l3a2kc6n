import React, { useEffect, useState } from 'react'
import Computers from './item.json'

function Computeritem() {
    const [ActiveComputers, setActiveComputers] = useState([])
    const [DeletedComputer, setDeleteComputer] = useState([])
    const [totalActivePrice, setTotalActivePrive] = useState(0)
    const [totalDeletedPrice, settotalDeletedPrice] = useState(0)

    const DeleteComputers = (res, id) => {
        let filterData = ActiveComputers.filter(item => { return id !== item.id })
        setActiveComputers(filterData);
        setDeleteComputer(oldArray => [...oldArray, res]);
        setTotalActivePrive(totalActivePrice - res.price)
        settotalDeletedPrice(totalDeletedPrice + res.price)
    }
    const restoreComputers = (res, id) => {
        let filterData = DeletedComputer.filter(item => { return id !== item.id })
        setDeleteComputer(filterData)
        setActiveComputers(oldArray => [...oldArray, res]);
        setTotalActivePrive(totalActivePrice + res.price)
        settotalDeletedPrice(totalDeletedPrice - res.price)
    }

    useEffect(() => {
        setActiveComputers(Computers)
        setTotalActivePrive(Computers.reduce((accum, item) => accum + item.price, 0))
    }, [])

    return (
        
        <>
            <div className="row">
                <div className="col-md-6">
                    <div>
                        <h4>Active Item</h4>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ActiveComputers.map(res => {
                                        console.log(res)
                                        return (
                                            <tr id={res.id}>
                                                <td>{res.brand ? res.brand : res.name}</td>
                                                <td>{res.model}</td>
                                                <td>{res.type}</td>
                                                <td>{res.price}</td>
                                                <td><button className="btn btn-outline-danger" onClick={() => (DeleteComputers(res, res.id))}>x</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div >
                    <div className="col-md-12" style={{ textAlign: 'right', paddingRight: '120px' }}>
                        Total Amount : {totalActivePrice}
                    </div>
                </div>
                <div className="col-md-6">
                    <div>
                        <h4>Deleted Item</h4>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    DeletedComputer.map(res => {
                                        console.log(res)
                                        return (
                                            <tr id={res.id}>
                                                <td>{res.brand ? res.brand : res.name}</td>
                                                <td>{res.model}</td>
                                                <td>{res.type}</td>
                                                <td>{res.price}</td>
                                                <td><button className="btn btn-outline-danger" onClick={() => (restoreComputers(res, res.id))}><i class="fas fa-trash-restore"></i></button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div >
                    {DeletedComputer.length > 0 ? <div className="col-md-12" style={{ textAlign: 'right', paddingRight: '160px' }}>
                    Total Amount :  {totalDeletedPrice}
                    </div> : null}

                    <div>
                    Total Amount : 
                    </div>

                </div>
            </div>
        </>
    )
}

export default Computeritem