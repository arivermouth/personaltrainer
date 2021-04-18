import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const openSnackbar = () => {
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    useEffect(() => fetchCustomers(), []);

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    setMsg('Customer deleted');
                    openSnackbar();
                    fetchCustomers();
                } else {
                    alert('Something went wrong!');
                }
            })
            .catch(err => console.error(err))
        }
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                setMsg('Customer added successfully');
                openSnackbar();
                fetchCustomers();
            } else {
                alert('Something went wrong!');
            }
        })
        .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            body: JSON.stringify(newTraining),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                setMsg('Training added successfully');
                openSnackbar();
                fetchCustomers();
            } else {
                alert('Something went wrong!');
            }
        })
        .catch(err => console.error(err))
    }

    const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedCustomer),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                setMsg('Customer edited successfully');
                openSnackbar();
                fetchCustomers();
            } else {
                alert('Something went wrong!');
            }
        })
        .catch(err => console.error(err))
    }

    const columns = [
        { 
            headerName: '', 
            valueGetter: params => params.data.links[0].href,
            width: 100,
            cellRendererFramework: params => <Tooltip title="Delete"><IconButton onClick={() => deleteCustomer(params.value)}><DeleteIcon color='secondary' /></IconButton></Tooltip>
        },
        {
            headerName: '',
            valueGetter: params => params.data.links[0].href,
            width: 100,
            cellRendererFramework: params => <EditCustomer link={params.value} customer={params.data} editCustomer={editCustomer} />
        },
        {
            headerName: '',
            valueGetter: params => params.data.links[0].href,
            width: 160,
            cellRendererFramework: params => <AddTraining customer={params.data} addTraining={addTraining} />
        },
        { headerName: 'First name', field: 'firstname', sortable: true, filter: true, floatingFilter: true, width: 150 },
        { headerName: 'Last name', field: 'lastname', sortable: true, filter: true, floatingFilter: true, width: 150 },
        { headerName: 'Email', field: 'email', sortable: true, filter: true, floatingFilter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true, floatingFilter: true, width: 150 },
        { headerName: 'Address', field: 'streetaddress', sortable: true, filter: true, floatingFilter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, floatingFilter: true, width: 140 },
        { headerName: 'City', field: 'city', sortable: true, filter: true, floatingFilter: true, width: 160 }
    ]

    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: 550, width: '95%', margin: 'auto', textAlign: 'left' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={8}
                    animateRows={true}
                    suppressCellSelection={true}
                />
            </div>
            <Snackbar 
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={closeSnackbar}
            />
        </div>
    );
}