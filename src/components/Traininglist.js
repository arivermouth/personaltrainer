import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const openSnackbar = () => {
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    useEffect(() => fetchTrainings(), []);

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, { method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    setMsg('Training deleted');
                    openSnackbar();
                    fetchTrainings();
                } else {
                    alert('Something went wrong!');
                }
            })
            .catch(err => console.error(err))
        }
    }

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const columns = [
        { 
            headerName: '',
            field: 'id',
            width: 100,
            cellRendererFramework: params => <Tooltip title="Delete"><IconButton onClick={() => deleteTraining(params.value)}><DeleteIcon color='secondary' /></IconButton></Tooltip>
        },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true, floatingFilter: true },
        { headerName: 'Date', field: 'date', valueFormatter: (data) => moment(data.value).format('DD.MM.YYYY, h:mm a'), sortable: true, filter: true, floatingFilter: true },
        { headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true, floatingFilter: true },
        { headerName: "Customer's first name", field: 'customer.firstname' },
        { headerName: "Customer's last name", field: 'customer.lastname' }
    ]

    return (
        <div>
            <div className="ag-theme-material" style={{ height: 550, width: '95%', margin: 'auto', textAlign: 'left' }}>
                <AgGridReact
                    rowData={trainings}
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